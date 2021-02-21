import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../assets/css/awards.css';
const awards = () => {
  // Last Section with two components
  // one : Awards of 3 col-4
  // two : Number tally 6 col-2
  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <div class="acard">
              <div class="acardContent">
                <div class="acardTitle">Best Innovative Product</div>
                <div class="acardBody">
                  Feliciated by Department of Science and Technology , Govt Of
                  India
                </div>
                <span class="acardTags">#2018</span>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div class="acard">
              <div class="acardContent">
                <div class="acardTitle">Won National Level Innothon</div>
                <div class="acardBody">
                  Recognised by Inidia Smart Grid Forum , New Delhi
                </div>
                <span class="acardTags">#2017</span>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div class="acard">
              <div class="acardContent">
                <div class="acardTitle">
                  Finalist - 108 Ambulance Application
                </div>
                <div class="acardBody">Conducted by Govt of TN</div>
                <span class="acardTags">#2018</span>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={2} xs={4}>
            <div class="cardCount">
              <div class="cardContentCount">
                <div class="cardTitleCount">10+</div>
                <div class="cardBodyCount">Event Speaker</div>
              </div>
            </div>
          </Grid>
          <Grid item md={2} xs={4}>
            <div class="cardCount">
              <div class="cardContentCount">
                <div class="cardTitleCount">42+</div>
                <div class="cardBodyCount">Events Attended</div>
              </div>
            </div>
          </Grid>
          <Grid item md={2} xs={4}>
            <div class="cardCount">
              <div class="cardContentCount">
                <div class="cardTitleCount">15+</div>
                <div class="cardBodyCount">Awards & Honor</div>
              </div>
            </div>
          </Grid>
          <Grid item md={2} xs={4}>
            <div class="cardCount">
              <div class="cardContentCount">
                <div class="cardTitleCount">100+</div>
                <div class="cardBodyCount">Contacts Built</div>
              </div>
            </div>
          </Grid>
          <Grid item md={2} xs={4}>
            <div class="cardCount">
              <div class="cardContentCount">
                <div class="cardTitleCount">25+</div>
                <div class="cardBodyCount">Projects Developed</div>
              </div>
            </div>
          </Grid>
          <Grid item md={2} xs={4}>
            <div class="cardCount">
              <div class="cardContentCount">
                <div class="cardTitleCount">47+</div>
                <div class="cardBodyCount">
                  <del>Failures</del> Learnings
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default awards;
