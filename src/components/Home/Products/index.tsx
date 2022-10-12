import { Alert, AlertTitle, Button, Card, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../services/product.service";
import IGetProducts from "../../../types/products.type";
import "./index.scss";

var LeftArrow = require('../../../assets/left_arrow.svg');
var RigthArrow = require('../../../assets/rigth_arrow.svg');
var productImage = require('../../../assets/productImage.png');

const Products = () => {

  const carousel = useRef<HTMLInputElement>(null);

  const [productsData, setProductsData] = useState<IGetProducts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getProductsApi();
  },[])

  const getProductsApi = async() => {
    setLoading(true);
    await getProducts()
      .then((response: any) => {
          setProductsData(response.data);
          setError(false);
      })
      .catch((e: Error) => {
          console.error(e);
          setError(true);
      });
    setLoading(false);
  }

  const handleLeftClick = (e:any) => {
    e.preventDefault(); 
    carousel.current!.scrollLeft -= carousel.current!.offsetWidth;
  }

  const handleRightClick = (e:any) => {
    e.preventDefault(); 
    carousel.current!.scrollLeft += carousel.current!.offsetWidth;
  }

  return (
    <div className="Products">
      <div className="productsList" ref={carousel}>
        {!loading ? 
          !error ?
            productsData && !!productsData.length && productsData.map((item) => {
              const {name, price, id, description} = item;
              return(
                <div className="carousel" key={id}>
                  <img className="productImage" src={productImage} alt="spirulina" />
                  <div className="infos">
                    <div className="description">
                      <h2>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</h2>
                    </div>
                    <div className="productData">
                      <h2>{name}</h2>
                      <h2>R$: {price}</h2> 
                      <Link to="/checkout"><Button className="buyProduct">Comprar</Button></Link> 
                    </div>
                  </div>
                </div>
              )
            })
          :
          <Alert className="AlertComponent" severity="error">
              <AlertTitle>Erro ao carregar produtos</AlertTitle>
          </Alert>
        :
        <CircularProgress className="circularProgress" color="success" />
      }
      </div>
      {productsData && !!productsData.length && productsData.length > 3 ?
        <div className="buttons">
          <img src={LeftArrow.default} alt="" className="leftButton" onClick={(e) => handleLeftClick(e)} />
          <img src={RigthArrow.default} alt="" className="rightButton" onClick={(e) => handleRightClick(e)} />
        </div>
        :
        <></>
      }
    </div>
  );
};

export default Products;
