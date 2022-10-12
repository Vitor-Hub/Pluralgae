import React, {RefObject, useEffect, useRef, useState} from "react";
import "./index.scss";
import SendEmail from "../../../services/email.service";
import ISendEmailData from "../../../types/email.type";
import { Alert, AlertTitle, InputBase, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SocialIcons from "../../SocialIcons";

var StarIcon = require('../../../assets/icon_star.png');
var FavoriteIcon = require('../../../assets/icon_favorite.png');
var HandIcon = require('../../../assets/icon_hand.png');

interface IEmailData {
    name: string;
    email: string;
    subject: string;
    text: string;
}

interface IContactUs {
    ContactUsRef: RefObject<HTMLDivElement>
}

enum EIsEmailSent {
    Sent = "sent",
    Error = "error",
    Empty = ""
}

const ContactUs = (props: IContactUs) => {

    const {ContactUsRef} = props;

    const formRef = useRef<HTMLFormElement>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [isEmailSent, setIsEmailSent] = useState<EIsEmailSent>(EIsEmailSent.Empty);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [emailData, setEmailData] = useState<IEmailData>({
        name: "",
        email: "",
        subject: "",
        text: ""
    });
    const responsiveWidth = 1060;

    useEffect(() => {
        function handleWindowResize() {
        setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    async function sendEmail(data:ISendEmailData) {
        setLoading(true);
        
        await SendEmail(data)
            .then(() => {
                setIsEmailSent(EIsEmailSent.Sent);
            })
            .catch((e: Error) => {
                console.error(e);
                setIsEmailSent(EIsEmailSent.Error);
            });
        setEmailData({name: "", email: "", subject: "", text: ""});
        setLoading(false);
        formRef?.current?.reportValidity();
    }

  return (
    <>
      <div ref={ContactUsRef} className="ContactUs">
        <div className="infos">
            <h2 className="contactTitle">{windowSize.innerWidth > responsiveWidth ? "Entre em contato conosco" : "Entre em contato"}</h2>
            <div className="iconInfos">
                <div className="star">
                    <img src={StarIcon} alt="icon" />
                    <h3>Se torne sócio investidor</h3>
                </div>
                <div className="favorite">
                    <img src={FavoriteIcon} alt="icon" />
                    <h3>Receba mais informações</h3>
                </div>
                <div className="hand">
                    <img src={HandIcon} alt="icon" />
                    <h3>Tire suas dúvidas</h3>
                </div>
            </div>
            <div className="follow">
                <h2 className="title">Nos siga</h2>
                <div className="socialIcons">
                    <SocialIcons />
                </div>
            </div>
        </div>
        <div className="inputs">
            <form 
                ref={formRef}
                className="form"
                onSubmit={(event) => onSubmit(event)}
            >
                <label htmlFor="name">Nome *</label>
                <InputBase 
                    className="textField" 
                    id="name" 
                    onChange={(e) => setEmailData({...emailData, name: e.currentTarget.value})}
                    value={emailData.name}
                    required
                />

                <label htmlFor="email">E-mail *</label>
                <InputBase 
                    className="textField" 
                    id="email"
                    onChange={(e) => setEmailData({...emailData, email: e.currentTarget.value})}
                    value={emailData.email}
                    required
                />

                <label htmlFor="subject">Assunto *</label>
                <InputBase 
                    className="textField" 
                    id="subject"
                    onChange={(e) => setEmailData({...emailData, subject: e.currentTarget.value})}
                    value={emailData.subject}
                    required
                />
                
                <label htmlFor="field">Mensagem *</label>
                <TextField 
                    className="areaField" 
                    id="field"
                    onChange={(e) => setEmailData({...emailData, text: e.currentTarget.value})}
                    value={emailData.text}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    required
                    multiline
                />
                <LoadingButton 
                    className="sendMessage"
                    loading={loading}
                    type="submit"
                    variant="contained"
                    onClick={() => {sendEmail({name: emailData.name, email: emailData.email, subject: emailData.subject, text: emailData.text})}}
                >   
                    <span>Enviar mensagem</span>
                </LoadingButton>
                {isEmailSent === EIsEmailSent.Sent ?
                    <Alert className="AlertComponent" severity="success">
                        <AlertTitle>E-mail enviado!</AlertTitle>
                    </Alert>
                    :
                    isEmailSent === EIsEmailSent.Error ?
                        <Alert className="AlertComponent" severity="error">
                            <AlertTitle>Erro ao enviar e-mail!</AlertTitle>
                        </Alert>
                        :
                        <></>
                }
            </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;