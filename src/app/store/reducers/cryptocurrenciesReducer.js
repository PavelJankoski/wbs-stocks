import * as actionTypes from '../actionTypes';
import {updateObject} from "../../shared/utils/utils";
import {Currency} from "../../shared/objects/currencies";

const initialState = {
    coinsTableData: [],
    coinsTableLoading: false,
    exchangesTableData: [],
    exchangesTableLoading: false,
    coinDetails: {
        symbol: '',
        name: '',
        image: '',
        marketCapRank: 0,
        hashingAlgorithm: '',
        links: {
            homePageUrl: '',
            blockChainSitesUrls: '',
            communityUrls: [],
            socialNetworksUrls: {
                twitterLink: '',
                facebookLink: ''
            },
            reposUrls: []
        },
        marketData: {
            currentPrice: {
                [`${Currency.EUR}`]: 0,
                [`${Currency.GBP}`]: 0,
                [`${Currency.USD}`]: 0,

            },
            totalSupply: 0,
            maxSupply: 0,
            circulationSupply: 0
        }
    }
}

const updateCoinsMarketData = (state, action) => {
    return updateObject(state, {coinsTableData: action.payload})
}

const setCoinsMarketDataLoading = (state, action) => {
    return updateObject(state, {
        coinsTableLoading: action.value
    })
}

const updateExchanges = (state, action) => {
    return updateObject(state, {exchangesTableData: action.payload})
}

const setExchangesLoading = (state, action) => {
    return updateObject(state, {
        exchangesTableLoading: action.value
    })
}

const updateCoinDetails = (state, action) => {
    return updateObject(state, {coinDetails: action.payload})
}

const cryptocurrenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COINS_MARKET_DATA_SUCCESS:
            return updateCoinsMarketData(state, action);
        case actionTypes.SET_COINS_MARKET_DATA_LOADING:
            return setCoinsMarketDataLoading(state, action)
        case actionTypes.FETCH_EXCHANGES_SUCCESS:
            return updateExchanges(state, action);
        case actionTypes.SET_EXCHANGES_LOADING:
            return setExchangesLoading(state, action)
        case actionTypes.FETCH_COIN_DETAILS_SUCCESS:
            return updateCoinDetails(state, action)
        default:
            return state;
    }
}

export default cryptocurrenciesReducer;
