import axios from "axios";

const fetchDataComics = async (
  nbPerPage,
  page,
  debounceSearchCharacter,
  setIsLoading,
  setData
) => {
  setIsLoading(true);
  const urlBack = "https://site--marvel-backend--gw6mlgwnmzwz.code.run/comics";
  let url = urlBack;
  try {
    if (nbPerPage) {
      url += "?limit=" + nbPerPage;
    } else {
      url += "?limit=100";
    }
    if (page > 1) {
      url += "&skip=" + Math.round((page - 1) * nbPerPage);
    }
    if (debounceSearchCharacter) {
      url += "&title=" + debounceSearchCharacter;
    }
    // console.log(url);
    const response = await axios.get(url);
    setData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchDataComics;
