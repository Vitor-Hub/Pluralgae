import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import EmailIcon from "@mui/icons-material/Email";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./index.scss";
import IGetProducts from "../../types/products.type";
import { getOrders } from "../../services/orders.service";
import { getProducts } from "../../services/product.service";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import IOrders from "../../types/orders.type";
import AlertComponent from "../../components/AletComponent";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productInfo, setProductInfo] = useState<IGetProducts[]>([]);

  var productImage = require("../../assets/productImage.png");

  useEffect(() => {
    GetProducts();
  }, []);

  const GetProducts = async () => {
    setIsLoading(true);
    await getProducts()
      .then((response: any) => {
        setError(false);
        let result: IGetProducts[] = response.data;
        if (result && !!result.length) {
          response.data.map((item: IGetProducts, index: number) => {
            result[index].quantity = 0;
            return item;
          });
        }
        setProductInfo(response.data);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        setErrorMessage(e.response.data.message);
      });
    setIsLoading(false);
  };

  const convertNumber = (price: number) => {
    return price?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      {error ? (
        <AlertComponent type="error">{errorMessage}</AlertComponent>
      ) : (
        <></>
      )}
      <div className="Admin">
        <div className="topContent">
          <div className="title">
            <h2>Admin</h2>
          </div>
        </div>
        <div className="cards">
        <Card className="basicData">
                <div className="productData">
                {productInfo.map((item, index) => {
                    return (
                      <div key={index} className="products">
                        <div className="productImage">
                          <img src={productImage} alt="spirulina" />
                        </div>
                        <div className="productInfos">
                          <h3 className="productTitle">{item.name}</h3>
                          <div className="creditInfo">
                            <h4 className="credit">{item.description}</h4>
                          </div>
                        </div>
                        <div className="productPrice">
                          <h3 className="price">{`${convertNumber(
                            item.price
                          )}`}</h3>
                        </div>
                        <div className="edit">
                          <DeleteForeverIcon />
                        </div>
                      </div>
                    );
                  })}
                  <div className="line">

                  </div>
                </div>
                {/* <TextField
                  label="Título do produto"
                  className="textField"
                  id="name"
                  onChange={(e) =>
                    setUpdateUser({
                      ...updateUser,
                      username: e.currentTarget.value,
                    })
                  }
                  value={updateUser?.username}
                  required
                  variant="outlined"
                /> */}
                
              </Card>
        </div>
      </div>
    </>
  );
};

export default Admin;
