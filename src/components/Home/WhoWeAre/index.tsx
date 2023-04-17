import React, { RefObject, useEffect, useState } from "react";
import SocialIcons from "../../SocialIcons";
import "./index.scss";

var marianaProfile = require("../../../assets/mariana_profile.jpg");
var arielProfile = require("../../../assets/ariel_profile.jpg");

interface IWhoWeAreProps {
  WhoWeAreRef: RefObject<HTMLDivElement>;
}

const WhoWeAre = (props: IWhoWeAreProps) => {
  const { WhoWeAreRef } = props;

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const responsiveWidth = 1060;

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <>
      {windowSize.innerWidth > responsiveWidth ? (
        <div ref={WhoWeAreRef} className="WhoWeAre">
          <div className="leftContent">
            <h1 className="title">Quem somos</h1>
            <h3 className="description">
              A Pluralgae nasceu com o propósito de trazer saúde para o mundo
              com consciência socioambiental, oferecendo super alimentos a
              partir de processos carbono negativos e elevado controle de
              qualidade. <br />
              <br /> Fundada em 2017 pela Drª Mariana Fortes a partir do seu
              doutorado em microalgas na UFRJ, uniu-se ao sonho de fazer a
              diferença no mundo do Ariel Kozlowski, economista e empreendedor
              social.
            </h3>
            <h3 className="subDescription">
              <br />
              Pluralgae, fazendo o bem para você e para o Planeta. Bem-vindos ao
              negócio do futuro!
            </h3>
          </div>
          <div className="rightContent">
            <div className="profile">
              <img src={marianaProfile} alt="img" />
              <div className="infos">
                <h3 className="name">Mariana Fortes</h3>
                <h3 className="role">Engenheira Química e Doutora</h3>
              </div>
            </div>
            <div className="profile">
              <img src={arielProfile} alt="img" />
              <div className="infos">
                <h3 className="name">Ariel Kozlowski</h3>
                <h3 className="role">Economista e Empreendedor Social</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={WhoWeAreRef} className="WhoWeAre">
          <div className="leftContent">
            <h1 className="title">Quem somos</h1>
            <h3 className="description">
              A Pluralgae nasceu com o propósito de trazer saúde para o mundo
              com consciência socioambiental, oferecendo super alimentos a
              partir de processos carbono negativos e elevado controle de
              qualidade.
            </h3>
            <div className="rightContent">
              <div className="profile">
                <img src={marianaProfile} alt="img" />
                <div className="infos">
                  <h3 className="name">Mariana Fortes</h3>
                  <h3 className="role">Engenheira Química e Doutora</h3>
                </div>
              </div>
              <div className="profile">
                <img src={arielProfile} alt="img" />
                <div className="infos">
                  <h3 className="name">Ariel Kozlowski</h3>
                  <h3 className="role">Economista e Empreendedor Social</h3>
                </div>
              </div>
            </div>
            <h3 className="description">
              Fundada em 2017 pela Drª Mariana Fortes a partir do seu doutorado
              em microalgas na UFRJ, uniu-se ao sonho de fazer a diferença no
              mundo do Ariel Kozlowski, economista e empreendedor social.
            </h3>
            <h3 className="subDescription">
              <br />
              Pluralgae, fazendo o bem para você e para o Planeta. Bem-vindos ao
              negócio do futuro!
            </h3>
          </div>

          <div className="socialIcons">
            <SocialIcons />
          </div>
        </div>
      )}
    </>
  );
};

export default WhoWeAre;
