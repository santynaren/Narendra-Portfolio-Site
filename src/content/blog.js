import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../assets/css/blog-landing.css';

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="Blog" />
      <div className="minimal-container">
        <header>
          <div>
            <h1>Writings</h1>
            <i style={{ fontSize: '16px' }}>
              Following are my experiences and learnings thorughout my career as
              a Product Engineer
            </i>
          </div>
        </header>
        <br />
        <section>
          <div>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <div key={node.fields.slug}>
                  <header>
                    <span className="section-title">
                      <Link to={node.fields.slug}>{title}</Link>
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: '10px',
                        fontStyle: 'italic',
                        color: '#666',
                      }}>
                      {node.frontmatter.date} - {node.frontmatter.category}
                    </span>
                  </header>
                  <section>
                    <p>{node.excerpt}</p>
                  </section>
                </div>
              );
            })}
          </div>
        </section>

        {/* <section className="blog-cta">
          <div className="cta-content">
            <h2>Stay Updated</h2>
            <p>
              Get notified about new posts on AI development and modern web
              technologies
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                Get In Touch
              </Link>
              <Link to="/" className="cta-button secondary">
                View Portfolio
              </Link>
            </div>
          </div>
        </section> */}
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "blog" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
            tags
          }
        }
      }
    }
  }
`;
