import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useDebounce = (value, delay, setPage, isHomePage) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    let cookieName = "";
    if (isHomePage) {
      cookieName = "Marvel-Home-search";
    } else {
      cookieName = "Marvel-Favoris-search";
    }
    const handler = setTimeout(() => {
      if (Cookies.get(cookieName) !== value) {
        setDebouncedValue(value);
        setPage(1);
        Cookies.set(cookieName, value);
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setPage, isHomePage]);
  return debouncedValue;
};

export default useDebounce;
