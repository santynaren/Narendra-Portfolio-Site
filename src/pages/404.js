import React from 'react';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        Seee!, you are messing around with my website
      </p>
      <p>...but I am building stuffs, give some time... Cheers!!!</p>
      <a href="/" style={styles.link}>
        Destination: Home
      </a>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  title: {
    fontSize: '5rem',
    margin: 0,
  },
  message: {
    fontSize: '1.25rem',
    margin: '1rem 0',
  },
  link: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    transition: 'background 0.3s',
  },
};

export default NotFoundPage;
