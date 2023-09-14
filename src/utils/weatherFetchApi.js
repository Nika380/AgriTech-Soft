import axios from "axios";

async function handleFetchWeather2() {
  const options = {
    method: "GET",
    url: `https://api.weatherbit.io/v2.0/forecast/daily?city=Tbilisi,GE&key=${process.env.NEXT_PUBLIC_PUBLICAPI_KEY}`,
  };
  const response = await axios.request(options);
  return response.data;
}

export default handleFetchWeather2;
