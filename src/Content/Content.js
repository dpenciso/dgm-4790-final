import React from "react";
import Amiibo from "../Content/Amiibo/Amiibo";
import Header from "../Content/Header/header";
import ButtonAppBar from "../Content/Bar/ButtonAppBar";
import Home from "../Content/Home/Home";
import Contact from "../Content/Contact/Contact"
import { Route } from "react-router-dom";

function Content() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/amiibos" exact component={Amiibo} />
      <Route path="/contact" exact component={Contact} />
    </div>
  );
}

export default Content;
