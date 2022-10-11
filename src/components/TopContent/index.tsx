import React from 'react';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/auth";
import { ModalControlContext } from "../../contexts/modals";
import "./index.scss";

var userIcon = require('../../assets/userIcon.svg');

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
                    <h5>Olá, Vitor</h5>
                    <div className="actions">
                        <h5><Link to="/ConfigAccount">Minha conta</Link></h5>
                        <h5 className="pipe">&nbsp;|&nbsp;</h5>
                        <h5 onClick={handleSignOut}>Sair</h5>   
                    </div>
                </div>
                :
                <div className="loginUser">
                    <img src={userIcon.default} alt="profile" />
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
