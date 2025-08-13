import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5001"
        : "http://3.27.248.53:5001";
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
