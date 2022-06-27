import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Login from "./Login";
import Registration from "./Registration";

function Home() {
  return (
    <>
      <div>
        <Link to="/login">
                <button className="nav-button">Prisijungti</button>{" "}
              </Link>
        <Link to="/register">
                <button className="nav-button">Registracija</button>{" "}
              </Link>
      </div>
      <h1 className="welcome">Sveiki atvyke į biblioteką!</h1>
      <p>Užsiregistruokites ir prisijunkite paspaudė viršuje esančias nuorodas ir peržiūrėkite mūsų katalogą!</p>
    </>
  );
}

export default Home;
