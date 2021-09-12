import {API_DRIVER_BACKEND, API_DRIVER_CG} from "../../axiosConfig";
import {Currency} from "../shared/objects/currencies";

const CryptocurrenciesService = {
    fetchCoinsMarketData: (vsCurrency = 'usd', page = 1, pageSize = 100) => {
        return API_DRIVER_CG.get('/coins/markets', {
            params: {
                vs_currency: vsCurrency,
                page: page,
                per_page: pageSize,
                price_change_percentage: '1h,24h,7d'
            }
        })
    },

    fetchExchangesList: (page = 1, pageSize = 100) => {
        return API_DRIVER_CG.get('/exchanges', {
            params: {
                page: page,
                per_size: pageSize
            }
        })
    },

    fetchCoinDetails: (id) => {
        return API_DRIVER_CG.get(`/coins/${id}`, {
            params: {
                tickers: false
            }
        })
    },
    fetchCoinAbstract: (name) => {
        return API_DRIVER_BACKEND.get(`/cryptocurrency/${name}`)
    },
    fetchCoinOHCLData: (id, days, vsCurrency = Currency.USD) => {
        return API_DRIVER_CG.get(`/coins/${id}/ohlc`, {
            params: {
                vs_currency: vsCurrency,
                days: days
            }
        })
    },
    fetchCoinMarketChartData: (id, days, vsCurrency = Currency.USD) => {
        return API_DRIVER_CG.get(`/coins/${id}/market_chart`, {
            params: {
                vs_currency: vsCurrency,
                days: days
            }
        })
    }
}

export default CryptocurrenciesService;
