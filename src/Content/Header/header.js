import React from "react";
import { useLocation } from "react-router";
import "./header.css";

function Header() {
  const location = useLocation();
  if (location.pathname === "/zelda") {
    return (
      <div className="theDiv">
        <h1>Zelda Characters, Places, & Bosses</h1>
      </div>
    );
  }
  if (location.pathname === "/amiibos") {
    return (
      <div className="theDiv">
        <h1>These are all the Amiibos ever released</h1>
      </div>
    );
  }
  if (location.pathname === "/contact") {
    return (
      <div className="theDiv">
        <h1>Get in touch</h1>
      </div>
    );
  }

  return (
    <div className="theDiv">
      <h1>
        Welcome to David's RESTful/GraphQL project
      </h1>
    </div>
  );
}

export default Header;
