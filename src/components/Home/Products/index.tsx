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
              const {name, price, id} = item;

              return(
                <div className="carousel" key={id}>
                  <Card>
                    <img className="productImage" src={productImage} alt="spirulina" />
                    <div className="productData">
                      <h2>{name}</h2>
                      <h2>R$: {price}</h2> 
                      <Link to="/checkout"><Button className="buyProduct">Comprar</Button></Link> 
                    </div>
                  </Card>
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
