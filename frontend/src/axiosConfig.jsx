import axios from "axios";

// const baseURL =
//     process.env.NODE_ENV === "development"
//         ? "http://localhost:5001"
//         : "http://3.24.15.154:5001";

const axiosInstance = axios.create({
    baseURL: "http://3.24.15.154:5001",
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
