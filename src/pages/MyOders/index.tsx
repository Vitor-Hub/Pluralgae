import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Button, Card, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./index.scss";
import { getOders } from "../../services/oders.service";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import IOders from "../../types/oders.type";

const MyOders = () => {

  const {user} = useContext(AuthContext);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [oders, setOders] = useState<IOders[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserOders = async () => {
    setLoading(true);
    if (user) {
      await getOders(user.id, user.access_token)
        .then((response: any) => {
          setError(false);
          setOders(response.data);
        })
        .catch((e) => {
          console.error(e);
          setError(true);
          setErrorMessage(e.response.data.message);
        });
    }
    setLoading(false);
  }

  const convertNumber = (price: number):string => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const convertData = (date: string):string => {
    var dt = new Date(date),
    dia  = dt.getDate().toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (dt.getMonth()+1).toString(),
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = dt.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }

  useEffect(() => {
    getUserOders();
  },[user]);

  return (
    <>
      {error ? 
        <Alert className="AlertComponent" severity="error">
            <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
        :
        <></>
      }
      <div className="MyOders">
        <div className="topContent">
          <div className="title">
            <ShoppingBasketIcon/>
            <h2>Minha conta</h2>
          </div>
          <div className="changeData">
            <Link to="/configaccount"><Button className="button" variant="contained"><ManageAccountsIcon/><h4 className="buttonLabel">Alterar Dados</h4></Button></Link>
          </div>
        </div>
        <div className="cards">
          <Card className="welcome">
            <h2 className="userName">{`Bem-vindo, ${user?.username}`}</h2>
            <div className="userEmail">
              <EmailIcon/>
              <h4>{user?.email}</h4>
            </div>
          </Card>
          <div className="cardOder">
            <h3 className="title">Meus pedidos</h3>
            {loading ?
              <div className="circular">
                <CircularProgress color="success" />
              </div>
              :
              <div className="oders">
                {oders && !!oders.length && oders.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="cardOrders"
                    >
                      <Typography component={'span'}>
                        <div className="topInfo">
                          <div>
                            <h3>Número do pedido</h3>
                            <h4>{item.id}</h4>
                          </div>
                          <div>
                            <h3>Status</h3>
                            <h4>{item.status}</h4>
                          </div>
                          <div>
                            <h3>Data da compra</h3>
                            <h4>{convertData(item.purchaseDate)}</h4>
                          </div>
                        </div>
                        <div className="bottomInfo">
                          <div>
                            <h3>Endereço</h3>
                            <div className="address">
                              <h4>{item.address.street}</h4>
                              <h4>{`Número ${item.address.number}`}</h4>
                              <h4>{item.address.neighboor}</h4>
                              <h4>{`CEP ${item.address.zipCode} - ${item.address.city}, ${item.address.state}`}</h4>
                            </div>
                          </div>
                          <div>
                            <h3>Frete</h3>
                            <h4>{convertNumber(item.shipping.price)}</h4>
                          </div>
                          <div>
                            <h3>Valor</h3>
                            <h4>{convertNumber(item.total)}</h4>
                          </div>
                        </div>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'}>
                        <div className="oderDetails">
                          {item.items && !!item.items.length && item.items.map((i, ind) => 
                            <Card className="cardOrders" key={ind}>
                              <div className="item">
                                <div className="topInfo">
                                  <div>
                                    <h3>Produto</h3>
                                    <h4>{i.name}</h4>
                                  </div>
                                  <div>
                                    <h3>Quantidade</h3>
                                    <h4>{`${i.quantity}`}</h4>
                                  </div>
                                  <div>
                                    <h3>Preço</h3>
                                    <h4>{convertNumber(i.price)}</h4>
                                  </div>
                                  <div>
                                    <h3>total</h3>
                                    <h4>{convertNumber(i.total)}</h4>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          )}
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
                {!!oders.length ?
                    <></>
                    :
                    <div className="noOders">
                      <h3>Sem pedidos ainda!</h3>
                    </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOders;
