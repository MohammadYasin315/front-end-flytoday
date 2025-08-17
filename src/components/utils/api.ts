import axios from "axios";
import { getAccessToken, removeTokens } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("🚫 Unauthorized access, logging out...");
      removeTokens();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }
    }
    return Promise.reject(error);
  }
); //کاربر خودکار لاگ اوت بشه

type HotelDetail = {};

export const getHotelRooms = (hotelId: number): Promise<HotelDetail> => {
  return api
    .get(`/hotels/${hotelId}/`)
    .then((response) => {
      console.log("📦 Fetched hotel rooms:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching hotel rooms:", error);
      throw error; 
    });
};

export default api;
