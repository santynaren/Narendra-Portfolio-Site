import React from 'react';
import Grid from '@mui/material/Grid';
import '../assets/css/work.css';
import { Link } from 'gatsby';

const Works = (props) => {
  // console.log(props);
  return (
    <Grid item md={3} xs={12}>
      <div className="work-card">
        <div className="work-card-content">
          <div className="work-header">
            <h3 className="work-title">{props.title}</h3>
            <div className="work-category">{props.short || 'Project'}</div>
          </div>

          {/* <div className="work-body">
            <p>{props.body}</p>
          </div> */}

          {/* Tech Stack */}
          {/* <div className="tech-stack">
            {props.tag ? (
              props.tag.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))
            ) : (
              <span className="tech-tag">#{props.tag}</span>
            )}
          </div> */}

          {/* Action Buttons */}
          <div className="work-actions">
            <Link to={props.path} className="btn-primary">
              <span>View Project</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>

            {/* {props.github && (
              <a
                href={props.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary">
                <span>GitHub</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            )} */}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        {/* <div className="work-overlay">
          <div className="overlay-content">
            <h4>Quick Preview</h4>
            <p>{props.description || props.body}</p>
          </div>
        </div> */}
      </div>
    </Grid>
  );
};

// Enhanced component with more props support

export default Works;
