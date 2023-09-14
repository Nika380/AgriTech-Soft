import axios from "axios";

async function handleFetchWeather2() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  console.log(apiKey)
  const options = {
    method: "GET",
    url: `https://api.weatherbit.io/v2.0/forecast/daily?city=Tbilisi,GE&key=${apiKey}`,
  };
  const response = await axios.request(options);
  return response.data;
}

export default handleFetchWeather2;
