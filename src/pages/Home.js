import { useEffect, useState } from "react";

import "../css/home.css";

// Components
import Character from "../components/Character";

// functions
import useDebounce from "../functions/useDebounce";
import fetchDataCharacters from "../functions/fetchDataCharacters";

const Home = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [nbPerPage, setNbPerPage] = useState(100);
  const [data, setData] = useState(null);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [page, setPage] = useState(1);

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

  // useEffect(() => {}, [searchCharacter]);

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
                    } else if (event.target.value >= 100) {
                      setNbPerPage(100);
                    } else {
                      setNbPerPage(event.target.value);
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
              {page > 1 && (
                <button onClick={() => setPage(page - 1)}> - </button>
              )}
              <span>
                Page : {page} / {Math.ceil(data.count / nbPerPage)}
              </span>
              {page < Math.ceil(data.count / nbPerPage) && (
                <button onClick={() => setPage(page + 1)}>+</button>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
