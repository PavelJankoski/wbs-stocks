import initialPopularStock from "../../shared/objects/initialPopularStock";
import * as actionTypes from '../actionTypes';
import {stockChartObject, updateObject} from "../../shared/utils/utils";
import lineColors from "../../shared/objects/lineColors";
import {FETCH_COMPANY_DESIGNS_WIKI_LINKS_LOADING} from "../actionTypes";

const initialState = {
    mostPopular: {
        TSLA: {...initialPopularStock, name: "Tesla Inc"},
        AAPL: {...initialPopularStock, name: "Apple Inc"},
        MSFT: {...initialPopularStock, name: "Microsoft Corp"},
        IBM: {...initialPopularStock, name: "IBM"}
    },
    stockInInterval: {
        symbol: '',
        chartData: {},
        stockPercentage: 0.0,
        lastData: {},
        loading: true
    },
    stocksTableData: [],
    detailsData: [],
    searchedStocks: [],
    detailsStockData: [],
    reportsData: [],
    epsCompany: {
        symbol: '',
        chartData: {},
        stockPercentage: 0.0,
        lastData: {}
    },
    stockExchanges: {
        data: [],
        total: 0
    },
    searchStocksLoading: false,

    productsWikiLinks: {
        data: null,
        loading: true
    },
    servicesWikiLinks: {
        data: null,
        loading: true
    },
    developmentsWikiLinks: {
        data: null,
        loading: true
    },
    designsWikiLinks: {
        data: null,
        loading: true
    },
    recommendationTrends: {
        labels: null,
        datasets: null
    },
    recommendationTrendsLoading: true
}

const updatePopularStocks = (state, action) => {
    return updateObject(state,
        {
            mostPopular: updateObject(state.mostPopular,
                {
                    [`${action.payload.symbol}`]: updateObject(state.mostPopular[`${action.payload.symbol}`],
                        {
                            chartData: stockChartObject(action.payload.dateTimes, action.payload.prices, action.payload.symbol),
                            stockPercentage: action.payload.stockPercentage
                        })
                })
        })
}

const setPopularStocksLoading = (state, action) => {
    return updateObject(state,
        {
            mostPopular: updateObject(state.mostPopular,
                {
                    [`${action.symbol}`]: updateObject(state.mostPopular[`${action.symbol}`],
                        {
                            loading: action.value
                        })
                })
        })
}

const updateStockInInterval = (state, action) => {
    let borderColor = lineColors.error.borderColor;
    let backgroundColor = lineColors.error.backgroundColor;
    if (action.payload.stockPercentage >= 0) {
        borderColor = lineColors.success.borderColor
        backgroundColor = lineColors.success.backgroundColor;
    }
    return updateObject(state, {
        stockInInterval:
            updateObject(state.stockInInterval, {
                symbol: action.payload.symbol,
                chartData: stockChartObject(action.payload.dateTimes, action.payload.prices, action.payload.symbol, borderColor, backgroundColor),
                stockPercentage: action.payload.stockPercentage,
                lastData: action.payload.lastData
            })
    })
}
const setEpsData = (state, action) => {
    let borderColor = lineColors.error.borderColor;
    let backgroundColor = lineColors.error.backgroundColor;
    if (action.payload.stockPercentage >= 0) {
        borderColor = lineColors.success.borderColor
        backgroundColor = lineColors.success.backgroundColor;
    }
    return updateObject(state, {
        epsCompany: updateObject(state.epsCompany, {
            symbol: action.payload.symbol,
            chartData: stockChartObject(action.payload.dateTimes, action.payload.pricePerShare, action.payload.symbol, borderColor, backgroundColor),
            stockPercentage: action.payload.stockPercentage,
            lastData: action.payload.lastData
        })
    })
}
const setStockInIntervalLoading = (state, action) => {
    return updateObject(state, {
        stockInInterval:
            updateObject(state.stockInInterval,
                {
                    loading: action.value
                }
            )
    })
}

const updateLatestStocks = (state, action) => {
    return updateObject(state, {stocksTableData: action.payload})
}

const updateSearchStocksData = (state, action) => {
    return updateObject(state, {searchedStocks: action.payload})
}

const setSearchStocksLoading = (state, action) => {
    return updateObject(state, {searchStocksLoading: action.value})
}

const setStocksExchanges = (state, action) => {
    return updateObject(state, {
        stockExchanges: updateObject(state.stockExchanges, {
            data: action.payload,
            total: action.total
        })
    });
}

const setDetailsData = (state, action) => {
    return updateObject(state, {detailsData: action.payload})
}

const setStockDetailsData = (state, action) => {
    return updateObject(state, {detailsStockData: action.payload})
}

const setReportsData = (state, action) => {
    return updateObject(state, {reportsData: action.payload})
}

const setCompanyProductsWikiLinks = (state, action) => {
    return updateObject(state, {
        productsWikiLinks: updateObject(state.productsWikiLinks, {
            data: action.payload
        })
    })
}

