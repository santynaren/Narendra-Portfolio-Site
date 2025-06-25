import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../assets/css/blog-landing.css"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Blog" />
      <div className="blog-container">
        <header className="blog-header">
          <div className="blog-hero">
            <h1 className="blog-title">My Blog</h1>
            <p className="blog-subtitle">
              Insights on AI Development, MCP Clients & Servers, and Modern Web Technologies
            </p>
          </div>
        </header>

        <section className="blog-posts">
          <div className="posts-grid">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <article key={node.fields.slug} className="blog-card">
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span className="blog-date">{node.frontmatter.date}</span>
                      <span className="blog-category">{node.frontmatter.category}</span>
                    </div>
                    <h2 className="blog-card-title">
                      <Link to={`/blog${node.fields.slug}`} className="blog-link">
                        {title}
                      </Link>
                    </h2>
                    <p className="blog-excerpt">
                      {node.frontmatter.description || node.excerpt}
                    </p>
                    <div className="blog-tags">
                      {node.frontmatter.tags &&
                        node.frontmatter.tags.map(tag => (
                          <span key={tag} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                    <Link to={`/blog${node.fields.slug}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="blog-cta">
          <div className="cta-content">
            <h2>Stay Updated</h2>
            <p>Get notified about new posts on AI development and modern web technologies</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                Get In Touch
              </Link>
              <Link to="/" className="cta-button secondary">
                View Portfolio
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default BlogIndex

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
`