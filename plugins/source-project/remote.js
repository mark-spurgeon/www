require('dotenv').config();
var { Dropbox } = require('dropbox');
const mammoth = require("mammoth");
const archieml = require('archieml');
const { fluid } = require('gatsby-plugin-sharp');
const { createNodeId, createContentDigest } = require(`gatsby-core-utils`);
const nodePath = require('path');
const fs = require('fs');

const getLanguage = ({ name }) => {
  const defaultLanguage = 'en';
  const explodedName = name.split('.');
  const length = explodedName.length;

  return (length === 3) ? explodedName[1] : defaultLanguage;
}

const getExtension = ({ name }) => {
  const explodedName = name.split('.')

  return explodedName[explodedName.length - 1]
}

const isTextExtension = ({ ext }) => {
  return ['docx', 'aml', 'txt'].includes(ext)
}

const isImageExtension = ({ ext }) => {
  return ['png', 'jpg', 'gif'].includes(ext)
}

const createImageNodes = async ({
  dbx,
  project,
  cache,
  createNodeId,
  gatsbyFunctions,
}) => {
  var images = [];
  try {
    // Dropbox : find all `index*` files
    let fileResponse = await dbx.filesListFolder({ path: project.path });
    let entries = fileResponse.result.entries;
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      const ext = getExtension({ name: entry.name})
      if (isImageExtension({ ext })) {
        let downloadResponse = await dbx.filesDownload({ path: entry.path_lower});
        let image = downloadResponse.result.fileBinary;
        const imageData = {
          id: gatsbyFunctions.createNodeId(`project-image-${project.name}-${entry.name}`),
          project: project.name,
          name: nodePath.parse(entry.name).name,
          ext: `.${ext}`,
          extension: ext,
        }

        const imageNode = {
          ...imageData,
          internal: {
            type: 'ProjectImage',
            contentDigest: createContentDigest(imageData),
          }
        }
        // Write to temporary file
        let fileName = nodePath.join(cache.directory, `/tmp-${createContentDigest(imageData)}.${ext}`)
        fs.writeFileSync(fileName, image);

        // Create sharp fluid node
        let sharpNode = {
          ...imageNode,
          fluid: await fluid({file: { ...imageNode, absolutePath: fileName }}),
        }

        images.push(sharpNode);
        // Create node
        gatsbyFunctions.createNode(sharpNode);
      }
    }
  }
  
  catch (e) {
    console.error(e);
  }

  return images
}

const getArticles = async ({ dbx, path }) => {
  var articles = [];
  try {
    // Dropbox : find all `index*` files
    let fileResponse = await dbx.filesSearch({ path, query: 'index'});
    let matches = fileResponse.result.matches;
    for (let index = 0; index < matches.length; index++) {
      const { metadata } = matches[index];
      // Retrieve from name : Language, Extension
      var language = getLanguage({ name:  metadata.name });
      var ext = getExtension({ name:  metadata.name });
      var articleOptions = {}
      // Dropbox: download file content
      if (metadata.is_downloadable && isTextExtension({ ext })) {
        let downloadResponse = await dbx.filesDownload({ path: metadata.path_lower});
        let data = await mammoth.extractRawText({
          buffer: downloadResponse.result.fileBinary
        });
        let text = [ ...data.value].join('');

        articleOptions = archieml.load(text);
      }
      // return article
      let article = {
        ...articleOptions,
        language: language,
      }
      articles.push(article);
    }
  } catch (e) {
    console.log(e);
  }

  return articles
}

const getProjectList = async ({ dbx }) => {
  var projects = [];
  try {
    let folderResponse = await dbx.filesListFolder({path: '/projects'})
    projects = folderResponse.result.entries.map(entry => {
      return {
        name: nodePath.basename(entry.name),
        path: entry.path_lower,
      }
    })
  } 
  catch (e) {
    console.log(e);
  }

  return projects
}

exports.sourceNodes = async ({
  cache, 
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  // Dropbox entry
  const accessToken = process.env.DROPBOX_TOKEN;
  const dbx = new Dropbox({ accessToken: accessToken });
  
  let projects = await getProjectList({ dbx });

  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    // TODO : first create all image nodes
    const imageNodes = await createImageNodes({
      dbx, // dropbox object
      project, // project data
      cache, // plugin folder
      createNodeId, // create node function
      gatsbyFunctions: {
        createNodeId,
        createNode,
        createContentDigest,
      }
    });

    // Get all article version for project
    const articles = await getArticles({dbx, path: project.path })
    articles.forEach(article => {
      // NO ASYNC OPERATION HERE
      // get thumbnail image
      var thumbnailNode = imageNodes.filter(node => node.name === nodePath.parse(article.thumbnail).name)[0]
      if (!thumbnailNode) {
        thumbnailNode = imageNodes[0];
      }

      let projectVersionData = {
        ...article,
        slug: project.name,
        url: (article.language === 'en') ? `/project/${project.name}` : `${article.language}/project/${project.name}`,
        body: JSON.stringify(article.body),
        theme: 'plugins/source-project/theme.json', // placeholder
        thumbnailImage: thumbnailNode,
        id: createNodeId(`project-${project.name}-${article.language}`),
        parent: null,
        children: [],
      }

      let projectVersionNode = {
        ...projectVersionData,
        internal: {
          type: 'Project',
          contentDigest: createContentDigest(projectVersionData),
        },
      };
      // DONT CREATE NODE BEFORE IMAGES
      createNode(projectVersionNode);
    })
  }


  return;
}