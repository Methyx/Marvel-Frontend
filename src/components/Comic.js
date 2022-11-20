import "../css/comic.css";
import decodeHTML from "../functions/decodeHTML";

const Comic = ({ comic }) => {
  return (
    <div className="comic">
      <p className="name"> {comic.title}</p>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt="comic"
      />
      <div className="description-container">
        <p className="description">{decodeHTML(comic.description)}</p>
      </div>
    </div>
  );
};

export default Comic;
