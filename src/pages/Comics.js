import { useEffect, useState } from "react";

import "../css/comics.css";

// Components
import Comic from "../components/Comic";

// functions
import useDebounce from "../functions/useDebounce";
import fetchDataComics from "../functions/fetchDataComics";

const Comics = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [nbPerPage, setNbPerPage] = useState(100);
  const [data, setData] = useState(null);
  const [searchComic, setSearchComic] = useState("");
  const [page, setPage] = useState(1);

  // Init
  const debounceSearchComic = useDebounce(searchComic, 500, setPage);

  // UseEffect
  useEffect(() => {
    fetchDataComics(
      nbPerPage,
      page,
      debounceSearchComic,
      setIsLoading,
      setData
    );
  }, [debounceSearchComic, nbPerPage, page]);

  return (
    <div className="container comics-content">
      {isLoading ? (
        <p className="loading">Chargement en cours ...</p>
      ) : (
        <>
          <div className="search">
            <input
              type="text"
              placeholder="Chercher un comics"
              value={searchComic}
              onChange={(event) => {
                setSearchComic(event.target.value);
              }}
            />
            <button
              onClick={() => {
                setPage(1);
                setSearchComic("");
              }}
            >
              Reset
            </button>
          </div>

          <div className="comics">
            <section className="handle-page-top">
              <p>Comics trouvés : {data.count}</p>
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
            <section className="comics-container">
              {data.results.map((item) => {
                return <Comic key={item._id} comic={item} />;
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

export default Comics;
