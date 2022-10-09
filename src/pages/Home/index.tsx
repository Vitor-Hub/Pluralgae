import React, { RefObject } from "react";
import Advantages from "../../components/Home/Advantages";
import Banner from "../../components/Home/Banner";
import ContactUs from "../../components/Home/ContactUs";
import Products from "../../components/Home/Products";
import WhoWeAre from "../../components/Home/WhoWeAre";
import "./index.scss";

interface IHomeProps {
  AdvantagesRef: RefObject<HTMLDivElement>
  ContactUsRef: RefObject<HTMLDivElement>
  WhoWeAreRef: RefObject<HTMLDivElement>
}

const Home = (props:IHomeProps) => {

  const {AdvantagesRef} = props;
  const {ContactUsRef} = props;
  const {WhoWeAreRef} = props;

  return (
    <>
      <div className="Home">
        <Banner/>
        <Products/>
        <ContactUs ContactUsRef={ContactUsRef}/>
        <Advantages AdvantagesRef={AdvantagesRef}/>
        <WhoWeAre WhoWeAreRef={WhoWeAreRef}/>
      </div>
    </>
  );
};

export default Home;
