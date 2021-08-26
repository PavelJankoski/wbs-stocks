import axios from "axios";

const API_DRIVER = axios.create({
    baseURL: "/v1",
    params: {
        access_key: process.env.REACT_APP_MARKETSTACK_APIKEY
    },
    responseType: "json",
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
});

export default API_DRIVER;
