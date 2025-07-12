import React from 'react';
import {
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { graphql, navigate } from 'gatsby';
import Layout from '../src/components/layout';
import SEO from '../src/components/seo';

export default function WorkExplainPage({ data }) {
  const works = data.markdownRemark;
  // console.log(data);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
    // Or navigate to a specific page: navigate('/works')
  };

  return (
    <Layout>
      <SEO title={works.frontmatter.title} />

      {/* Main Container - Centered */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBackClick}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}>
            Back
          </Button>
        </Box>

        {/* Main Content Card */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          }}>
          <Grid container>
            {/* Content Side */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4, height: '100%' }}>
                {/* Title */}
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    mb: 2,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}>
                  {works.frontmatter.title}
                </Typography>

                {/* Tags */}
                {works.frontmatter.tags && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mb: 3, flexWrap: 'wrap' }}>
                    {works.frontmatter.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          mb: 1,
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'white',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Short Description */}
                {works.frontmatter.short && (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 3,
                      fontStyle: 'italic',
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                    }}>
                    {works.frontmatter.short}
                  </Typography>
                )}

                {/* Main Content */}
                <Box
                  sx={{
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                      color: 'primary.main',
                      mt: 3,
                      mb: 2,
                    },
                    '& p': {
                      mb: 2,
                      lineHeight: 1.7,
                      color: 'text.primary',
                    },
                    '& ul, & ol': {
                      mb: 2,
                      pl: 3,
                    },
                    '& li': {
                      mb: 1,
                      lineHeight: 1.6,
                    },
                    '& code': {
                      backgroundColor: 'grey.100',
                      padding: '2px 6px',
                      borderRadius: 1,
                      fontSize: '0.9em',
                    },
                    '& pre': {
                      backgroundColor: 'grey.900',
                      color: 'white',
                      p: 2,
                      borderRadius: 2,
                      overflow: 'auto',
                      mb: 2,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: works.html }}
                />
              </Box>
            </Grid>

            {/* Image Side */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: 300, md: '100%' },
                  minHeight: { md: 500 },
                  position: 'relative',
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {works.frontmatter.img ? (
                  <Box
                    component="img"
                    src={works.frontmatter.img}
                    alt={works.frontmatter.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" color="text.secondary">
                    No image available
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Bottom Navigation */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleBackClick}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
            }}>
            Back to Projects
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

export const postQuery = graphql`
  query EachWork($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        tags
        short
        img
      }
    }
  }
`;
