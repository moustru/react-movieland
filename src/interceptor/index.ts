import axios from "axios";

axios.interceptors.request.use(async (config) => {
  config.baseURL = import.meta.env.VITE_APP_BASE_URL;

  config.params = {
    api_key: import.meta.env.VITE_APP_API_KEY,
    language: "ru-RU",
    region: "RU",
  };

  return config;
});
