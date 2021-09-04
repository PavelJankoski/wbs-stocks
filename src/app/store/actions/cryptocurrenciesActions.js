import CryptocurrenciesService from "../../api/cryptocurrenciesService";
import * as actionTypes from "../actionTypes";
import {FETCH_COIN_DETAILS_SUCCESS} from "../actionTypes";
import socialNetworks from "../../shared/objects/socialNetworks";
import {Currency} from "../../shared/objects/currencies";

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
            dispatch(mapResponseToExchanges(res.data));
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_EXCHANGES_LOADING, value: false});
        })
    }
}

export const fetchCoinDetails = (id) => {
    return (dispatch) => {
        CryptocurrenciesService.fetchCoinDetails(id).then(res => {
            console.log(res.data)
            dispatch(mapResponseToCoinDetails(res.data))
        }).catch(e => {
            console.log(e)
        }).finally(() => {

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

const mapResponseToCoinDetails = (data) => {

    const coinDetails = {
        symbol: data.symbol,
        name: data.name,
        image: data.image['thumb'],
        marketCapRank: data.market_cap_rank,
        hashingAlgorithm: data.hashing_algorithm,
        links: {
            homePageUrl: data.links.homepage[0],
            blockChainSitesUrls: data.links.blockchain_site,
            communityUrls: [...data.links.official_forum_url, ...data.links.chat_url, data.links.subreddit_url],
            socialNetworksUrls: {
                twitterLink: data.links.twitter_screen_name ? `${socialNetworks.find(s => s.name === 'twitter').url}${data.links.twitter_screen_name}` : "",
                facebookLink: data.links.facebook_username ? `${socialNetworks.find(s => s.name === 'facebook').url}${data.links.facebook_username}` : ""
            },
            reposUrls: [...data.links.repos_url['github']]
        },
        marketData: {
            currentPrice: {
                [`${Currency.EUR}`]: data.market_data.current_price[Currency.EUR.toLowerCase()],
                [`${Currency.GBP}`]: data.market_data.current_price[Currency.GBP.toLowerCase()],
                [`${Currency.USD}`]: data.market_data.current_price[Currency.USD.toLowerCase()],

            },
            totalSupply: data.market_data['total_supply'],
            maxSupply: data.market_data['max_supply'],
            circulationSupply: data.market_data['circulating_supply']
        }
    }
    return {type: FETCH_COIN_DETAILS_SUCCESS, payload: coinDetails};
}