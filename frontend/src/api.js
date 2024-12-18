import axios from "axios";

const api = axios.create({
    baseURL: "https://inventory-managment-app.onrender.com",
});

export default api;