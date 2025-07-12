import Layout from '../components/layout';
import Home from '../components/home';

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

export default IndexPage;
