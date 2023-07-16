import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import {YouTube , Instagram} from "@material-ui/icons";
const About = () => {
  
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Typography>Aditya Gupta</Typography>
            <Button color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @AdityaGupta.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>

              <Instagram className="instagramSvgIcon" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;