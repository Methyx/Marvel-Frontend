import "../css/character.css";

const Character = ({ character }) => {
  return (
    <div className="character">
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
