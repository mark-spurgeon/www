const { graphql } = require('gatsby');

/**
 * Theme type to include all
 * @type {Fragment}
 */
exports.AllProjectTheme = graphql`
  fragment AllProjectTheme on ProjectTheme {
    colors {
      background
      font
    }
  }
`