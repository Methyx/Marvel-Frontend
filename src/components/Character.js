import { useNavigate } from "react-router-dom";

import "../css/character.css";

const Character = ({ character }) => {
  const navigate = useNavigate();
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
      <p className="name"> {character.name}</p>
      <div className="description-container">
        <p className="description">{character.description}</p>
      </div>
    </div>
  );
};

export default Character;
