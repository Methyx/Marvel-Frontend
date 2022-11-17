import "../css/comic.css";

const Comic = ({ comic }) => {
  return (
    <div className="comic">
      <p className="name"> {comic.title}</p>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt="comic"
      />
      <div className="description-container">
        <p className="description">{comic.description}</p>
      </div>
    </div>
  );
};

export default Comic;
