import { useState, useEffect } from "react";
import { API } from "../utils/API";
import { useGlobalContext } from "../context/global/GlobalContextProvider";

const useFetchCulturesAPI = () => {
  const { state } = useGlobalContext();
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
  }, [state.apiCallRefresh]);

  return [data, Error, isLoading];
};

export default useFetchCulturesAPI;
