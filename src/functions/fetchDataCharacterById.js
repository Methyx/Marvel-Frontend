import axios from "axios";

const fetchDataCharacterById = async (id, setIsLoading, setData) => {
  setIsLoading(true);
  const url =
    "https://site--marvel-backend--gw6mlgwnmzwz.code.run/comics/" + id;
  try {
    const response = await axios.get(url);
    setData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default fetchDataCharacterById;
