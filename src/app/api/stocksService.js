import {API_DRIVER_BACKEND} from "../../axiosConfig";


const StocksService = {
    fetchStockHistoricalPrices: (symbol, range, chartCloseOnly) => {
        debugger
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
        return API_DRIVER_BACKEND.get('/market/top-gainers')
    },
    fetchMarketTopLosers: () => {
        return API_DRIVER_BACKEND.get('/market/top-losers')
    },
    searchStocks: (page, size, searchText, sector) => {
        return API_DRIVER_BACKEND.post('/companies', {
            pageRequest: {
                size: size,
                page: page
            },
            query: searchText,
            sector: sector
        })
    },
    fetchStockExchanges: (limit, offset, search) => {
        return API_DRIVER_BACKEND.get('/companies/exchanges', {
            params: {
                size: limit,
                page: offset,
                query: search
            }
        })
    },
    fetchCompanyOverview: (symbol) => {
        return API_DRIVER_BACKEND.get(`/companies/${symbol}/overview`)
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
    annualReportsCompanyPerYear: (symbol) => {
        return API_DRIVER_BACKEND.get(`companies/${symbol}/annualReports`)
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
