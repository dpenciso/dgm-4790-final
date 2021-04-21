import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Amiibo</h1>
      <p className="amiiboContent">
        <Link className="homeLink" to="/amiibos">
          Amiibo
        </Link>{" "}
        is a toys-to-life platform by Nintendo, which was launched in November
        2014. It consists of a wireless communications and storage protocol for
        connecting figurines to the Wii U, Nintendo 3DS, and Nintendo Switch
        video game consoles. These figurines are similar in form and
        functionality to that of the Skylanders, Disney Infinity and Lego
        Dimensions series of toys-to-life platforms. The Amiibo platform was
        preannounced to potentially accommodate any form of toy, specifically
        including general plans for future card games. These toys use near field
        communication (NFC) to interact with supported video game software,
        potentially allowing data to be transferred in and out of games and
        across multiple platforms.
      </p>
      <div className="homeVideo">
        <iframe
          title="youtubeVideo"
          width="750"
          height="500"
          src="https://www.youtube.com/embed/odUjMhc6YgU"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p className="amiiboContentSubscribe">
        Please Subscribe to our newsletter
      </p>
    </div>
  );
}

export default Home;
