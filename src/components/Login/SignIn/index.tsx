import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Modal, TextField } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import { ModalControlContext } from "../../../contexts/modals";
import {ISignIn} from "../../../types/auth.type";
import "./index.scss";

const SignIn = () => {

    const {setIsOpenSignInModal, isOpenSignInModal} = useContext(ModalControlContext);
    
    const formRef = useRef<HTMLFormElement>(null);

    const {signIn, error} = useContext(AuthContext);

    const [userData, setUserData] = useState<ISignIn>({
        username: "",
        password:""
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

    return (
        <div className="Login">
            <Modal
                open={isOpenSignInModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
                            <h5>Esqueceu sua senha?</h5>
                        </form>
                    </div>
                    {error ?
                        <Alert className="AlertComponent" severity="error">
                            <AlertTitle>Usuário ou senha inválidos</AlertTitle>
                        </Alert>
                        :
                        <></>
                    }
                </Box>
            </Modal>
        </div>
  );
}

export default SignIn;
