import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Card, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { AuthContext } from "../../contexts/auth";
import "./index.scss";

var documentIcon = require('../../assets/documentIcon.svg');

const ConfigAccount = () => {

  const {user, signed} = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("user: ", user)
  },[user])

  const validatePhoneNumber = () => {
    //console.log(userData.phoneNumber.length)
    // if (userData.phoneNumber.length === 14) {
    //     setPhoneNumberInvalid(false);
    //     return true
    // } else {
    //     setPhoneNumberInvalid(true);
    //     return false
    // }
  }

  return (
    <>
      <div className="ConfigAccount">
        {signed ?
          <>
            <div className="top">
              <div className="title">
                <img src={documentIcon.default} alt="Icone" />
                <h2>Meus Dados</h2>
              </div>
              <div className="button">
                <LoadingButton 
                    className="saveButton"
                    loading={loading}
                    type="submit"
                    variant="contained"
                    //onClick={() => {sendEmail({name: emailData.name, email: emailData.email, subject: emailData.subject, text: emailData.text})}}
                > 
                  Salvar 
                </LoadingButton> 
              </div>
            </div>
            <div className="cards">
              <Card className="basicData">
                <h3>Dados básicos</h3>
                <TextField
                    label="Nome Completo"
                    className="textField" 
                    id="name" 
                    //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                    //value={emailData.name}
                />
                <PatternFormat 
                    format="(##)#####-####"
                    id="phoneNumber" 
                    label="Celular" 
                    className="textField"
                    //value={userData.phoneNumber}
                    customInput={TextField}
                    required
                    //error={phoneNumberInvalid}
                    variant="outlined"
                    //onChange={(e) => setUserData({...userData, phoneNumber: e.currentTarget.value.replace(/ /g, "")})}
                />
                <TextField  
                    className="textField" 
                    id="password"
                    //value={userData.password}
                    required
                    label="Senha"
                    variant="outlined"
                    type="password"
                    //onChange={(e) => setUserData({...userData, password: e.currentTarget.value})}
                />
                <TextField  
                    className="textField" 
                    id="password"
                    //value={userData.password}
                    required
                    label="Nova senha"
                    variant="outlined"
                    type="password"
                    //onChange={(e) => setUserData({...userData, password: e.currentTarget.value})}
                />
              </Card>

              <Card className="basicData">
                <h3>Endereços</h3>
                <TextField 
                    label="Endereço"
                    className="textField" 
                    id="name" 
                    //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                    //value={emailData.name}
                />
                <TextField 
                    label="CEP"
                    className="textField" 
                    id="name" 
                    //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                    //value={emailData.name}
                />
                <TextField 
                    label="Cidade"
                    className="textField" 
                    id="name" 
                    //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                    //value={emailData.name}
                />
                <TextField 
                    label="Estado"
                    className="textField" 
                    id="name" 
                    //onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                    //value={emailData.name}
                />
                
              </Card>
            </div>
          </>
          :
          <Alert className="AlertComponent" severity="error">
              <AlertTitle>Você deve estar logado!</AlertTitle>
          </Alert>
        }
      </div>
    </>
  );
};

export default ConfigAccount;
