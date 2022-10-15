import {API_DRIVER_BACKEND} from "../../axiosConfig";


const StocksService = {
    fetchStockHistoricalPrices: (symbol, range, chartCloseOnly) => {
        return API_DRIVER_BACKEND.get(`/companies/${symbol}/historicalPrices`, {
            params: {
                range: range,
                chartCloseOnly: chartCloseOnly
            }
        })
    },
    fetchStockSectors: () => {
        return API_DRIVER_BACKEND.get('/companies/sectors')
    },
    fetchMarketTopGainers: () => {
        return API_DRIVER_BACKEND.get('/market/TOP_GAINERS')
    },
    fetchMarketTopLosers: () => {
        return API_DRIVER_BACKEND.get('/market/TOP_LOSERS')
    },
    searchStocks: (page, size, searchText, sector) => {
        return API_DRIVER_BACKEND.post('/companies', {
            size: size,
            page: page,
            filterBy: {
                query: searchText,
                sector: sector
            }
        })
    },
    fetchStockExchanges: (limit, offset, search) => {
        return API_DRIVER_BACKEND.post('/companies/exchanges', {
            size: limit,
            page: offset,
            filterBy: {
                query: search
            }
        })
    },
    fetchCompanyRecommendationTrends: (symbol) => {
        return API_DRIVER_BACKEND.get(`/companies/${symbol}/recommendation`)
    },
    fetchCompanyProductsWikiLinks: (name) => {
        return API_DRIVER_BACKEND.get(`companies/${name}/wikiLinks`, {
            params: {
                predicate: "product"
            }
        })
    },
    fetchCompanyServicesWikiLinks: (name) => {
        return API_DRIVER_BACKEND.get(`companies/${name}/wikiLinks`, {
            params: {
                predicate: "service"
            }
        })
    },
    fetchCompanyDevelopmentsWikiLinks: (name) => {
        return API_DRIVER_BACKEND.get(`companies/${name}/wikiLinks`, {
            params: {
                predicate: "developer"
            }
        })
    },
    fetchCompanyDesignsWikiLinks: (name) => {
        return API_DRIVER_BACKEND.get(`companies/${name}/wikiLinks`, {
            params: {
                predicate: "designer"
            }
        })
    },
    epsCompanyPerYear: (symbol) => {
        return API_DRIVER_BACKEND.get(`companies/${symbol}/earnings`)
    },
    annualReportsCompanyPerYear: (id) => {
        return API_DRIVER_BACKEND.get(`companies/${id}/annualReports`)
    },
    getBasicDetails: (symbol) => {
        return API_DRIVER_BACKEND.get(`companies/${symbol}/details`, {
            params: {
                symbol: symbol
            }
        })
    },
}

export default StocksService;
