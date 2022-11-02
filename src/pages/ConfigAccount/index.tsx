import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Card, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { PatternFormat } from "react-number-format";
import { AuthContext } from "../../contexts/auth";
import { updateUserService } from "../../services/updateUser.service";
import "./index.scss";
import { IUpdateUser } from "../../types/updateUser.type";

interface INewPassword {
  password: string,
  repeatPassword: string
}

const ConfigAccount = () => {

  const {user, signed, setUser} = useContext(AuthContext);

  const formRef = useRef<HTMLFormElement>(null);
  const [alertMessage, setAlertMessage] = useState<string>();
  const [alert, setAlert] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateUser, setUpdateUser] = useState<IUpdateUser>({
    access_token: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    id: "",
    phoneNumber: "",
    username: ""
  });
  const [newPassword, setNewPassword] = useState<INewPassword>({
    repeatPassword: "",
    password: ""
  });

  useEffect(() => {
    if (user) {
      setUpdateUser({...user});
    }
  },[user]);

  const validatePhoneNumber = () => {
    if (updateUser?.phoneNumber.length === 14) {
        return false
    } else {
        return true
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const handleUpdateUser = async () => {
    formRef?.current?.reportValidity();
    const {access_token, ...rest} = updateUser;

    if (!verifyPasswordEqual()) setUpdateUser({...updateUser, password: newPassword.password});
    setLoading(true);

    await updateUserService(rest, access_token)
      .then(() => {
          setAlert(true);
          setSaved(true);
          setAlertMessage("Atualizado com sucesso!");
          setNewGlobalUser();
      })
      .catch((e: any) => {
          console.error(e);
          setAlert(true);
          setAlertMessage(e.response.data.message);
      });
    setLoading(false);
  }

  const setNewGlobalUser = () => {
    const storagedToken = localStorage.getItem("token");
    localStorage.setItem("user", JSON.stringify({...updateUser, access_token: storagedToken}));
    setUser({...updateUser, access_token: storagedToken});
  }

  const verifyPasswordEqual = () => {
    if(newPassword?.password !== newPassword?.repeatPassword) {
      return true;
    } else {
      return validatePassword();
    }
  }
  
  const validatePassword = () => {
    if (newPassword?.password.length >= 8 && newPassword?.repeatPassword.length >= 8) {
      return false
    } 
    else {
      return true
    }
  }

  useEffect(() => {
    console.log("updateUser: ", updateUser);
  },[updateUser]);

  return (
    <>
      {alert ?
        <Alert className="AlertComponent" severity={saved ? "success" : "error"}>
          <AlertTitle>{alertMessage}</AlertTitle>
        </Alert>
        :
        <></>
      }
      <div className="ConfigAccount">
        {signed ?
          <>
            <div className="top">
              <div className="title">
                <ContactPageIcon/>
                <h2>Meus Dados</h2>
              </div>
              <div className="button">
                <LoadingButton 
                    className="saveButton"
                    loading={loading}
                    type="submit"
                    variant="contained"
                    onClick={() => handleUpdateUser()}
                > 
                  Salvar 
                </LoadingButton> 
              </div>
            </div>
            <div className="cards">
              <form 
                ref={formRef}
                className="form"
                onSubmit={(event) => onSubmit(event)}
              >
                <Card className="basicData">
                  <h3>Dados básicos</h3>
                    <TextField
                        label="Nome Completo"
                        className="textField" 
                        id="name" 
                        onChange={(e) => setUpdateUser({...updateUser, username: e.currentTarget.value})}
                        value={updateUser?.username}
                        required
                        variant="outlined"
                        />
                    <PatternFormat 
                        format="(##)#####-####"
                        id="phoneNumber" 
                        label="Celular" 
                        className="textField"
                        value={updateUser?.phoneNumber}
                        customInput={TextField}
                        required
                        error={validatePhoneNumber()}
                        variant="outlined"
                        onChange={(e) => setUpdateUser({...updateUser, phoneNumber: e.currentTarget.value.replace(/ /g, "")})}
                    />
                    <TextField  
                        className="textField" 
                        id="password"
                        value={newPassword?.password}
                        helperText= {newPassword?.password.length >= 8 ? "" : "A senha precisa ter mais que 8 caracteres"}
                        label="Nova Senha"
                        variant="outlined"
                        type="password"
                        error={verifyPasswordEqual()}
                        onChange={(e) => {
                            setNewPassword({...newPassword, password: e.currentTarget.value})
                          }
                        }
                    />
                    <TextField  
                        className="textField" 
                        id="repeatePassword"
                        value={newPassword?.repeatPassword}
                        label="Confirme a senha"
                        variant="outlined"
                        helperText= {newPassword?.repeatPassword.length >= 8  ? "" : "A senha precisa ter mais que 8 caracteres"}
                        type="password"
                        error={verifyPasswordEqual()}
                        onChange={(e) => {
                            setNewPassword({...newPassword, repeatPassword: e.currentTarget.value})
                          }
                        }
                    />
                </Card>

                <Card className="basicData">
                  <h3>Endereços</h3>
                  <TextField 
                      label="Endereço"
                      className="textField" 
                      id="address" 
                      onChange={(e) => setUpdateUser({...updateUser, address: e.currentTarget.value})}
                      value={updateUser?.address}
                      required
                      />
                  <PatternFormat 
                    format="########" 
                    id="zipCode"
                    label="CEP" 
                    required
                    className="textField"
                    value={updateUser?.zipCode}
                    variant="outlined"
                    customInput={TextField}
                    onChange={(e) => setUpdateUser({...updateUser, zipCode: e.currentTarget.value})}
                  />
                  <TextField 
                      label="Cidade"
                      className="textField" 
                      id="city" 
                      onChange={(e) => setUpdateUser({...updateUser, city: e.currentTarget.value})}
                      value={updateUser?.city}
                      required
                  />
                  <TextField 
                      label="Estado"
                      className="textField" 
                      id="state" 
                      onChange={(e) => setUpdateUser({...updateUser, state: e.currentTarget.value})}
                      value={updateUser?.state}
                      required
                  />
                  
                </Card>
              </form>
            </div>
          </>
          :
          <></>
        }
      </div>
    </>
  );
};

export default ConfigAccount;
