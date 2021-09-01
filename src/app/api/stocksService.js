import {API_DRIVER_FH, API_DRIVER_MS} from "../../axiosConfig";


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
    fetchLatestStockValues: (symbols) => {
        return API_DRIVER_MS.get('/eod/latest', {
            params: {
                symbols: symbols
            }
        })
    },
    searchStocks: (searchText) => {
        return API_DRIVER_FH.get('/search', {
            params: {
                q: searchText
            }
        })
    },
    fetchStockExchanges: (limit, offset, search) => {
        return API_DRIVER_MS.get('/exchanges', {
            params: {
                limit: limit,
                offset: offset,
                ...(search !== "" ? {search: search} : {})
            }
        })
    }
}

export default StocksService;
