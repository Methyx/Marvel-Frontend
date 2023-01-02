import Cookies from "js-cookie";

const saveFavoris = (data) => {
  const favorites = [];
  for (let i = 0; i < data.length; i++) {
    favorites.push(data[i]._id);
  }
  Cookies.set("marvel-favorites", JSON.stringify(favorites), {
    expires: 150,
  });
};

export default saveFavoris;
