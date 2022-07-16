import StocksService from "../../api/stocksService";
import * as actionTypes from '../actionTypes';
import {
    calculateStockPercentage,
    toIsoDate,
    RECOMMENDATION_TRENDS_DATE_FORMAT,
    stockChartObject
} from "../../shared/utils/utils";
import moment from "moment";

export const fetchStockSectors = () => {
    return (dispatch) => {
        StocksService.fetchStockSectors()
            .then(res => {
                dispatch(
                    {
                        type: actionTypes.FETCH_STOCK_SECTORS_SUCCESS,
                        payload: res.data
                    }
                )
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export const fetchMarketTopGainers = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_TOP_GAINERS_STOCKS_LOADING, value: true});
        StocksService.fetchMarketTopGainers()
            .then(res => {
                dispatch(
                    {
                        type: actionTypes.FETCH_TOP_GAINERS_STOCK_SUCCESS,
                        payload: res.data.slice(0, 5)
                    }
                )
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                dispatch({type: actionTypes.SET_TOP_GAINERS_STOCKS_LOADING, value: false});
            })
    }
}

export const fetchMarketTopLosers = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_TOP_LOSERS_STOCKS_LOADING, value: true});
        StocksService.fetchMarketTopLosers()
            .then(res => {
                dispatch(
                    {
                        type: actionTypes.FETCH_TOP_LOSERS_STOCK_SUCCESS,
                        payload: res.data.slice(0, 5)
                    }
                )
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                dispatch({type: actionTypes.SET_TOP_LOSERS_STOCKS_LOADING, value: false});
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
export const getStockOverview = (symbol) => {
    return (dispatch) => {
        StocksService.fetchCompanyOverview(symbol).then(res => {
            dispatch(mapResponseToStocksOverview(res.data));
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
export const searchStocks = (page, size, searchText, sector) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_SEARCH_STOCKS_LOADING, value: true});
        StocksService.searchStocks(page, size, searchText, sector).then(res => {
            dispatch({type: actionTypes.SEARCH_STOCKS_SUCCESS, payload: res.data});
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

const mapResponseToStocksOverview = (data) => {
    return {type: actionTypes.FETCH_STOCKS_OVERVIEW, payload: data}
}

const mapResponseToDetails = (data) => {
    return {type: actionTypes.FETCH_DETAILS_DATA, payload: data}
}

const mapResponseToReport = (data) => {
    return {type: actionTypes.FETCH_REPORTS_DATA, payload: data}
}

const mapResponseToRecommendationTrendsData = (data) => {
    let datasets = [];
    let strongBuyData = []
    let buyData = []
    let holdData = []
    let sellData = []
    let strongSellData = []
    let labels = []

    data.reverse().forEach(s => {
        strongBuyData.push(s.strongBuy)
        buyData.push(s.buy)
        holdData.push(s.hold)
        sellData.push(s.sell)
        strongSellData.push(s.strongSell)
        let date = moment(new Date(s.period)).format(RECOMMENDATION_TRENDS_DATE_FORMAT)
        labels.push(date)
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

export const fetchStockHistoricalPrices = (symbol, range, chartCloseOnly) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_STOCK_HISTORICAL_PRICES_LOADING, value: true});
        StocksService.fetchStockHistoricalPrices(symbol, range, chartCloseOnly)
            .then(res => {
                debugger
                dispatch(
                    {
                        type: actionTypes.FETCH_STOCK_HISTORICAL_PRICES_SUCCESS,
                        payload: chartCloseOnly ? mapResponseToLineData(res.data) : mapResponseToOHCLData(res.data)
                    }
                )
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                dispatch({type: actionTypes.SET_STOCK_HISTORICAL_PRICES_LOADING, value: false});
            })
    }
}

export const cleanUpStockHistoricalPrices = () => {
    return {
        type: actionTypes.FETCH_STOCK_HISTORICAL_PRICES_SUCCESS, payload: {
            data: [],
            loading: true
        }
    }
}

const mapResponseToLineData = (data) => {
    const prices = [{data: [], name: "Price"}];
    data.forEach(item => {
        let date = new Date(item.date).toLocaleDateString()
        let currentPrice = parseFloat(item.close);
        prices[0].data.push({
            x: [`${date}`],
            y: [currentPrice]
        })
    })
    return prices
}

const mapResponseToOHCLData = (data) => {
    const ohclDataArr = [{data: []}]
    data.forEach(item => {

        let date = new Date(item.date).toLocaleDateString()
        ohclDataArr[0].data.push({
            x: [`${date}`],
            y: [item.open, item.high, item.low, item.close]
        })
    })
    return ohclDataArr
}