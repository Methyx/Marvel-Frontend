import { Link, useLocation } from "react-router-dom";

import logo from "../img/Marvel_Logo.svg";
import "../css/header.css";

const Header = () => {
  const location = useLocation().pathname;
  return (
    <header>
      <div className="header-content container">
        <section className="top">
          <img src={logo} alt="logo Marvel" />
        </section>
        <section className="bottom">
          <Link className={location === "/" ? "menu here" : "menu"} to="/">
            Les Personnages
          </Link>
          <Link
            className={location === "/comics" ? "menu here" : "menu"}
            to="/comics"
          >
            Les Comics
          </Link>
          <Link
            className={location === "/favoris" ? "menu here" : "menu"}
            to="/favoris"
          >
            Mes Favoris
          </Link>
        </section>
      </div>
    </header>
  );
};

export default Header;
