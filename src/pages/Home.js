import { useEffect, useState } from "react";
import axios from "axios";

import "../css/home.css";

// Components
import Character from "../components/Character";

const Home = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchCharacter, setSearchCharacter] = useState("");

  // functions
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  };

  // Init
  const debounceSearchCharacter = useDebounce(searchCharacter, 500);

  // UseEffect
  useEffect(() => {
    const fetchData = async () => {
      const urlBack =
        "https://site--marvel-backend--gw6mlgwnmzwz.code.run/characters";
      let params = 0;
      let url = urlBack;
      try {
        if (debounceSearchCharacter) {
          url += "?name=" + debounceSearchCharacter;
          params++;
        }
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // setIsLoading(true);
    fetchData();
  }, [debounceSearchCharacter]);

  useEffect(() => {}, [searchCharacter]);

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
            <section className="characters-container">
              {data.results.map((item) => {
                return <Character key={item._id} character={item} />;
              })}
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
