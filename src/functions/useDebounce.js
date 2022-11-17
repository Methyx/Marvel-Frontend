import { useState, useEffect } from "react";

const useDebounce = (value, delay, setPage) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setPage(1);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setPage]);
  return debouncedValue;
};

export default useDebounce;
