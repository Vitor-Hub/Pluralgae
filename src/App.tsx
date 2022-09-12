import "./App.scss";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaleConosco from "./pages/FaleConosco";
import HeaderMenu from "./components/HeaderMenu";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="topBar" />
      <BrowserRouter>
        <HeaderMenu/>
        <Routes>
          <Route element={<Home />} path="" />
          <Route element={<FaleConosco />} path="/FaleConosco" />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
