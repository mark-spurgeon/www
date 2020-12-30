const path = require('path');
const fs = require('fs');
const glob = require('glob');
const mammoth = require("mammoth");
const archieml = require('archieml');
const { fluid } = require('gatsby-plugin-sharp');


async function readText(filePath) {
  const ext = path.extname(filePath)
  if (ext === '.docx') {
    let data = await mammoth.extractRawText({path: filePath});
    let output = [ ...data.value].join('');
    return output;
  } else {
    // 
    return fs.readFileSync(filePath, 'utf8')
  }
}


async function fileNodeToSharpNode(imageNode) {
  let imageFluid = await fluid({
    file: imageNode,
  })

  return {
    ...imageNode,
    fluid: imageFluid,
  }
}

async function getImageNodes({
  imagePaths,
  projectName,
  createNodeId,
  createContentDigest,
}) {
  let sharpNodes = [];
  for (let index = 0; index < imagePaths.length; index++) {
    const imagePath = imagePaths[index];
    const { name, ext } = path.parse(imagePath);
    const imageData = {
      project: projectName,
      name,
      ext,
      extension: ext.substring(1),
      absolutePath: imagePath,
    }
    const imageNode = {
      ...imageData,
      id: createNodeId(`project-image-${projectName}-${name}`),
      internal: {
        type: 'ProjectImage',
        contentDigest: createContentDigest(imageData),
      }
    }
    let sharpNode = await fileNodeToSharpNode(imageNode);
    sharpNodes.push(sharpNode);
  }
  return sharpNodes;
}

const getArticles = async ({ globPattern }) => {
  var allArticles = [];

  const allFiles = glob.sync(globPattern);
  for (let index = 0; index < allFiles.length; index++) {
    const filePath = allFiles[index];
    const dataString = await readText(filePath);
    const article = archieml.load(dataString);

    allArticles.push({ ...article, filePath })
  }

  return allArticles;
}

/**
 * Definitions
 * ------
 * project: 
 *    A folder containing all content (article, images, components, etc...)
 *    that is linked to one project.
 * article:
 *    The structured text and data that is used to produce html page.
 *    An article is written as a docx or txt, in archieml format, 
 *    text is passed through a markdown filter.
 * - language/version:
 *    An article can have multiple versions corresponding to 
 *    a language. Each version produces a new html page.
 */
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  // List all project folders
  const projects = fs.readdirSync('src/projects')
  projects.forEach(async projectName => {
    // Read `theme` object
    const themePath = path.join('src/projects', projectName, 'theme.json')
    const realThemePath = fs.existsSync(themePath) ? themePath : 'plugins/source-project/theme.json';
    const theme = JSON.parse(fs.readFileSync(realThemePath).toString());
    // Get all images in folder
    const imagesGlob = path.join(__dirname, '../../src/projects', projectName, '*.{jpg,png,gif}');
    let imagePaths = glob.sync(imagesGlob);
    let imageNodes = await getImageNodes({
      imagePaths,
      projectName,
      createNodeId,
      createContentDigest,
    });
    imageNodes.forEach(imageNode => {
      createNode(imageNode)
    })

    // Find article versions
    var existingVersions = []; // needed to check if it version already exists
    const globPattern = path.join(__dirname, '../../src/projects', projectName, 'index*(*.aml|*.txt|*.docx)');
    const articles = await getArticles({ globPattern });

    articles.forEach(article => {
      // Verify *language* version and check if that 
      // doesn't exist already
      var language = path.basename(article.filePath).split('.')[1]
      if (['docx', 'txt', 'aml'].includes(language)) { language = 'en'; }
      if (existingVersions.includes(language)) {
        return; 
        // language already exists, dont follow up
      } else {
        existingVersions.push(language);
      }
      
      // Filter thumbnail node from project image nodes
      var thumbnailNode = imageNodes.filter(node => node.name === path.parse(article.thumbnail).name)[0]
      if (!thumbnailNode) {
        thumbnailNode = imageNodes[0];
      }

      // Create full node
      const projectData = {
        ...article,
        // Generated data : if these fields exist in `article`, they will be overriden
        url: (language == 'en') ? `/project/${projectName}` : `/${language}/project/${projectName}`,
        slug: projectName,
        body: JSON.stringify(article.body), // encode to ensure it is not read as json by graphql,
        thumbnailImage: thumbnailNode, // TODO : rename to thumbnailImage
        theme: theme,
        language: language,
      }
      const projectNode = {
        // node base
        ...projectData,
        id: createNodeId(`project-${projectName}-${language}`),
        parent: null,
        children: [],
        internal: {
          type: 'Project',
          contentDigest: createContentDigest(projectData),
        },
      };
      createNode(projectNode);
    });
  });

  return;
}