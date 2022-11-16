import { useEffect, useState } from "react";
import axios from "axios";

import "../css/home.css";

import Character from "../components/Character";

const Home = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  // Initialisations

  useEffect(() => {
    const fetchData = async () => {
      const urlBack = "https://site--marvel-backend--gw6mlgwnmzwz.code.run";
      try {
        const response = await axios.get(urlBack + "/characters");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container home-content">
      {isLoading ? (
        <p className="loading">Chargement en cours ...</p>
      ) : (
        <div className="home">
          <section className="characters-container">
            {data.results.map((item) => {
              return <Character key={item._id} character={item} />;
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
