import Cookies from "js-cookie";

const toggleFavorite = (id, setFavorite) => {
  let index = -1;
  let tabFavorites = [];
  const favorites = Cookies.get("marvel-favorites");
  if (favorites) {
    tabFavorites = JSON.parse(favorites);
    index = tabFavorites.indexOf(id);
  }
  if (index === -1) {
    tabFavorites.push(id);
    setFavorite(true);
  } else {
    tabFavorites.splice(index, 1);
    setFavorite(false);
  }
  Cookies.set("marvel-favorites", JSON.stringify(tabFavorites));
};

export default toggleFavorite;
