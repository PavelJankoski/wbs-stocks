import {API_DRIVER_BACKEND} from "../../axiosConfig";

const CryptocurrenciesService = {
    fetchCoinsMarketData: (vsCurrency = 'usd', page = 1, pageSize = 50) => {
        return API_DRIVER_BACKEND.post('/cryptocurrency', {
            page: page,
            size: pageSize,
            filterBy: {
                vsCurrency: vsCurrency,
                priceChangePercentage: ['1h','24h','7d']
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
    }
}

export default CryptocurrenciesService;
