import React, {useEffect, useState} from "react";
import "./index.scss";

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
    <>
      <div className="Footer">
        <h4 className="pluralgae">
            © 2022 PLURALGAE - TODOS OS DIREITOS RESERVADOS
        </h4>
        {windowSize.innerWidth > responsiveWidth ? 
          <div className="socialIcons">
              <div className="instagram">icon</div>
              <div className="facebook">icon</div>
              <div className="linkedin">icon</div>
          </div>
          :
          <></>
        }
      </div>
    </>
  );
};

export default Footer;
