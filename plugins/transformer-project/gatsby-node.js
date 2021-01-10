const path = require('path');
const fs = require('fs');


function hexToUtf8(hex) {
  return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
}


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`src/components/templates/project.js`) // TODO : add fallback default template
  const result = await graphql(`
    query {
      allProject {
        edges {
          node {
            url
            name
            language
          }
        }
      }
    }
  `)

  result.data.allProject.edges.forEach(async edge => {
    createPage({
      path: edge.node.url,
      component: articleTemplate,
      context: {
        // Needed to query article
        name: edge.node.name,
        language: edge.node.language,
      },
    })
  });

  return;
}