const setCompanyProductsWikiLinksLoading = (state, action) => {
    return updateObject(state, {
        productsWikiLinks: updateObject(state.productsWikiLinks, {
            loading: action.value
        })
    })
}

const setCompanyServicesWikiLinks = (state, action) => {
    return updateObject(state, {
        servicesWikiLinks: updateObject(state.servicesWikiLinks, {
            data: action.payload
        })
    })
}

const setCompanyServicesWikiLinksLoading = (state, action) => {
    return updateObject(state, {
        servicesWikiLinks: updateObject(state.servicesWikiLinks, {
            loading: action.value
        })
    })
}

const setCompanyDevelopmentsWikiLinks = (state, action) => {
    return updateObject(state, {
        developmentsWikiLinks: updateObject(state.developmentsWikiLinks, {
            data: action.payload
        })
    })
}

const setCompanyDevelopmentsWikiLinksLoading = (state, action) => {
    return updateObject(state, {
        developmentsWikiLinks: updateObject(state.developmentsWikiLinks, {
            loading: action.value
        })
    })
}

const setCompanyDesignsWikiLinks = (state, action) => {
    return updateObject(state, {
        designsWikiLinks: updateObject(state.designsWikiLinks, {
            data: action.payload
        })
    })
}

const setCompanyDesignsWikiLinksLoading = (state, action) => {
    return updateObject(state, {
        designsWikiLinks: updateObject(state.designsWikiLinks, {
            loading: action.value
        })
    })
}

const setCompanyRecommendationTrends = (state, action) => {
    return updateObject(state, {
        recommendationTrends: action.payload
    })
}

const setCompanyRecommendationTrendsLoading = (state, action) => {
    return updateObject(state, {
        recommendationTrendsLoading: action.value
    })
}

const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOST_POPULAR_STOCK_SUCCESS:
            return updatePopularStocks(state, action);
        case actionTypes.SET_POPULAR_STOCKS_LOADING:
            return setPopularStocksLoading(state, action);
        case actionTypes.FETCH_STOCK_IN_INTERVAL_SUCCESS:
            return updateStockInInterval(state, action);
        case actionTypes.SET_INTERVAL_STOCK_LOADING:
            return setStockInIntervalLoading(state, action);
        case actionTypes.FETCH_LATEST_STOCK_VALUES_SUCCESS:
            return updateLatestStocks(state, action);
        case actionTypes.SEARCH_STOCKS_SUCCESS:
            return updateSearchStocksData(state, action);
        case actionTypes.SET_SEARCH_STOCKS_LOADING:
            return setSearchStocksLoading(state, action);
        case actionTypes.FETCH_STOCKS_EXCHANGES_SUCCESS:
            return setStocksExchanges(state, action);
        case actionTypes.FETCH_DETAILS_DATA:
            return setDetailsData(state, action);
        case actionTypes.FETCH_STOCKS_DETAILS:
            return setStockDetailsData(state, action);
        case actionTypes.EPS_COMPANY_PER_YEAR:
            return setEpsData(state, action);
        case actionTypes.FETCH_REPORTS_DATA:
            return setReportsData(state, action);
        case actionTypes.FETCH_COMPANY_PRODUCTS_WIKI_LINKS_SUCCESS:
            return setCompanyProductsWikiLinks(state, action);
        case actionTypes.FETCH_COMPANY_PRODUCTS_WIKI_LINKS_LOADING:
            return setCompanyProductsWikiLinksLoading(state, action);
        case actionTypes.FETCH_COMPANY_SERVICES_WIKI_LINKS_SUCCESS:
            return setCompanyServicesWikiLinks(state, action);
        case actionTypes.FETCH_COMPANY_SERVICES_WIKI_LINKS_LOADING:
            return setCompanyServicesWikiLinksLoading(state, action);
        case actionTypes.FETCH_COMPANY_DEVELOPMENTS_WIKI_LINKS_SUCCESS:
            return setCompanyDevelopmentsWikiLinks(state, action);
        case actionTypes.FETCH_COMPANY_DEVELOPMENTS_WIKI_LINKS_LOADING:
            return setCompanyDevelopmentsWikiLinksLoading(state, action);
        case actionTypes.FETCH_COMPANY_DESIGNS_WIKI_LINKS_SUCCESS:
            return setCompanyDesignsWikiLinks(state, action);
        case actionTypes.FETCH_COMPANY_DESIGNS_WIKI_LINKS_LOADING:
            return setCompanyDesignsWikiLinksLoading(state, action);
        case actionTypes.FETCH_COMPANY_RECOMMENDATION_TRENDS_SUCCESS:
            return setCompanyRecommendationTrends(state, action);
        case actionTypes.FETCH_COMPANY_RECOMMENDATION_TRENDS_LOADING:
            return setCompanyRecommendationTrendsLoading(state, action);
        default:
            return state;
    }
}

export default stocksReducer;
