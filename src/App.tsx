import "./App.scss";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";
import { useRef } from "react";
import TopContent from "./components/TopContent";
import { AuthProvider } from "./contexts/auth";
import { ModalControlProvider } from "./contexts/modals";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import ConfigAccount from "./pages/ConfigAccount";
import Checkout from "./pages/Checkout";

function App() {

  const AdvantagesRef = useRef<HTMLDivElement>(null);
  const ContactUsRef = useRef<HTMLDivElement>(null);
  const WhoWeAreRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("token");

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
                <Route element={<ConfigAccount />} path="/configAccount" />
                <Route element={<Checkout />} path="/checkout" />
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
