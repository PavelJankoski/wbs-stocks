import axios from "axios";

export const API_DRIVER_MS = axios.create({
    baseURL: "/v1",
    params: {
        access_key: process.env.REACT_APP_MARKETSTACK_APIKEY
    },
    responseType: "json",
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export const API_DRIVER_FH = axios.create({
    baseURL: "/api/v1",
    params: {
        token: process.env.REACT_APP_FINNHUB_APIKEY
    },
    responseType: "json",
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export const API_DRIVER_CG = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    responseType: "json",
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
});