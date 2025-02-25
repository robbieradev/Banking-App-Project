import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Your Spring Boot backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
