/**
 * Implement Gatsby's Node APIs in this file.
 * This file handles both blog posts and work project pages.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define templates
  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const blogList = path.resolve(`./src/templates/blog-list.js`);
  const workTemplate = path.resolve(`./src/templates/workExplainPage.js`);

  // Query for all content
  const result = await graphql(`
    {
      # Blog posts
      blogPosts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { type: { eq: "blog" } } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            type
          }
        }
      }

      # Work projects
      workProjects: allMarkdownRemark(
        filter: { frontmatter: { path: { ne: null }, type: { ne: "blog" } } }
      ) {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              tags
              short
              img
              type
            }
            excerpt
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your content`,
      result.errors,
    );
    return;
  }

  const blogPosts = result.data.blogPosts.nodes;
  const workProjects = result.data.workProjects.edges;

  // Create blog post pages
  if (blogPosts.length > 0) {
    blogPosts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : blogPosts[index - 1].id;
      const nextPostId =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].id;

      // createPage({
      //   path: `/blog${post.fields.slug}`,
      //   component: blogPost,
      //   context: {
      //     id: post.id,
      //     slug: post.fields.slug,
      //     previousPostId,
      //     nextPostId,
      //   },
      // });
    });

    // Create paginated blog listing pages
    const postsPerPage = 6;
    const numPages = Math.ceil(blogPosts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      // createPage({
      //   path: i === 0 ? `/my2cents` : `/my2cents/${i + 1}`,
      //   component: blogList,
      //   context: {
      //     limit: postsPerPage,
      //     skip: i * postsPerPage,
      //     numPages,
      //     currentPage: i + 1,
      //   },
      // });
    });
  }

  // Create work project pages
  if (workProjects.length > 0) {
    workProjects.forEach(({ node }) => {
      // Use the path from frontmatter, or generate one from slug
      const pagePath = node.frontmatter.path || `/works/${node.fields.slug}`;

      // createPage({
      //   path: pagePath,
      //   component: workTemplate,
      //   context: {
      //     id: node.id,
      //     slug: node.fields.slug,
      //     path: pagePath,
      //   },
      // });
    });
  }
};

// Create slug field for all markdown files
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    // createNodeField({
    //   name: `slug`,
    //   node,
    //   value,
    // });

    // Also create a source field to identify the source
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;

    // createNodeField({
    //   name: `source`,
    //   node,
    //   value: source,
    // });
  }
};

// Create schema customizations
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      author: String
      siteUrl: String
      social: Social
    }

    type Social {
      twitter: String
      github: String
      linkedin: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      category: String
      tags: [String]
      type: String
      path: String
      short: String
      img: String
    }

    type Fields {
      slug: String
      source: String
    }
  `);
};

// Optional: Create additional pages programmatically
// exports.createPages = async ({ graphql, actions, reporter }) => {
// ... existing code above ...

// You can also create additional pages here
// For example, tag pages, category pages, etc.

// Create tag pages for blog posts
// const tagTemplate = path.resolve(`./src/templates/tag-page.js`);

// const tagResult = await graphql(`
//   {
//     allMarkdownRemark(filter: { frontmatter: { type: { eq: "blog" } } }) {
//       group(field: frontmatter___tags) {
//         tag: fieldValue
//         totalCount
//       }
//     }
//   }
// `);

// if (tagResult.data) {
//   tagResult.data.allMarkdownRemark.group.forEach(({ tag, totalCount }) => {
//     createPage({
//       path: `/tags/${tag.toLowerCase().replace(/\s+/g, '-')}/`,
//       component: tagTemplate,
//       context: {
//         tag,
//         totalCount,
//       },
//     });
//   });
// }
// };
