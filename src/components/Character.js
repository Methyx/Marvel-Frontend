import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/character.css";
import toggleFavorite from "../functions/toggleFavorite";
import isFavorite from "../functions/isFavorite";

const Character = ({ character, setReload }) => {
  const navigate = useNavigate();
  // STATES
  const [favorite, setFavorite] = useState(isFavorite(character._id));
  // Start
  return (
    <div
      className="character"
      onClick={() => {
        navigate(`/character/${character._id}`);
      }}
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt="personnage"
      />
      <FontAwesomeIcon
        icon="heart"
        className={favorite ? "heart color-red" : "heart color-gray"}
        onClick={(event) => {
          event.stopPropagation();
          toggleFavorite(character._id, setFavorite);
          setReload(true);
        }}
      />

      <p className="name"> {character.name}</p>
      <div className="description-container">
        <p className="description">{character.description}</p>
      </div>
    </div>
  );
};

export default Character;
