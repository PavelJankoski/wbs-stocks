import axios from "axios";

// https://www.alphavantage.co/documentation/
const API_DRIVER = axios.create({
    baseURL: "/query",
    params: {
        apikey: process.env.REACT_APP_ALPHAVANTAGE_APIKEY
    },
    responseType: "json",
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
});

export default API_DRIVER;
