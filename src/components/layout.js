/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import '../assets/css/layout.css';

const Layout = ({ children }) => {
  // const styles =

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: '100%',
          padding: `0 1.0875rem 1.45rem`,
        }}>
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
