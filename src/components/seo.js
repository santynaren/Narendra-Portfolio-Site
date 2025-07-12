/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function SEO({ description, lang, meta, title }) {
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={'%s | Narendra Santhosh Nagarajan (NaSa)'}
      meta={[
        {
          name: `description`,
          content:
            'Narendra Santhosh Nagarajan (NaSa) is a software engineer and product enthusiast with a passion for building innovative solutions. Explore his portfolio to see his work and contributions.',
        },
        {
          property: `og:title`,
          content: 'Product Engineer | Narendra Santhosh Nagarajan (NaSa)',
        },
        {
          property: `og:description`,
          content:
            'Narendra Santhosh Nagarajan (NaSa) is a software engineer and product enthusiast with a passion for building innovative solutions. Explore his portfolio to see his work and contributions.',
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: '@explorenaren',
        },
        {
          name: `twitter:title`,
          content: 'Product Engineer | Narendra Santhosh Nagarajan (NaSa)',
        },
        {
          name: `twitter:description`,
          content:
            'Narendra Santhosh Nagarajan (NaSa) is a software engineer and product enthusiast with a passion for building innovative solutions. Explore his portfolio to see his work and contributions.',
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
