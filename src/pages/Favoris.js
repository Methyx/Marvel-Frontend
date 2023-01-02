import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "../css/home.css";

// Components
import Character from "../components/Character";

// functions
import loadFavoris from "../functions/loadFavoris";
import { Link } from "react-router-dom";

const Favoris = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);

  // Init

  // UseEffect
  useEffect(() => {
    if (Cookies.get("marvel-favorites")) {
      loadFavoris(setIsLoading, setData);
      setReload(false);
    }
  }, [reload]);

  return (
    <div className="container home-content">
      {!Cookies.get("marvel-favorites") ? (
        <p className="no-favorites">
          Tu n'as pas encore de personnages favoris ...
        </p>
      ) : isLoading ? (
        <p className="loading">Chargement en cours ...</p>
      ) : (
        <>
          <div className="home">
            <section className="handle-page-top">
              <p>Personnages trouvés : {data.length}</p>
              <Link to="/favoris/class">Classe tes favoris</Link>
            </section>
            <section className="characters-container">
              {data.map((item) => {
                return (
                  <Character
                    key={item._id}
                    character={item}
                    setReload={setReload}
                  />
                );
              })}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Favoris;
