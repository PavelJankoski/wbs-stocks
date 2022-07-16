import axios from "axios";

export const API_DRIVER_BACKEND = axios.create({
    baseURL: "http://localhost:8080/api/",
    responseType: "json",
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
});