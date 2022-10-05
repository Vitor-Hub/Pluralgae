import React, {useEffect, useState} from "react";
import "./index.scss";
import SocialIcons from "../SocialIcons";
import { Box } from "@mui/material";

const Footer = () => {

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const responsiveWidth = 1060;

  useEffect(() => {
      function handleWindowResize() {
      setWindowSize(getWindowSize());
      }

      window.addEventListener('resize', handleWindowResize);

      return () => {
      window.removeEventListener('resize', handleWindowResize);
      };
  }, []);

  function getWindowSize() {
      const {innerWidth, innerHeight} = window;
      return {innerWidth, innerHeight};
  }

  return (
    <Box
      className="Footer"
      component="footer"
      sx={{
        mt: 'auto'
      }}
    >
      <h4 className="pluralgae">
          © 2022 PLURALGAE - TODOS OS DIREITOS RESERVADOS
      </h4>
      {windowSize.innerWidth > responsiveWidth ? 
        <div className="socialIcons">
          <SocialIcons />
        </div>
        :
        <></>
      }
    </Box>
  );
};

export default Footer;
