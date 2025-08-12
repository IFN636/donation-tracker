import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5001"
        : "http://54.252.197.144:5001";
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
