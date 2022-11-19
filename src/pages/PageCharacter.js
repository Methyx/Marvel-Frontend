import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fetchDataCharacterById from "../functions/fetchDataCharacterById";

import Comic from "../components/Comic";

import "../css/page-character.css";

const PageCharacter = () => {
  const navigate = useNavigate();

  // récuperation de l'id en Params
  const { id } = useParams();

  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDataCharacterById(id, setIsLoading, setData);
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p className="loading">Chargement en cours ...</p>
      ) : (
        <div className="page-character container">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Retour à la liste
          </button>
          <section className="rappel-character">
            <h1>{data.name}</h1>
            <img
              src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
              alt="personnage"
            />
            <p>{data.description}</p>
          </section>
          {data.comics.length > 0 && (
            <h2>Ce personnage apparait dans les comics suivants :</h2>
          )}
          <section className="comics-list">
            {data.comics.map((item) => {
              return <Comic key={item._id} comic={item} />;
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default PageCharacter;
