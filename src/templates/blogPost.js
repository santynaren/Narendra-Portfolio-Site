import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../assets/css/blog-landing.css"

const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="blog-post-container">
        <header className="blog-post-header">
          <h1 className="blog-post-title">{post.frontmatter.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-date">{post.frontmatter.date}</span>
            <span className="blog-post-category">{post.frontmatter.category}</span>
          </div>
          {post.frontmatter.tags && (
            <div className="blog-post-tags">
              {post.frontmatter.tags.map(tag => (
                <span key={tag} className="blog-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <section
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <nav className="blog-navigation">
          {previous && (
            <Link to={`/blog${previous.fields.slug}`} className="nav-link prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
          
          <Link to="/blog" className="nav-link">
            All Posts
          </Link>
          
          {next && (
            <Link to={`/blog${next.fields.slug}`} className="nav-link next">
              {next.frontmatter.title} →
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        tags
      }
    }
  }
`