const path = require('path');
const fs = require('fs');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`templates/project.js`) // TODO : add fallback default template
  const result = await graphql(`
    query {
      allProject {
        edges {
          node {
            url
            slug
            title
            language
            theme
            body
          }
        }
      }
    }
  `)

  result.data.allProject.edges.forEach(async edge => {
    let themeFile = edge.node.theme ? fs.readFileSync(edge.node.theme, 'utf8') : null;
    let theme = themeFile ? JSON.parse(themeFile) : themeFile;

    let bodyBuffer = edge.node.body;
    let bString = bodyBuffer.map(c => String.fromCharCode(c)).join('')
    let body = JSON.parse(bString);
    
    console.log('creating page')
    console.log(edge.node.url)
    createPage({
      path: edge.node.url,
      component: articleTemplate,
      context: {
        // Needed to query article
        slug: edge.node.slug,
        language: edge.node.language,
        // Data that is passed through
        theme,
        body,
      },
    })
  });

  return;
}
