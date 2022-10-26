import React from 'react';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/auth";
import { ModalControlContext } from "../../contexts/modals";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import "./index.scss";

const TopContent = () => {

    const {signed, signOut, user} = useContext(AuthContext);
    const {setIsOpenSignInModal, setIsOpenSignUpModal} = useContext(ModalControlContext);

    const handleSignOut = () => {
        signOut();
    }

    return (
        <div className="TopContent">
            {signed ?
                <div className="logged">
                    <h5>Olá, {user?.username}</h5>
                    <div className="actions">
                        <h5><Link to="/configAccount">Minha conta</Link></h5>
                        <h5 className="pipe">&nbsp;|&nbsp;</h5>
                        <h5 onClick={handleSignOut}><Link to="">Sair</Link></h5>   
                    </div>
                </div>
                :
                <div className="loginUser">
                    <AccountBoxIcon/>
                    <div className="infos">
                        <h5 onClick={() => setIsOpenSignUpModal(true)}>Cadastre-se</h5>
                        <h5 onClick={() => setIsOpenSignInModal(true)}>Login</h5>
                    </div>
                </div>
            }
            
        </div>
  );
}

export default TopContent;
