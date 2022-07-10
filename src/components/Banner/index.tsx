import React from "react";
import "./index.scss";

var banner = require('../../assets/banner_product.png');

const Banner = () => {
  return (
    <>
      <div className="Banner">
        <img src={banner} alt="Banner" />
        <div className="bannerInfos">
            <h2 className="title">Superfood</h2>
            <h3 className="subTitle">Spirulina Pluralgae</h3>
            <h4 className="description">Sua dose diária de saúde.</h4>
            <h5 className="subDescription">Sem aditivos, integral, natural e vegano.</h5>
        </div>
      </div>
    </>
  );
};

export default Banner;
