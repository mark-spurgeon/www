module.exports = {
  siteMetadata: {
    title: 'Marko [Mark Spurgeon]',
    description: "I'm a geographer / cartographer and I study at the University of Geneva. I make maps, websites and artwork (3D images).",
    url: "https://markspurgeon.ch",
  },
  plugins: [
    `gatsby-plugin-loadable-components-ssr`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `media`,
        path: `${__dirname}/src/media/`,
        plugins: [
          `gatsby-transformer-sharp`,
          `gatsby-plugin-sharp`,
        ]
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    { 
      resolve: `gatsby-remark-images`,
      options: {
        backgroundColor: 'transparent',
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
    { 
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js')
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Marko [Mark Spurgeon]',
        short_name: 'Marko [Mark Spurgeon]',
        start_url: '/',
        icon: 'src/media/markon.png',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-174950041-1",
      },
    },
  ],
};
