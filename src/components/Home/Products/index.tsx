import { Card, CardMedia, Slider } from "@mui/material";
import React, { Component } from "react";
import "./index.scss";

const SliderProps = {
  zoomFactor: 30,
  slideMargin: 10,
  maxVisibleSlides: 5,
  pageTransition: 500
}

const Products = () => {

  const productsMock = [
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
    {
      name: "name1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae augue ante. Donec aliquet massa et ullamcorper vestibulum. Curabitur non mi vel enim imperdiet luctus. Mauris ultrices, urna sodales pharetra fermentum, velit ligula facilisis eros, non ultricies nibh est ullamcorper ante. Pellentesque orci sapien, aliquet eget mollis eget, cursus sed.",
      price: "$5,99"
    },
  ]

  return (
    <>
      <Slider>
        <Component>
          {productsMock && !!productsMock.length && productsMock.map((item, index) => {
            <div>
              <h5>{item.name}</h5>
            </div>
          }) 
          }
        </Component>
      </Slider>
    </>
  );
};

export default Products;
