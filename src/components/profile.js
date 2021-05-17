import React from 'react';
import Grid from '@material-ui/core/Grid';

import '../assets/css/profile.css';
import fblogo from '../images/fb.png';
import ilogo from '../images/insta.png';
import mlogo from '../images/mail.png';
import tlogo from '../images/tweet.png';
import llogo from '../images/lin.png';
import glogo from '../images/git.png';
const profile = () => {
  // profile showcases the social media links  ̰

  return (
    <>
       
      <div>
        <Grid container spacing={3}>
          <Grid container spacing={3} md={6} xs={12}>
            <Grid item md={4} xs={4}>
              <div class="pcard">
                <a href="https://www.linkedin.com/in/narensan">
                  {' '}
                  <img alt="linkedin" src={llogo} />
                </a>
              </div>
            </Grid>
            <Grid item md={4} xs={4}>
              <div class="pcard">
                <a href="https://gitlab.com/santynaren">
                  {' '}
                  <img alt="gitlab" src={glogo} />
                </a>
              </div>
            </Grid>
            <Grid item md={4} xs={4}>
              <div class="pcard">
                <a href="https://twitter.com/explorenaren">
                  <img alt="twitter" src={tlogo} />
                </a>
              </div>
            </Grid>

            <Grid item md={4} xs={4}>
              <div class="pcard">
                <a href="mailto:santhoshnarendra@gmail.com">
                  {' '}
                  <img alt="mail" src={mlogo} />
                </a>
              </div>
            </Grid>
            <Grid item md={4} xs={4}>
              <div class="pcard">
                <a href="https://www.instagram.com/santhoshnarendra/">
                  {' '}
                  <img alt="insta" src={ilogo} />
                </a>
              </div>
            </Grid>

            <Grid item md={4} xs={4}>
              <div class="pcard">
                <img alt="fb" src={fblogo} />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3} md={6} xs={12}>
      <Grid item md={12} xs={12}>
              <div class="pcard">
                <div class="pcardContent">
                <div class="pcardTitle">Green Man Gaming,UK (Remote)</div>
                  <div class="pcardBody">2021 - Present | Frontend Engineer</div>
                </div>
              </div>
            </Grid>
            <Grid item md={12} xs={12}>
              <div class="pcard">
                <div class="pcardContent">
                  <div class="pcardTitle">IDC Group, USA (Remote)</div>
                  <div class="pcardBody">2020 - 2020 | Senior Software Engineer</div>
                </div>
              </div>
            </Grid>
          
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default profile;
