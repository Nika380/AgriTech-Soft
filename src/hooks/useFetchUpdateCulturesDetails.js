import { useState, useEffect } from "react";
import { API } from "../utils/API";
import { useGlobalContext } from "../context/global/GlobalContextProvider";

const useFetchUpdateCulturesDetails = (id) => {
  const { state } = useGlobalContext();

  const [dataSource, setdataSource] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleUpdapteCultureDetailsAPI = async () => {
    setisLoading(true);
    await API.get(`/cultures/details/${id}`)
      .then((res) => {
        setdataSource(res.data.content), console.log(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    handleUpdapteCultureDetailsAPI();
  }, [state.apiCallRefresh]);

  return [dataSource, Error, isLoading];
};

export default useFetchUpdateCulturesDetails;
