module.exports = {
  siteMetadata: {
    title: `PapaBearCodes`,
    name: `PapaBearCodes`,
    siteUrl: `https://papabearcodes.com`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Hi ✌️,
      I'm Dave. A Web Developer and writer in the Front-End landscape.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/papabearcodes`,
      },
      {
        name: `github`,
        url: `https://github.com/dvlprdave`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/company/narative/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};
