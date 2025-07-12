import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Home from '../components/home';
import Work from '../components/works';
import Profile from '../components/profile';
import Awards from '../components/awards';

import Grid from '@mui/material/Grid';

const IndexPage = ({ data }) => (
  <Layout>
    <Home />
    {/* <div style={{ marginTop: 50 }}>
      <Grid container spacing={3}>
        {data.allMarkdownRemark.edges.map((work) => (
          <Work
            key={work.node.id}
            title={work.node.frontmatter.title}
            tag={work.node.frontmatter.tags}
            path={work.node.frontmatter.path}
            short={work.node.frontmatter.short}
          />
        ))}
      </Grid>
    </div>
    <Awards /> */}
  </Layout>
);
export const worksQuery = graphql`
  query workDoneQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/worksDone/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            tags
            short
          }
          excerpt
        }
      }
    }
  }
`;
export default IndexPage;
