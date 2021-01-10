import path from 'path';
import { sourceNodes } from '../plugins/source-project'
import { createContentDigest } from 'gatsby-core-utils'

const mock = {
  createNodeId: (id) => id,
  createContentDigest: (content) => createContentDigest(content),
  actions: {
    createNode: (node) => node,
  },
  cache: { directory: path.resolve(__dirname, '../.cache/caches/local-source-project/') }
}

export default async (req, res) => {
  let error = null;
  let data = { project: {}, images: { edges: [] }};
  // 
  let { name, language } = req.query;
  if (!name) { error = 'No query value' };

  if (!error) {

    let source = await sourceNodes({ ...mock, preview : name });
    
    let projects = source.filter(p => p.internal.type === "Project" && p.name === name && p.language === language);
    if (projects.length > 0) {
      data.project = projects[0];
    }

    let images = source.filter(i => i.internal.type === "ProjectImage" && i.project === name);
    if (images.length > 0) {
      data.images.edges = images.map(image => ({ node: image }));
    }
  }

  if (!data.project.name) {
    error = `Project with name '${name}' does not exist`
  }

  //let source = await sourceNodes(input);
  // console.log(source);
  if (error) {
    res.status(404);
    res.json({ status: 'error', error });
  }
  
  res.status(202);
  res.json(data)
}