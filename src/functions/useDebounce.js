import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useDebounce = (value, delay, setPage) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Cookies.get("Marvel-search") !== value) {
        setDebouncedValue(value);
        setPage(1);
        Cookies.set("Marvel-search", value);
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setPage]);
  return debouncedValue;
};

export default useDebounce;
