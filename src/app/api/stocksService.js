import {API_DRIVER_BACKEND, API_DRIVER_MS} from "../../axiosConfig";


const StocksService = {
    // Use stocksTimeSeries object for timeSeries constants
    // example: https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo
    fetchDataForTimeSeries: (timeSeries, symbol) => {
        return API_DRIVER_MS.get('', {
            params: {
                function: `TIME_SERIES_${timeSeries}`,
                symbol: symbol
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
    // Use stockInterval object for interval constants
    fetchStocksIntraday: (symbols, interval = "24hour", limit = 10) => {
        return API_DRIVER_MS.get('/intraday', {
            params: {
                symbols: symbols,
                interval: interval,
                limit: limit
            }
        })
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
