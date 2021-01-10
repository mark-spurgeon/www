
exports.typeDefs = `

type ProjectThemeColors {
  background: String
  font: String
}

type ProjectTheme {
  colors: ProjectThemeColors
}

type ProjectImageFluid {
  base64: String
  aspectRatio: Float
  src: String
  srcSet: String
  srcSetType: String
  sizes: String
  originalImg: String
  density: Int
  presentationWidth: Int
  presentationHeight: Int
}

type ProjectImage implements Node {
  project: String
  name: String
  ext: String
  extension: String
  absolutePath: String
  fluid: ProjectImageFluid
}

type Project implements Node {
  date: Date @dateformat(formatString: "YYYY-MM-DD")
  name: String
  language: String
  url: String
  title: String
  description: String
  status: String
  keywords: String
  collection: String
  body: String
  article: String
  theme: ProjectTheme
  thumbnail: String
  thumbnailImage: ProjectImage
}

`