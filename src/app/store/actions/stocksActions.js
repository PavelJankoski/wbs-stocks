import StocksService from "../../api/stocksService";
import * as actionTypes from '../actionTypes';
import {calculateStockPercentage, toIsoDate} from "../../shared/utils/utils";
import latestStocksArray from "../../shared/objects/latestStocksArray";
import {FETCH_COMPANY_DESIGNS_WIKI_LINKS_LOADING} from "../actionTypes";

export const fetchMostPopularStock = (symbol) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_POPULAR_STOCKS_LOADING, symbol: symbol, value: true});
        StocksService.fetchStocksIntraday(symbol).then(res => {
            dispatch(
                {
                    type: actionTypes.FETCH_MOST_POPULAR_STOCK_SUCCESS,
                    payload: mapResponseToPopularStockData(res, symbol)
                }
            )
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_POPULAR_STOCKS_LOADING, value: false, symbol: symbol});
        })
    }
}

export const fetchStocksForInterval = (symbol, interval, limit) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_INTERVAL_STOCK_LOADING, value: true});
        StocksService.fetchStocksIntraday(symbol, interval, limit).then(res => {
            dispatch(
                {
                    type: actionTypes.FETCH_STOCK_IN_INTERVAL_SUCCESS,
                    payload: mapResponseToPopularStockData(res, symbol)
                }
            )
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_INTERVAL_STOCK_LOADING, value: false});
        })
    }
}

export const fetchLatestStockValues = (symbols) => {
    return (dispatch) => {
        StocksService.fetchLatestStockValues(symbols).then(res => {
            dispatch(mapResponseToLatestStocks(res.data.data));
        }).catch(e => {
            console.log(e);
        })
    }
}

export const fetchAnnualReports = (symbol) => {
    return (dispatch) => {
        StocksService.annualReportsCompanyPerYear(symbol).then(res => {
            dispatch(mapResponseToReport(res.data));
        }).catch(e => {
            console.log(e)
        })
    }
}

export const getBasicDetails = (symbol) => {
    return (dispatch) => {
        StocksService.getBasicDetails(symbol).then(res => {
            dispatch(mapResponseToDetails(res.data));
        }).catch(e => {
            console.log(e)
        })
    }
}
export const getStockDetails = (symbol) => {
    return (dispatch) => {
        StocksService.fetchCompanyOverview(symbol).then(res => {
            dispatch(mapResponseToStocksDetails(res.data));
        }).catch(e => {
            console.log(e)
        })
    }
}

export const fetchCompanyProductsWikiLinks = (name) => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_COMPANY_PRODUCTS_WIKI_LINKS_LOADING, value: true})
        let parsedName = name.replace(" ", "_")
        StocksService.fetchCompanyProductsWikiLinks(parsedName).then(res => {
            dispatch({
                type: actionTypes.FETCH_COMPANY_PRODUCTS_WIKI_LINKS_SUCCESS,
                payload: res.data
            });
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            dispatch({type: actionTypes.FETCH_COMPANY_PRODUCTS_WIKI_LINKS_LOADING, value: false})
        })
    }
}

export const fetchCompanyServicesWikiLinks = (name) => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_COMPANY_SERVICES_WIKI_LINKS_LOADING, value: true})
        let parsedName = name.replace(" ", "_")
        StocksService.fetchCompanyServicesWikiLinks(parsedName).then(res => {
            dispatch({
                type: actionTypes.FETCH_COMPANY_SERVICES_WIKI_LINKS_SUCCESS,
                payload: res.data
            });
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            dispatch({type: actionTypes.FETCH_COMPANY_SERVICES_WIKI_LINKS_LOADING, value: false})
        })
    }
}

export const fetchCompanyDevelopmentsWikiLinks = (name) => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_COMPANY_DEVELOPMENTS_WIKI_LINKS_LOADING, value: true})
        let parsedName = name.replace(" ", "_")
        StocksService.fetchCompanyDevelopmentsWikiLinks(parsedName).then(res => {
            dispatch({
                type: actionTypes.FETCH_COMPANY_DEVELOPMENTS_WIKI_LINKS_SUCCESS,
                payload: res.data
            });
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            dispatch({type: actionTypes.FETCH_COMPANY_DEVELOPMENTS_WIKI_LINKS_LOADING, value: false})
        })
    }
}

export const fetchCompanyDesignsWikiLinks = (name) => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_COMPANY_DESIGNS_WIKI_LINKS_LOADING, value: true})
        let parsedName = name.replace(" ", "_")
        StocksService.fetchCompanyDesignsWikiLinks(parsedName).then(res => {
            dispatch({
                type: actionTypes.FETCH_COMPANY_DESIGNS_WIKI_LINKS_SUCCESS,
                payload: res.data
            });
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            dispatch({type: actionTypes.FETCH_COMPANY_DESIGNS_WIKI_LINKS_LOADING, value: false})
        })
    }
}

export const fetchCompanyRecommendationTrends = (symbol) => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_COMPANY_RECOMMENDATION_TRENDS_LOADING, value: true})
        StocksService.fetchCompanyRecommendationTrends(symbol).then(res => {
            dispatch(mapResponseToRecommendationTrendsData(res.data));
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            dispatch({type: actionTypes.FETCH_COMPANY_RECOMMENDATION_TRENDS_LOADING, value: false})
        })
    }
}

export const epsCompanyPerYear = (symbol) => {
    return (dispatch) => {
        StocksService.epsCompanyPerYear(symbol).then(res => {
            dispatch(
                {
                    type: actionTypes.EPS_COMPANY_PER_YEAR,
                    payload: mapResponseToEps(res.data, symbol)
                }
            )
        }).catch(e => {
            console.log(e)
        })
    }
}
export const searchStocks = (searchText) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_SEARCH_STOCKS_LOADING, value: true});
        StocksService.searchStocks(searchText).then(res => {
            dispatch(mapResponseToSearchedStocks(res.data.result))
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_SEARCH_STOCKS_LOADING, value: false});
        })
    }
}

