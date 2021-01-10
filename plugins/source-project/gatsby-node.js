const { typeDefs } = require('./type-defs');
const remote = require('./remote');
const local = require('./local');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(typeDefs);
  return;
}

exports.sourceNodes = async (args) => {
  let rem = await remote.sourceNodes(args);
  let loc = await local.sourceNodes(args);

  return [...rem, ...loc];
}