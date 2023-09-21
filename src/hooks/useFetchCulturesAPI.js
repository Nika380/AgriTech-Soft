import { useState, useEffect } from "react";
import { API } from "../utils/API";

const useFetchCulturesAPI = () => {
  const [data, setData] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const handleFetchAPI = async () => {
    setisLoading(true);
    await API.post("/cultures")
      .then((res) => setData(res.data.content))
      .catch((err) => setError(err.message))
      .finally(() => setisLoading(false));
  };
  useEffect(() => {
    handleFetchAPI();
  }, []);

  return [data, Error, isLoading];
};

export default useFetchCulturesAPI;
