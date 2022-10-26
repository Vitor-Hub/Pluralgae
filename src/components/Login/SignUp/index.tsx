import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Modal, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import validator from 'validator';
import { PatternFormat } from 'react-number-format';
import { ModalControlContext } from "../../../contexts/modals";
import { signUpService } from "../../../services/signup.service";
import { ISignUp } from "../../../types/signup.type";
import "./index.scss";

const SignUp = () => {

    const formRef = useRef<HTMLFormElement>(null);
    
    const {isOpenSignUpModal, setIsOpenSignUpModal} = useContext(ModalControlContext);

    const [userData, setUserData] = useState<ISignUp>({
        username: "",
        password: "",
        email: "",
        address: "",
        phoneNumber: "",
        zipCode: "",
        city: "", 
        state: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    const resetData = () => {
        setUserData({
            username: "",
            password: "",
            email: "",
            address: "",
            phoneNumber: "",
            zipCode: "",
            city: "", 
            state: ""
        })
        setError(false);
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    const handleCloseModal = () => {
        resetData();
        setIsOpenSignUpModal(false);
    }

    const handleSignUp = async () => {
        formRef?.current?.reportValidity();
        console.log("teste")
        
        setIsLoading(true);

        await signUpService(userData)
        .then((response: any) => {
            setIsOpenSignUpModal(false);
            setError(false);
        })
        .catch((e) => {
            console.error(e);
            setError(true);
            setErrorMessage(e.response.data.message);
        });
        
        setIsLoading(false);
    }

    useEffect(() => {
        console.log(isLoading)
    },[isLoading]);

    const validatePassword = () => {
        if (userData.password == "" && userData.password.length >= 8 ) {
            return true
        } else {
            return false
        }
    }

    const validatePhoneNumber = () => {
        if (userData.phoneNumber == "" && userData.phoneNumber.length === 14) {
            return true
        } else {
            return false
        }
    }

    const validateEmail = () => {
        if (userData.email == "" && validator.isEmail(userData.email)) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="Login">
            <Modal
                open={isOpenSignUpModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >                  
                <Box className="BoxSignUp">
                    <h1>Inscreva-se</h1>
                    
                    <div className="inputs">
                        <form 
                            ref={formRef}
                            className="form"
                            onSubmit={(event) => onSubmit(event)}
                        >
                            <div className="mainContent">
                                <div className="leftContent">
                                    <TextField  
                                        className="textField" 
                                        id="user"
                                        value={userData.username}
                                        required
                                        label="Usuário"
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
                                        error={validatePassword()}
                                        onChange={(e) => setUserData({...userData, password: e.currentTarget.value})}
                                    />
                                    <TextField  
                                        className="textField" 
                                        id="e-mail"
                                        value={userData.email}
                                        required
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        error={validateEmail()}
                                        onChange={(e) => setUserData({...userData, email: e.currentTarget.value})}
                                    />
                                    <PatternFormat 
                                        format="(##)#####-####"
                                        id="phoneNumber" 
                                        label="Celular" 
                                        className="textField"
                                        value={userData.phoneNumber}
                                        customInput={TextField}
                                        required
                                        error={validatePhoneNumber()}
                                        variant="outlined"
                                        onChange={(e) => setUserData({...userData, phoneNumber: e.currentTarget.value.replace(/ /g, "")})}
                                    />
                                </div>

                                <div className="rightContent">
                                    <TextField  
                                        className="textField" 
                                        id="street"
                                        value={userData.address}
                                        required
                                        label="Endereço"
                                        variant="outlined"
                                        type="street"
                                        onChange={(e) => setUserData({...userData, address: e.currentTarget.value})}
                                    />
                                    <PatternFormat 
                                        format="########" 
                                        id="zipCode"
                                        label="CEP" 
                                        required
                                        className="textField"
                                        value={userData.zipCode}
                                        variant="outlined"
                                        customInput={TextField}
                                        onChange={(e) => setUserData({...userData, zipCode: e.currentTarget.value})}
                                    />
                                    <TextField  
                                        className="textField" 
                                        id="city"
                                        value={userData.city}
                                        required
                                        label="Cidade"
                                        variant="outlined"
                                        type="city"
                                        onChange={(e) => setUserData({...userData, city: e.currentTarget.value})}
                                    />
                                    <TextField  
                                        className="textField" 
                                        id="state"
                                        value={userData.state}
                                        required
                                        label="Estado"
                                        variant="outlined"
                                        type="state"
                                        onChange={(e) => setUserData({...userData, state: e.currentTarget.value})}
                                    />
                                </div>
                            </div>

                            <LoadingButton 
                                className="button" 
                                variant="contained"
                                onClick={handleSignUp}
                                loading={isLoading}
                            >
                                SignUp
                            </LoadingButton>
                        </form>
                    </div>
                    {error ?
                        <Alert className="AlertComponent" severity="error">
                            <AlertTitle>{errorMessage}</AlertTitle>
                        </Alert>
                        :
                        <></>
                    }
                </Box>
            </Modal>
        </div>
  );
}

export default SignUp;