export const fetchStockExchanges = (limit, offset, search = "") => {
    return (dispatch) => {
        StocksService.fetchStockExchanges(limit, offset, search).then((res) => {
            const payload = res.data.data.map(e => {
                return {
                    name: e.name,
                    acronym: e.acronym,
                    mic: e.mic,
                    country: e.country,
                    city: e.city,
                    website: e.website
                }
            })
            dispatch({
                type: actionTypes.FETCH_STOCKS_EXCHANGES_SUCCESS,
                payload: payload,
                total: res.data.pagination.total
            })
        }).catch((e) => {
            console.log(e);
        }).finally(() => {

        })
    }
}

export const cleanUpCompanyProductsWikiLinks = () => {
    return {
        type: actionTypes.FETCH_COMPANY_PRODUCTS_WIKI_LINKS_SUCCESS, payload: null
    }
}
export const cleanUpCompanyDesignsWikiLinks = () => {
    return {
        type: actionTypes.FETCH_COMPANY_DESIGNS_WIKI_LINKS_SUCCESS, payload: null
    }
}
export const cleanUpCompanyDevelopmentsWikiLinks = () => {
    return {
        type: actionTypes.FETCH_COMPANY_DEVELOPMENTS_WIKI_LINKS_SUCCESS, payload: null
    }
}
export const cleanUpCompanyServicesWikiLinks = () => {
    return {
        type: actionTypes.FETCH_COMPANY_SERVICES_WIKI_LINKS_SUCCESS, payload: null
    }
}


const mapResponseToPopularStockData = (response, symbol) => {
    let data = response.data.data
    const prices = [];
    const dateTimes = [];
    for (let i = data.length - 1; i >= 0; i--) {
        let currentDateTime = data[i].date
        let currentPrice = parseFloat(data[i].open);
        prices.push(currentPrice);
        dateTimes.push(toIsoDate(currentDateTime))
    }
    return {
        prices: prices,
        dateTimes: dateTimes,
        stockPercentage: calculateStockPercentage(prices[0], prices[9]),
        symbol: symbol,
        lastData: data[0]
    }

}
const mapResponseToEps = (data, symbol) => {

    let earnings = data.annualEarnings;
    const pricePerShare = [];
    const dateTimes = [];
    for (let i = earnings.length - 1; i >= 0; i--) {
        let currentDateTime = earnings[i].fiscalDateEnding;
        let currentPrice = parseFloat(earnings[i].reportedEPS);
        pricePerShare.push(currentPrice);
        dateTimes.push(toIsoDate(currentDateTime))
    }
    return {
        pricePerShare: pricePerShare,
        dateTimes: dateTimes,
        stockPercentage: calculateStockPercentage(pricePerShare[0], pricePerShare[9]),
        symbol: symbol,
        lastData: earnings[0]
    }
}

const mapResponseToStocksDetails = (data) => {
    return {type: actionTypes.FETCH_STOCKS_DETAILS, payload: data}
}

const mapResponseToDetails = (data) => {
    return {type: actionTypes.FETCH_DETAILS_DATA, payload: data}
}

const mapResponseToReport = (data) => {
    return {type: actionTypes.FETCH_REPORTS_DATA, payload: data}
}

const mapResponseToLatestStocks = (data) => {
    const latestStocksArr = [];
    data.forEach(s => {
        let name = latestStocksArray.find(sym => sym.shortName === s.symbol).name;
        let calculatedPercentage = calculateStockPercentage(s.open, s.close);
        latestStocksArr.push({
            name: name,
            shortName: s.symbol,
            change: calculatedPercentage,
            latestPrice: s.close
        })
    })
    return {type: actionTypes.FETCH_LATEST_STOCK_VALUES_SUCCESS, payload: latestStocksArr};
}

const mapResponseToSearchedStocks = (data) => {
    return {
        type: actionTypes.SEARCH_STOCKS_SUCCESS, payload: data.splice(0, 5).map(s => {
            return {
                name: s.description,
                symbol: s.symbol
            }
        })
    }
}

const mapResponseToRecommendationTrendsData = (data) => {
    let datasets = [];
    let strongBuyData = []
    let buyData = []
    let holdData = []
    let sellData = []
    let strongSellData = []
    let labels = []

    data.forEach(s => {
        strongBuyData.push(s.strongBuy)
        buyData.push(s.buy)
        holdData.push(s.hold)
        sellData.push(s.sell)
        strongSellData.push(s.strongSell)
        labels.push(s.period)
    })

    datasets.push({
        label: 'Strong Sell',
        data: strongSellData,
        backgroundColor: '#770000',
        borderWidth: 0
    })
    datasets.push({
        label: 'Sell',
        data: sellData,
        backgroundColor: '#fc0000',
        borderWidth: 0
    })
    datasets.push({
        label: 'Hold',
        data: holdData,
        backgroundColor: '#d27b00',
        borderWidth: 0
    })
    datasets.push({
        label: 'Buy',
        data: buyData,
        backgroundColor: '#2ebe00',
        borderWidth: 0
    })
    datasets.push({
        label: 'Strong Buy',
        data: strongBuyData,
        backgroundColor: '#075600',
        borderWidth: 0
    })
    return {
        type: actionTypes.FETCH_COMPANY_RECOMMENDATION_TRENDS_SUCCESS,
        payload: {datasets: datasets, labels: labels}
    };
}
