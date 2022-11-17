import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "../css/home.css";

// Components
import Character from "../components/Character";

// functions
import useDebounce from "../functions/useDebounce";
import fetchDataCharacters from "../functions/fetchDataCharacters";

const Home = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [nbPerPage, setNbPerPage] = useState(
    Cookies.get("Marvel-nbPerPage") || 100
  );
  const [data, setData] = useState(null);
  const [searchCharacter, setSearchCharacter] = useState(
    Cookies.get("Marvel-search") || ""
  );
  const [page, setPage] = useState(Cookies.get("Marvel-page") || 1);

  // Init
  const debounceSearchCharacter = useDebounce(searchCharacter, 500, setPage);

  // UseEffect
  useEffect(() => {
    fetchDataCharacters(
      nbPerPage,
      page,
      debounceSearchCharacter,
      setIsLoading,
      setData
    );
  }, [debounceSearchCharacter, nbPerPage, page]);

  return (
    <div className="container home-content">
      {isLoading ? (
        <p className="loading">Chargement en cours ...</p>
      ) : (
        <>
          <div className="search">
            <input
              type="text"
              placeholder="Chercher un personnage"
              value={searchCharacter}
              onChange={(event) => {
                setSearchCharacter(event.target.value);
              }}
            />
            <button
              onClick={() => {
                Cookies.remove("Marvel-page");
                Cookies.remove("Marvel-search");
                setPage(1);
                setSearchCharacter("");
              }}
            >
              Reset
            </button>
          </div>

          <div className="home">
            <section className="handle-page-top">
              <p>Personnages trouvés : {data.count}</p>
              <div>
                <span>Affichés par page : </span>
                <input
                  type="number"
                  value={nbPerPage}
                  onChange={(event) => {
                    if (event.target.value <= 0) {
                      setNbPerPage(0);
                      Cookies.set("Marvel-nbPerPage", "0");
                    } else if (event.target.value >= 100) {
                      setNbPerPage(100);
                      Cookies.set("Marvel-nbPerPage", "100");
                    } else {
                      setNbPerPage(event.target.value);
                      Cookies.set("Marvel-nbPerPage", event.target.value);
                    }
                  }}
                />
              </div>
            </section>
            <section className="characters-container">
              {data.results.map((item) => {
                return <Character key={item._id} character={item} />;
              })}
            </section>
            <section className="handle-page-bottom">
              <span>Page : </span>
              <input
                type="number"
                value={page}
                onChange={(event) => {
                  if (
                    event.target.value >= 1 &&
                    event.target.value <= Math.ceil(data.count / nbPerPage)
                  ) {
                    Cookies.set("Marvel-page", event.target.value);
                    setPage(event.target.value);
                  }
                }}
              />
              <span> / {Math.ceil(data.count / nbPerPage)}</span>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
