import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction
    ? "http://3.24.15.154:5001"
    : "http://localhost:5001";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
