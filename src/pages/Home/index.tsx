import React from "react";
import Advantages from "../../components/Advantages";
import Banner from "../../components/Banner";
import ContactUs from "../../components/ContactUs";
import Footer from "../../components/Footer";
import HeaderMenu from "../../components/HeaderMenu";
import WhoWeAre from "../../components/WhoWeAre";
import "./index.scss";

const Home = () => {
  return (
    <>
      <div className="main">
        <header className="topBar" />
        <HeaderMenu/>
        <Banner/>
        <ContactUs/>
        <Advantages/>
        <WhoWeAre/>
        <footer><Footer/></footer>
      </div>
    </>
  );
};

export default Home;
