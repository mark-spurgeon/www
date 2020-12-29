const { typeDefs } = require('./type-defs');
const remote = require('./remote');
const local = require('./local');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(typeDefs);
  return;
}

exports.sourceNodes = async (args) => {
  await remote.sourceNodes(args);
  await local.sourceNodes(args);
  
  return;
}