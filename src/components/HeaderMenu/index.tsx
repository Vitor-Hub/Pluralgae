import React, {RefObject, useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";

var Logo = require('../../assets/logo.png');

interface IHeaderMenuProps {
  AdvantagesRef: RefObject<HTMLDivElement>
  ContactUsRef: RefObject<HTMLDivElement>
  WhoWeAreRef: RefObject<HTMLDivElement>
}

const HeaderMenu = (props:IHeaderMenuProps) => {

  const {WhoWeAreRef, AdvantagesRef, ContactUsRef} = props;

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const responsiveWidth = 1060;

  const location = useLocation();

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

  function renderMenus() {
    return(
      <>
        {location.pathname === "/" ? 
          <>
            
          </>
          :
          <></>
        }
        <Link to="/checkout" className={location.pathname === "/" ? "link" : "buy"}><span><h5 onClick={() => {}}>Comprar</h5></span></Link>
      </>
    )
  }

  const executeScroll = (ref: RefObject<HTMLDivElement>) => ref?.current?.scrollIntoView({ block: 'start',  behavior: 'smooth' });

  return (
    <>  
        {windowSize.innerWidth > responsiveWidth ?
          <div className="HeaderMenu">
            <div className="logo">
              <Link target="_self" to="/"><img src={Logo} alt="Logo" /></Link>
            </div>

            <div className="menus">
              {renderMenus()}
            </div>
          </div>
          :
          <div className="HeaderMenu">
            <div className="top">
              <div className="logo">
              <Link target="_self" to="/"><img src={Logo} alt="Logo" /></Link>
              </div>
            </div>
            
            <hr/>

            <div className="menus">
              {renderMenus()}
            </div>
          </div>
        }    
    </>
  );
};

export default HeaderMenu;
