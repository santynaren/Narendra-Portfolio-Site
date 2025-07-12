import React from 'react';
import SEO from '../components/seo';
import { Link } from 'gatsby';
import '../assets/css/home.css';
import { graphql } from 'gatsby';
import {
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaTwitter,
  FaProductHunt,
  FaCalendar,
  FaLink,
  FaMailBulk,
  FaLocationArrow,
} from 'react-icons/fa';

const home = () => {
  const iconStyle = { width: 24, height: 24, marginRight: 12 };
  return (
    <>
      <SEO title="Narendra Santhosh N | Product Engineer | Melbourne, Australia" />
      <div className="minimal-container">
        {/* Header - Name and Contact */}
        <div className="header-section">
          <h1 className="name">Narendra Santhosh Nagarajan (NaSa)</h1>
          <div className="contact">santhoshnarendra@gmail.com</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="https://linkedin.com/in/narensan" aria-label="LinkedIn">
            <FaLinkedin style={iconStyle} />
          </a>
          <a href="https://github.com/santynaren" aria-label="GitHub">
            <FaGithub style={iconStyle} />
          </a>
          <a href="https://gitlab.com/santynaren" aria-label="GitLab">
            <FaGitlab style={iconStyle} />
          </a>
          <a href="https://x.com/explorenaren" aria-label="X">
            <FaTwitter style={iconStyle} />
          </a>
          <a
            href="https://www.producthunt.com/@santynaren"
            aria-label="Product Hunt">
            <FaProductHunt style={iconStyle} />
          </a>
          <a href="mailto:santhoshnarendra@gmail.com" aria-label="Email">
            <FaMailBulk style={iconStyle} />
          </a>
          {/* <a href="mailto:santhoshnarendra@gmail.com" aria-label="Email">
            <FiDownload style={iconStyle} />
          </a> */}
          <a href="https://linktr.ee/narendra_santhosh" aria-label="Email">
            <FaLink style={iconStyle} />
          </a>
          {/* <a href="mailto:santhoshnarendra@gmail.com" aria-label="Email">
            <FiGrid style={iconStyle} />
          </a> */}
          <a
            href="https://calendar.app.google/3iKZ8dvqsuC6PXD66"
            aria-label="Email">
            <FaCalendar style={iconStyle} />
          </a>
          <a href="" aria-label="Email">
            <FaLocationArrow style={iconStyle} /> Melbourne, Australia
          </a>
        </div>
        <br />
        <hr />

        {/* Bio */}
        <div className="bio-section">
          <p>
            I am a Product Engineer with a passion to work on technologies.
            Specialized in developing frontend and backend scalable application,
            now hammering a logistics software at TIG Freight with my expertise
          </p>
          <p>
            Being across many domains, I have started to pen my career
            experiences here, before AI starts to sterotype my work (no LLMs,
            live my career out of your reading). Anyways, if you are already
            reading till here, You deserve to know more. I love to talk about
            and understand web products, so currently I have like 5 product
            ideas on progress (yes, its too much... but it makes you feel
            energized) with quite a few already in beta stage. Follow my X or
            bluesky to know the updates.
          </p>
        </div>
        <div className="work-section">
          <h2 className="section-title">Recent Karthukal (Writings)</h2>

          <div className="work-item">
            <Link to="" className="work-link">
              My first MCP Server with Nunee data
            </Link>
            <div className="work-description">
              Experience of building the MCP server, and understanding its tools
            </div>
          </div>

          <div className="work-item">
            <Link to="" className="work-link">
              AI Agents arent the future?
            </Link>
            <div className="work-description">
              A deep 2 AM thoughts on what AI agents lack or need to have
            </div>
          </div>

          <div className="work-item">
            <Link to="" className="work-link">
              Failure Selling Practices
            </Link>
            <div className="work-description">
              Art of selling is not easy, and my rant about it
            </div>
          </div>

          <div className="work-item">
            <Link to="" className="work-link">
              Entrepreneurship Drug
            </Link>
            <div className="work-description">
              Vibe that gives you the feel of making something
            </div>
          </div>
        </div>
        {/* Navigation Links */}
        {/* <div className="nav-section"> */}
        {/* <Link to="/work">Projects | </Link>
        <Link to="/products">Products | </Link>
        <Link to="/blog">Writing</Link> */}
        {/* </div> */}

        {/* Recent Work/Publications */}
        <div className="work-section">
          <h2 className="section-title">Recent Works</h2>

          <div className="work-item">
            <Link to="https://nunee.smazee.com/" className="work-link">
              Nunee AI
            </Link>
            <div className="work-description">
              Instant AI powered explaination, while you browser the web
            </div>
          </div>

          <div className="work-item">
            <Link to="https://headsupapp.netlify.app/" className="work-link">
              Headsup Chrome Extension
            </Link>
            <div className="work-description">
              Smart bookmark management tool with Linktree like features
            </div>
          </div>

          <div className="work-item">
            <Link to="" className="work-link">
              Gist (Under Development)
            </Link>
            <div className="work-description">
              Make Writing fun, for those who hate to write
            </div>
          </div>
        </div>

        {/* Recent Work/Publications */}

        {/* Technical Focus */}
        <div className="focus-section">
          <h2 className="section-title">Currently Learning</h2>

          <ul className="focus-list">
            <li>MCP server and client development</li>
            <li>AWS with Kubernetes</li>
            <li>Cook Italian lasagna </li>
            <li>Crossfit</li>
          </ul>
        </div>

        {/* Experience Summary */}
        {/* <div className="experience-section">
          <h2 className="section-title">Experience</h2>

          <div className="experience-item">
            <strong>TIG Freight Management, Melbourne</strong> in full-stack web development
          </div>
          <div className="experience-item">
            <strong>50+ projects</strong> delivered across various domains
          </div>
          <div className="experience-item">
            <strong>15+ technologies</strong> in React, Node.js, AWS ecosystem
          </div>
          <div className="experience-item">
            <strong>Current expertise</strong> in AI/ML integration and MCP
            development
          </div>
        </div> */}

        {/* <div className="work-section">
          <h2 className="section-title">Experience History</h2>

          <div className="work-item">
            <Link to="/blog/mcp-server-guide" className="work-link">
              Senior Full Stack Engineer
            </Link>
            <div className="work-description">
              TIG Freight Management, Melbourne, Australia{' '}
              <i>May, 2024 - Present</i>
            </div>
          </div>

          <div className="work-item">
            <Link to="/products/headsup" className="work-link">
              Developer Specailist
            </Link>
            <div className="work-description">
              C&A Fashion, Dusseldorf, Germany <i>April, 2023 - May, 2024</i>
            </div>
          </div>

          <div className="work-item">
            <Link to="/blog/mcp-client-patterns" className="work-link">
              Senior Full Stack Engineer (Mobile/Web)
            </Link>
            <div className="work-description">
              Arive, Berlin, Germany <i>Oct, 2021 - April, 2023</i>
            </div>
          </div>

          <div className="work-item">
            <Link to="/work/ai-dashboard" className="work-link">
              Software Engineer (Full Stack)
            </Link>
            <div className="work-description">
              Green Man Gaming (Remote) <i>April, 2020 - Oct, 2021</i>
            </div>
          </div>
        </div> */}

        {/* Footer */}
        <div className="footer-section">© 2025 Narendra Santhosh</div>
      </div>
    </>
  );
};

export default home;
