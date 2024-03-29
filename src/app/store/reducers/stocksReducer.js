import * as actionTypes from '../actionTypes';
import {stockChartObject, updateObject} from "../../shared/utils/utils";
import lineColors from "../../shared/objects/lineColors";

const initialState = {
    stockSectors: [],
    topGainers: {
        loading: true,
        stocks: []
    },
    topLosers: {
        loading: true,
        stocks: []
    },
    stockHistoricalPrices: {
        data: [],
        loading: true
    },
    detailsData: [],
    searchedStocks: {
        data: []
    },
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

const updateStockSectors = (state, action) => {
    return updateObject(state, {stockSectors: action.payload})
}

const updateTopGainersStocks = (state, action) => {
    return updateObject(state,
        {
            topGainers: updateObject(state.topGainers,
                {
                    stocks: action.payload
                })
        })
}

const setTopGainersStocksLoading = (state, action) => {
    return updateObject(state,
        {
            topGainers: updateObject(state.topGainers,
                {
                    loading: action.value
                })
        })
}

const updateTopLosersStocks = (state, action) => {
    return updateObject(state,
        {
            topLosers: updateObject(state.topLosers,
                {
                    stocks: action.payload
                })
        })
}

const setTopLosersStocksLoading = (state, action) => {
    return updateObject(state,
        {
            topLosers: updateObject(state.topLosers,
                {
                    loading: action.value
                })
        })
}

const updateStockHistoricalPrices = (state, action) => {
    return updateObject(state, {
        stockHistoricalPrices: updateObject(state.stockHistoricalPrices,
            {
                data: action.payload
            }
        )
    })
}

const setStockHistoricalPricesLoading = (state, action) => {
    return updateObject(state, {
        stockHistoricalPrices: updateObject(state.stockHistoricalPrices,
            {
                loading: action.value
            }
        )
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
        case actionTypes.FETCH_STOCK_HISTORICAL_PRICES_SUCCESS:
            return updateStockHistoricalPrices(state, action);
        case actionTypes.SET_STOCK_HISTORICAL_PRICES_LOADING:
            return setStockHistoricalPricesLoading(state, action);
        case actionTypes.FETCH_STOCK_SECTORS_SUCCESS:
            return updateStockSectors(state, action);
        case actionTypes.FETCH_TOP_GAINERS_STOCK_SUCCESS:
            return updateTopGainersStocks(state, action);
        case actionTypes.SET_TOP_GAINERS_STOCKS_LOADING:
            return setTopGainersStocksLoading(state, action);
        case actionTypes.FETCH_TOP_LOSERS_STOCK_SUCCESS:
            return updateTopLosersStocks(state, action);
        case actionTypes.SET_TOP_LOSERS_STOCKS_LOADING:
            return setTopLosersStocksLoading(state, action);
        case actionTypes.SEARCH_STOCKS_SUCCESS:
            return updateSearchStocksData(state, action);
        case actionTypes.SET_SEARCH_STOCKS_LOADING:
            return setSearchStocksLoading(state, action);
        case actionTypes.FETCH_STOCKS_EXCHANGES_SUCCESS:
            return setStocksExchanges(state, action);
        case actionTypes.FETCH_DETAILS_DATA:
            return setDetailsData(state, action);
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
