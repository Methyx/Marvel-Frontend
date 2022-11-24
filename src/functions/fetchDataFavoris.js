import axios from "axios";
import Cookies from "js-cookie";

const fetchDataFavoris = async (setIsLoading, setData) => {
  setIsLoading(true);
  const tabFavoris = JSON.parse(Cookies.get("marvel-favorites"));
  const data = [];
  const url = "https://site--marvel-backend--gw6mlgwnmzwz.code.run/character/";

  try {
    for (let i = 0; i < tabFavoris.length; i++) {
      const response = await axios.get(url + tabFavoris[i]);
      data.push(response.data);
    }
  } catch (error) {
    console.log(error.message);
  }
  setData(data);
  setIsLoading(false);
};
export default fetchDataFavoris;
