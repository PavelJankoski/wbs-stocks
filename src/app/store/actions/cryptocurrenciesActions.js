import CryptocurrenciesService from "../../api/cryptocurrenciesService";
import * as actionTypes from "../actionTypes";

export const fetchCoinsMarketData = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_COINS_MARKET_DATA_LOADING, value: true});

        CryptocurrenciesService.fetchCoinsMarketData().then(res => {
            dispatch(mapResponseToCoinsMarketData(res.data));
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_COINS_MARKET_DATA_LOADING, value: false});
        })
    }
}

export const fetchExchanges = () => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_EXCHANGES_LOADING, value: true});
        CryptocurrenciesService.fetchExchangesList().then(res => {
            debugger
            dispatch(mapResponseToExchanges(res.data));
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_EXCHANGES_LOADING, value: false});
        })
    }
}


const mapResponseToCoinsMarketData = (data) => {
    const coinsArr = [];
    data.forEach(coin => {
        coinsArr.push({
            id: coin.id,
            coinIcon: coin.image,
            symbol: coin.symbol,
            name: coin.name,
            lastPrice: coin.current_price,
            priceChangePercentage1h: coin.price_change_percentage_1h_in_currency,
            priceChangePercentage24h: coin.price_change_percentage_24h_in_currency,
            priceChangePercentage7d: coin.price_change_percentage_7d_in_currency,
            marketCapital: coin.market_cap
        })
    })
    return {type: actionTypes.FETCH_COINS_MARKET_DATA_SUCCESS, payload: coinsArr};
}

const mapResponseToExchanges = (data) => {
    const exchangesArr = [];
    debugger
    data.forEach(exchange => {
        exchangesArr.push({
            id: exchange.id,
            name: exchange.name,
            yearEstablished: exchange.year_established,
            country: exchange.country,
            icon: exchange.image,
            tradeVolume24hBTC: exchange.trade_volume_24h_btc
        })
    })
    return {type: actionTypes.FETCH_EXCHANGES_SUCCESS, payload: exchangesArr};
}
