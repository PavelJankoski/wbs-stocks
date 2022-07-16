import {API_DRIVER_BACKEND} from "../../axiosConfig";

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

    fetchExchangesList: (page = 1, pageSize = 50) => {
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
}

export default CryptocurrenciesService;
