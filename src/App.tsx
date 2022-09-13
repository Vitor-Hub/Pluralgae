import "./App.scss";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaleConosco from "./pages/FaleConosco";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";
import { RefObject, useRef } from "react";

function App() {

  const AdvantagesRef = useRef<HTMLDivElement>(null);
  const ContactUsRef = useRef<HTMLDivElement>(null);
  const WhoWeAreRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <BrowserRouter>
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
    </div>
  );
}

export default App;
