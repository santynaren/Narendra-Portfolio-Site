import React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from '../components/image';
import SEO from '../components/seo';
import '../assets/css/home.css';
import Tilt from 'react-tilt';


const home = () => {
// HOME SECTION GRID OF TWO col-6 
  return (
    <>
    <SEO title="Home" />
    <div>
    <Grid container spacing={3}>
    <Grid item md={6}xs={12}>
    <div class="intro_tag">
    <p class="intro_tag_text">Hi ! </p>
    <p class="intro_tag_text">I am <b>Narendra</b> </p>
    <p >Full Stack Engineer | Product Strategiest </p>
    </div>


    </Grid>
    <Grid item md={6}xs={12}>
    <Tilt className="Tilt" options={{ max : 25 }}  >
    <Image  />
</Tilt>

    </Grid>
    </Grid>
    </div>



    </>
  );
}

export default home;
