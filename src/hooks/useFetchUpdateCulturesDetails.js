import { useState, useEffect } from "react";
import { API } from "../utils/API";
import { useGlobalContext } from "../context/global/GlobalContextProvider";

const useFetchUpdateCulturesDetails = (id) => {
  const { state } = useGlobalContext();

  const [dataSource, setdataSource] = useState([]);
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleUpdateCultureDetailsAPI = async () => {
    setisLoading(true);
    try {
      const res = await API.get(`/cultures/details/${id}`);
      const modifiedData = res.data.content.map((item) => ({
        ...item,
        taskType: item.taskType === 1 ? "შემოსავალი" : "ხარჯი",
        plannedAt: item.plannedAt.slice(0, 10),
      }));
      setdataSource(modifiedData);
      console.log(modifiedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    handleUpdateCultureDetailsAPI();
  }, [state.apiCallRefresh]);

  return [dataSource, Error, isLoading];
};

export default useFetchUpdateCulturesDetails;
