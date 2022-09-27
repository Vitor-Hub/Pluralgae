import "./App.scss";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaleConosco from "./pages/FaleConosco";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";
import { useRef, useState } from "react";
import Login from "./components/Home/Login";
import TopContent from "./components/TopContent";

function App() {

  const AdvantagesRef = useRef<HTMLDivElement>(null);
  const ContactUsRef = useRef<HTMLDivElement>(null);
  const WhoWeAreRef = useRef<HTMLDivElement>(null);

  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  return (
    <div className="App">
      <BrowserRouter>
        <TopContent setIsOpenLoginModal={setIsOpenLoginModal}/>
        <HeaderMenu AdvantagesRef={AdvantagesRef} ContactUsRef={ContactUsRef} WhoWeAreRef={WhoWeAreRef} />
        <Routes>
          <Route element={
            <Home 
              AdvantagesRef={AdvantagesRef} 
              ContactUsRef={ContactUsRef} 
              WhoWeAreRef={WhoWeAreRef} 
            />} path="" />
          <Route element={<FaleConosco />} path="/FaleConosco" />
        </Routes>
      </BrowserRouter>
      <Footer/>
      <Login isOpenLoginModal={isOpenLoginModal} setIsOpenLoginModal={setIsOpenLoginModal}/>
    </div>
  );
}

export default App;
