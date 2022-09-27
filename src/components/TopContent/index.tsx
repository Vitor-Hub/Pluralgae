import "./index.scss";

interface ITopContent {
    setIsOpenLoginModal: Function;
}

const TopContent = (props: ITopContent) => {

    const {setIsOpenLoginModal} = props;

    return (
        <div className="TopContent">
            <h5 onClick={() => setIsOpenLoginModal(true)}>Cadastre-se</h5>
            <h5 onClick={() => setIsOpenLoginModal(true)}>Login</h5>
        </div>
  );
}

export default TopContent;
