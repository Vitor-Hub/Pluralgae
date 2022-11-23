import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Button, Modal, TextField } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import { AuthContext } from "../../../contexts/auth";
import { ModalControlContext } from "../../../contexts/modals";
import { recoveryAccountService } from "../../../services/recoveryAccount.service";
import {ISignIn} from "../../../types/auth.type";
import IUserRecovery from "../../../types/recovery.type";
import AlertComponent from "../../AletComponent";
import "./index.scss";

const SignIn = () => {

    const {setIsOpenSignInModal, isOpenSignInModal} = useContext(ModalControlContext);
    const formRef = useRef<HTMLFormElement>(null);
    const formRecoveryRef = useRef<HTMLFormElement>(null);
    const {signIn, error} = useContext(AuthContext);
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);
    const [recoveryError, setRecoveryError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<String>("");
    const [userData, setUserData] = useState<ISignIn>({
        username: "",
        password:""
    });
    const [userRecovery, setUserRecovery] = useState<IUserRecovery>({
        email: "",
        birthdate:""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    const handleCloseModal = () => {
        resetUserData();
        setIsOpenSignInModal(false);
    }

    const handleSignIn = async () => {
        formRef?.current?.reportValidity();
        setIsLoading(true);
        await signIn(userData);
        setIsLoading(false);
    }

    const resetUserData = () => {
        setUserData({
            username: "",
            password:""
        })
    }

    const formatDate = (date: string) => {
        var dia  = date.split("/")[0];
        var mes  = date.split("/")[1];
        var ano  = date.split("/")[2];
    
        const dateFormated = ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
        return dateFormated;
    }

    const validateBirthdate = () => {
        const today = new Date();
        const date = new Date(formatDate(userRecovery?.birthdate));
    
        if(date < today) {
            return false;
        } else {
            return true;
        }
    }

    const handleRecoveryUser = async () => {
        formRecoveryRef?.current?.reportValidity();
        let data = {... userRecovery};
        setIsLoading(true);
        data.birthdate = formatDate(userRecovery?.birthdate);
        console.log("data: ", data);
        await recoveryAccountService(data)
            .then(() => {
                setForgotPassword(false);
                setRecoveryError(false);
            })
            .catch((e: any) => {
                console.error(e);
                setRecoveryError(true);
            });
        setIsLoading(false);
    }

    document.addEventListener("keypress", (e) => {
        if( e.key == 'Enter' ){
            handleSignIn();
            console.log("enter")
        }
    });
      

    return (
        <div className="Login">
            <Modal
                open={isOpenSignInModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {forgotPassword ?
                    <Box className="Box">
                        <h1>Recuperar Senha</h1>
                        
                        <div className="inputs">
                            <form 
                                ref={formRecoveryRef}
                                className="form"
                                onSubmit={(event) => onSubmit(event)}
                            >
                                <TextField  
                                    className="textField" 
                                    id="emailRecovery"
                                    value={userRecovery?.email}
                                    required
                                    label="E-mail"
                                    variant="outlined"
                                    onChange={(e) => setUserRecovery({...userRecovery, email: e.currentTarget.value})}
                                />

                                <PatternFormat 
                                    format="##/##/####"
                                    id="birthdateRecovery" 
                                    label="Data de nascimento" 
                                    className="textField"
                                    value={userRecovery?.birthdate}
                                    customInput={TextField}
                                    required
                                    error={validateBirthdate()}
                                    variant="outlined"
                                    onChange={(e) => setUserRecovery({...userRecovery, birthdate: e.currentTarget.value})}
                                />

                                <div className="buttons">
                                    <Button 
                                        className="buttonBack" 
                                        variant="contained"
                                        onClick={() => setForgotPassword(false)}
                                    >
                                        Voltar
                                    </Button>
                                    <LoadingButton 
                                        className="button" 
                                        variant="contained"
                                        onClick={handleRecoveryUser}
                                        loading={isLoading}
                                    >
                                        Recuperar
                                    </LoadingButton>
                                </div>
                            </form>
                        </div>
                        {recoveryError ?
                            <AlertComponent type={"error"}>Não foi possível recuperar senha!</AlertComponent>
                            :
                            <></>
                        }
                    </Box>
                    :
                    <Box className="Box">
                        <h1>Login</h1>
                        
                        <div className="inputs">
                            <form 
                                ref={formRef}
                                className="form"
                                onSubmit={(event) => onSubmit(event)}
                            >
                                <TextField  
                                    className="textField" 
                                    id="user"
                                    value={userData.username}
                                    required
                                    label="E-mail"
                                    variant="outlined"
                                    onChange={(e) => setUserData({...userData, username: e.currentTarget.value})}
                                />

                                <TextField  
                                    className="textField" 
                                    id="password"
                                    value={userData.password}
                                    required
                                    label="Senha"
                                    variant="outlined"
                                    type="password"
                                    onChange={(e) => setUserData({...userData, password: e.currentTarget.value})}
                                />
                                <LoadingButton 
                                    className="button" 
                                    variant="contained"
                                    onClick={handleSignIn}
                                    loading={isLoading}
                                >
                                    Login
                                </LoadingButton>
                                <h5 className="forgotLabel" onClick={() => setForgotPassword(true)}>Esqueceu sua senha?</h5>
                                {error ?
                                    <AlertComponent type="error">Usuário ou senha inválidos</AlertComponent>
                                    :
                                    <></>
                                }
                            </form>
                        </div>
                    </Box>
                }
            </Modal>
        </div>
  );
}

export default SignIn;
