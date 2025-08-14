import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5001",
    baseURL: process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL
        : "http://localhost:5001",
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
