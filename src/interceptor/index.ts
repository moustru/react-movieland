import axios from "axios";

axios.interceptors.request.use(async (config) => {
  config.baseURL = `${import.meta.env.VITE_APP_BASE_URL}&api_key=${
    import.meta.env.VITE_APP_API_KEY
  }`;

  return config;
});
