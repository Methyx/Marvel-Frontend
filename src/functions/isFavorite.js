import Cookies from "js-cookie";

const isFavorite = (id) => {
  const favorites = Cookies.get("marvel-favorites");
  if (!favorites) {
    return false;
  }
  const tabFavorites = JSON.parse(favorites);
  const index = tabFavorites.indexOf(id);
  if (index === -1) {
    return false;
  } else {
    return true;
  }
};

export default isFavorite;
