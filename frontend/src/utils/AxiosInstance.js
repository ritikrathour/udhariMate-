import axios from "axios";

const isProduction = process.env.NODE_ENV === 'production';
const AxiosInstance = axios.create({
  baseURL: isProduction ? import.meta.env.VITE_BASE_URL_PRODUCTION : import.meta.env.VITE_BASE_URL_DEVELOPMENT,
  withCredentials: true, // Important: This enables cookies to be sent and received
});
export default AxiosInstance