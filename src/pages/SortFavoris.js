import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import loadFavoris from "../functions/loadFavoris";
import saveFavoris from "../functions/saveFavoris";

import "../css/sortFavoris.css";

const SortFavoris = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dragItem = useRef();
  const dragOverItem = useRef();
  const LeavingItem = useRef();

  // functions Drag and Drop

  const dragStart = (e, position) => {
    dragItem.current = position;
    LeavingItem.current = e.target;
    console.log(LeavingItem.current);
    const newData = [...data];
    newData.push({ name: " ", thumbnail: { path: " ", extension: " " } });
    setData(newData);
    console.log("dragStart : ", position);
  };

  const dragEnter = (e, position) => {
    if (dragOverItem.current !== position) {
      dragOverItem.current = position;
      LeavingItem.current.classList.remove("margin-left");
      e.target.classList.add("margin-left");
      LeavingItem.current = e.target;
    }
    console.log("dragEnter : ", position);
  };
  const dragLeave = (e, position) => {
    console.log("dragLeave = ", position);
  };

  const drop = (e) => {
    LeavingItem.current.classList.remove("margin-left");
    const copyData = [...data];
    copyData.pop();
    const dragItemContent = copyData[dragItem.current];
    copyData.splice(dragItem.current, 1);
    if (dragItem.current < dragOverItem.current) {
      copyData.splice(dragOverItem.current - 1, 0, dragItemContent);
    } else {
      copyData.splice(dragOverItem.current, 0, dragItemContent);
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setData(copyData);
  };

  useEffect(() => {
    loadFavoris(setIsLoading, setData);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <p className="loading">Chargement en cours ...</p>
      ) : (
        <>
          <p className="page-title">
            {
              "-->  Drag 'n Drop tes personnages favoris pour les classer dans l'ordre que tu veux"
            }
          </p>
          <div className="center">
            <button
              className="save-button"
              onClick={() => {
                saveFavoris(data);
                navigate("/favoris");
              }}
            >
              Sauvegarder et retour
            </button>
          </div>
          <div className="sort-favoris container">
            {data.map((character, index) => {
              return (
                <div
                  key={index}
                  className="mini-favori"
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragLeave={(e) => dragLeave(e, index)}
                  onDragEnd={drop}
                  draggable="true"
                >
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt="personnage"
                    draggable="false"
                  />
                  <p className="name" draggable="false">
                    {character.name}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default SortFavoris;
