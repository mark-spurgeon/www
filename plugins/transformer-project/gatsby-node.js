const path = require('path');
const fs = require('fs');

function toHex(s) {
  // utf8 to latin1
  var s = unescape(encodeURIComponent(s))
  var h = ''
  for (var i = 0; i < s.length; i++) {
      h += s.charCodeAt(i).toString(16)
  }
  return h
}

function fromHex(h) {
  var s = ''
  for (var i = 0; i < h.length; i+=2) {
      s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
  }
  return decodeURIComponent(escape(s))
}

function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

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
  })
}
