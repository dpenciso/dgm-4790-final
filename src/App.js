import React from "react";
import "./App.css";
// import Amiibo from "./Content/Amiibo/Amiibo";
// import Header from "./Content/Header/header";
// import ButtonAppBar from "./Content/Bar/ButtonAppBar";
// import Home from "./Content/Home/Home";
import { BrowserRouter } from "react-router-dom";
import Content from "./Content/Content";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
