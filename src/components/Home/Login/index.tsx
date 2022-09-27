import { Box, Button, Modal, TextField } from "@mui/material";
import "./index.scss";

interface ILogin {
    isOpenLoginModal: boolean;
    setIsOpenLoginModal: Function;
}

const Login = (props: ILogin) => {

    const {isOpenLoginModal,setIsOpenLoginModal} = props;

    const handleCloseModal = () => {
        setIsOpenLoginModal(false);
    }

    return (
        <div className="Login">
            <Modal
                open={isOpenLoginModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="Box">
                    <h1>Login</h1>
                    
                    <div className="inputs">
                        <form action="">
                            <TextField  
                                className="textField" 
                                id="user"
                                onChange={() => {}}
                                //value={emailData.subject}
                                required
                                label="Usuário"
                                variant="outlined"
                            />

                            <TextField  
                                className="textField" 
                                id="password"
                                onChange={() => {}}
                                //value={emailData.subject}
                                required
                                label="Senha"
                                variant="outlined"
                                type="password"
                            />
                            <Button className="button" variant="contained">Login</Button>
                            <h5>Esqueceu sua senha?</h5>
                        </form>
                    </div>
                    
                </Box>
            </Modal>
        </div>
  );
}

export default Login;
