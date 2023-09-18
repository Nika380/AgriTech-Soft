import axios from "axios";
require('dotenv').config();

async function handleFetchWeather2() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  console.log(process.env.WEATHER_KEY)
  const options = {
    method: "GET",
    url: `https://api.weatherbit.io/v2.0/forecast/daily?city=Tbilisi,GE&key=${process.env.NEXT_PUBLIC_API_KEY}`,
  };
  const response = await axios.request(options);
  return response.data;
}

export default handleFetchWeather2;
