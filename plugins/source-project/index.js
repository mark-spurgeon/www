const gats = require('./gatsby-node');
const remote = require('./remote');
const local = require('./local');

exports.getProjects = async () => {
  let remo = await remote.getProjects();
  let loca = local.getProjects();

  return [ ...remo, ...loca];
}

exports.sourceNodes = gats.sourceNodes;