import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/Home" />
          <Route element={<Products />} path="/Products" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
