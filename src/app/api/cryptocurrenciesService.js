import {API_DRIVER_BACKEND, API_DRIVER_CG} from "../../axiosConfig";
import {Currency} from "../shared/objects/currencies";

const CryptocurrenciesService = {
    fetchCoinsMarketData: (vsCurrency = 'usd', page = 1, pageSize = 50) => {
        return API_DRIVER_BACKEND.get('/cryptocurrency', {
            params: {
                vsCurrency: vsCurrency,
                page: page,
                pageSize: pageSize,
                priceChangePercentage: '1h,24h,7d'
            }
        })
    },

    fetchExchangesList: (page = 1, pageSize = 100) => {
        return API_DRIVER_BACKEND.get('/cryptocurrency/exchanges', {
            params: {
                page: page,
                pageSize: pageSize
            }
        })
    },

    fetchCoinDetails: (id) => {
        return API_DRIVER_BACKEND.get(`/cryptocurrency/${id}/details`)
    },
    fetchCoinAbstract: (name) => {
        return API_DRIVER_BACKEND.get(`/cryptocurrency/${name}/description`)
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
