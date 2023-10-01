import axios from "axios";

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const API = axios.create({
  baseURL: domainURL,
  timeout: 20000,
});
