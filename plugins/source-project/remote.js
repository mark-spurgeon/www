require('dotenv').config();
var { Dropbox } = require('dropbox');
const mammoth = require("mammoth");
const archieml = require('archieml');
const { fluid } = require('gatsby-plugin-sharp');
const { createContentDigest } = require(`gatsby-core-utils`);
const nodePath = require('path');
const fs = require('fs');

const {
  getLanguage,
  getExtension,
  isTextExtension,
  isImageExtension,
} = require('./helpers/files');

const {
  prepareProjectImageNode,
  prepareProjectNode,
  createProjectURL,
} = require('./helpers/nodes');

const {
  readText
} = require('./helpers/text');

const createImageNodes = async ({
  dbx,
  project,
  cache,
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
        
        // Store image locally
        let image = downloadResponse.result.fileBinary;
        let fileName = nodePath.join(cache.directory, `/tmp-${createContentDigest(image)}.${ext}`)
        fs.writeFileSync(fileName, image);

        // Create image data
        const imageData = {
          name: nodePath.parse(entry.name).name,
          project: project.name,
          ext: `.${ext}`,
          extension: ext,
          absolutePath: fileName,
        }
        // Create first image node
        const imageNode = prepareProjectImageNode({
          data: imageData,
          ...gatsbyFunctions,
        });

        // Create sharp fluid node
        let fluidObject = await fluid({ file: imageNode });
        let sharpNode = prepareProjectImageNode({
          data: { ...imageNode, fluid: fluidObject },
          ...gatsbyFunctions,
        });

        // Return image
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

// Create all project nodes for 
const createProjectNodes = async ({
  dbx,
  project,
  imageNodes,
  gatsbyFunctions,
}) => {
  var projects = [];
  try {
    // Dropbox : find all `index*` files
    let fileResponse = await dbx.filesSearch({ path: project.path, query: 'index'});
    let matches = fileResponse.result.matches;
    for (let index = 0; index < matches.length; index++) {
      const { metadata } = matches[index];
      // Retrieve from name : Language, Extension
      var language = getLanguage({ name:  metadata.name });
      var ext = getExtension({ name:  metadata.name });
      // Dropbox: download file content
      if (metadata.is_downloadable && isTextExtension({ ext })) {
        let downloadResponse = await dbx.filesDownload({ path: metadata.path_lower});
        let text = await readText({
          buffer: downloadResponse.result.fileBinary,
          ext,
        });
        // Retrieve article data from text
        // It uses the archieml format
        let articleData = archieml.load(text);
        // name: take from folder
        let name = project.name;
        // url : compose it
        let url = createProjectURL({ language: language, project: project.name})
        // body : convert to string
        let body = JSON.stringify(articleData.body);
        // theme : find theme data
        // TODO : return actual data from json
        let theme = JSON.parse(fs.readFileSync('plugins/source-project/theme.json').toString());
        // thumbnailImage : find from 
        let filteredImages = imageNodes.filter(img => img.name === nodePath.basename(articleData.thumbnail).name)
        let thumbnailImage = (filteredImages.length > 0) ? filteredImages[0] : imageNodes[0];
        
        // Combine node data
        let projectData = {
          ...articleData,
          slug: name, // SHOULD DEPRECIATE
          name,
          language,
          url,
          body,
          thumbnailImage,
          theme,
        };

        // Prepare node
        let projectNode = prepareProjectNode({
          data: projectData,
          ...gatsbyFunctions,
        })

        // Create node
        gatsbyFunctions.createNode(projectNode)
        // Add to list
        projects.push(projectNode)
      }
    }
  } 
  
  catch (e) {
    console.log(e);
  }

  return projects;
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

    const projectNodes = await createProjectNodes({
      dbx,
      project,
      imageNodes,
      gatsbyFunctions: {
        createNodeId,
        createNode,
        createContentDigest,
      }
    })

    // Just print
    projectNodes.forEach(project => {
      console.log(`Created project '${project.name}' at '${project.url}' `)
    })
  }
  return;
}