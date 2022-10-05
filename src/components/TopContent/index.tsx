import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { ModalControlContext } from "../../contexts/modals";
import "./index.scss";

const TopContent = () => {

    const {signed, signOut} = useContext(AuthContext);
    const {setIsOpenSignInModal, setIsOpenSignUpModal} = useContext(ModalControlContext);

    const handleSignOut = () => {
        signOut();
    }

    return (
        <div className="TopContent">
            {signed ?
                <>
                    <h5>Profile</h5>
                    <h5 onClick={handleSignOut}>Sair</h5>
                </>
                :
                <>
                    <h5 onClick={() => setIsOpenSignUpModal(true)}>Cadastre-se</h5>
                    <h5 onClick={() => setIsOpenSignInModal(true)}>Login</h5>
                </>
            }
            
        </div>
  );
}

export default TopContent;
