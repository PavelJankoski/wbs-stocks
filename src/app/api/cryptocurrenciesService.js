import {API_DRIVER_CG} from "../../axiosConfig";

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
    }
}

export default CryptocurrenciesService;
