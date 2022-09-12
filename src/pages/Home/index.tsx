import React from "react";
import Advantages from "../../components/Home/Advantages";
import Banner from "../../components/Home/Banner";
import ContactUs from "../../components/Home/ContactUs";
import WhoWeAre from "../../components/Home/WhoWeAre";
import "./index.scss";

const Home = () => {
  return (
    <>
      <div className="main">
        <Banner/>
        <ContactUs/>
        <Advantages/>
        <WhoWeAre/>
      </div>
    </>
  );
};

export default Home;
