import "./App.scss";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";
import { useEffect, useRef } from "react";
import TopContent from "./components/TopContent";
import { AuthProvider } from "./contexts/auth";
import { ModalControlProvider } from "./contexts/modals";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import ConfigAccount from "./pages/ConfigAccount";
import Checkout from "./pages/Checkout";
import MyOders from "./pages/MyOders";

function App() {

  const AdvantagesRef = useRef<HTMLDivElement>(null);
  const ContactUsRef = useRef<HTMLDivElement>(null);
  const WhoWeAreRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <BrowserRouter>
        <ModalControlProvider>
          <AuthProvider>
            <TopContent/>
            <HeaderMenu 
              AdvantagesRef={AdvantagesRef} 
              ContactUsRef={ContactUsRef} 
              WhoWeAreRef={WhoWeAreRef} 
            />
              <Routes>
                <Route element={
                  <Home 
                    AdvantagesRef={AdvantagesRef} 
                    ContactUsRef={ContactUsRef} 
                    WhoWeAreRef={WhoWeAreRef} 
                  />} path=""/>
                <Route element={<ConfigAccount />} path="/configaccount" />
                <Route element={<Checkout />} path="/checkout" />
                <Route element={<MyOders />} path="/myoders" />
              </Routes>
            <SignIn/>
            <SignUp/>
          </AuthProvider>
        </ModalControlProvider>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
