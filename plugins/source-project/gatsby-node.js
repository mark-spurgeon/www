const path = require('path');
const fs = require('fs');
const glob = require('glob');
const mammoth = require("mammoth");
const archieml = require('archieml');
const { fluid } = require('gatsby-plugin-sharp');

const { typeDefs } = require('./type-defs');
const remote = require('./remote');
const local = require('./local');


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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(typeDefs);
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
exports.sourceNodes = async (args) => {
  let remoteSourceNodes = await remote.sourceNodes(args);
  let localSourceNodes = await local.sourceNodes(args);
  return;
}