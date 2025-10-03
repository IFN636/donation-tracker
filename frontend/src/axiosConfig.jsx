import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://ifn636-donation.khangvo.dev",
    baseURL: "http://localhost:5001",
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
