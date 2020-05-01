module.exports = {
  siteMetadata: {
    title: `Narendra Santhosh N`,
    description: `Hi ! I am Narendra Santhosh (aka) NASA (aka) santy , a passionate Tech entusiast with Product Managerial skills . `,
    author: `@santynaren`,
  },
  plugins: [

    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
'gatsby-plugin-catch-links',
    {
      resolve: `gatsby-source-filesystem`,
      options:
        {
        name: `images`,
        path: `${__dirname}/src/images`,
      }


    },
    {
      resolve: `gatsby-source-filesystem`,
      options:

      {

      path: `${__dirname}/src/pages`,
      name: `pages`
    }


    },
    'gatsby-transformer-remark',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
