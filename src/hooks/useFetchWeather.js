import { useEffect, useState } from "react";
import handleFetchWeather2 from "../../src/utils/weatherFetchApi";

const useFetchWeather = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setisLoading(true);
    handleFetchWeather2()
      .then((info) => setData(info.data))
      .catch((err) => setError(err))
      .finally(() => setisLoading(false));
  }, []);
  return [data, isLoading, error];
};

export default useFetchWeather;
