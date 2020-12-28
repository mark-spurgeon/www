module.exports = {
  siteMetadata: {
    title: 'Mark Spurgeon',
    description: "I'm a geographer / cartographer and I study at the University of Geneva. I make maps, websites and artwork (3D images).",
    url: "https://markspurgeon.ch",
  },
  plugins: [
    `gatsby-plugin-loadable-components-ssr`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: require.resolve(`./plugins/source-project`),
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `media`,
        path: `${__dirname}/src/media/`,
      },
    },
    {
      resolve: require.resolve(`./plugins/transformer-project`),
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
