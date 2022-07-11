import React from "react";
import Banner from "../../components/Banner";
import ContactUs from "../../components/ContactUs";
import HeaderMenu from "../../components/HeaderMenu";
import "./index.scss";

const Home = () => {
  return (
    <>
      <div className="main">
        <div className="topBar" />
        <HeaderMenu/>
        <Banner/>
        <ContactUs/>
      </div>
    </>
  );
};

export default Home;
