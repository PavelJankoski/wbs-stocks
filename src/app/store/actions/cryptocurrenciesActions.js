import CryptocurrenciesService from "../../api/cryptocurrenciesService";
import * as actionTypes from "../actionTypes";
import socialNetworks from "../../shared/objects/socialNetworks";
import {Currency} from "../../shared/objects/currencies";

let eventSource = undefined;

export const fetchCoinsMarketData = (page, pageSize) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_COINS_MARKET_DATA_LOADING, value: true});

        CryptocurrenciesService.fetchCoinsMarketData("usd", page, pageSize).then(res => {
            dispatch(mapResponseToCoinsMarketData(res.data));
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            dispatch({type: actionTypes.SET_COINS_MARKET_DATA_LOADING, value: false});
        })
    }
}

export const fetchExchanges = (page, pageSize) => {
    return (dispatch) => {
        dispatch({type: actionTypes.SET_EXCHANGES_LOADING, value: true});
        CryptocurrenciesService.fetchExchangesList(page, pageSize).then(res => {
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
            dispatch(mapResponseToPriceDetails(res.data.market_data))
            dispatch(mapResponseToCoinMarketData(res.data.market_data))
            dispatch(mapResponseToCoinDetails(res.data))
        }).catch(e => {
            console.log(e)
        }).finally(() => {

        })
    }
}

export const fetchCoinMarketData = (id) => {
    return (dispatch) => {
        eventSource = CryptocurrenciesService.getCoinMarketDataEventSource(id)
        eventSource.onopen = (event) => {
            console.log("connection opened")
        }

        eventSource.onmessage = (event) => {
            let json = JSON.parse(event.data);
            console.log("result", json);
            dispatch(mapResponseToCoinMarketData(json))
            dispatch(mapResponseToPriceDetails(json))
        }

        eventSource.onerror = (event) => {
            console.log(event.target.readyState)
            if (event.target.readyState === EventSource.CLOSED) {
                console.log('eventsource closed (' + event.target.readyState + ')')
            }
            eventSource.close();
        }
    }
}


const mapResponseToCoinsMarketData = (data) => {
    const coinsArr = [];
    data.data.forEach(coin => {
        coinsArr.push({
            id: coin.id,
            coinIcon: coin.image,
            symbol: coin.symbol,
            name: coin.name,
            lastPrice: coin.current_price,
            priceChangePercentage1h: coin.price_change_percentage_1h_in_currency,
            priceChangePercentage24h: coin.price_change_percentage_24h_in_currency,
            priceChangePercentage7d: coin.price_change_percentage_7d_in_currency,
            marketCapital: coin.market_cap,
            marketCapitalRank: coin.market_cap_rank
        })
    })
    return {
        type: actionTypes.FETCH_COINS_MARKET_DATA_SUCCESS, payload: {
            coinsArr: coinsArr,
            pagination: data.pagination
        }
    };
}

const mapResponseToExchanges = (data) => {
    const exchangesArr = [];
    data.data.forEach(exchange => {
        exchangesArr.push({
            id: exchange.id,
            name: exchange.name,
            yearEstablished: exchange.year_established,
            country: exchange.country,
            icon: exchange.image,
            tradeVolume24hBTC: exchange.trade_volume_24h_btc,
            url: exchange.url
        })
    })
    return {
        type: actionTypes.FETCH_EXCHANGES_SUCCESS, payload: {
            exchangesArr: exchangesArr,
            pagination: data.pagination
        }
    };
}

const mapResponseToCoinDetails = (data) => {
    const coinDetails = {
        symbol: data.symbol,
        name: data.name,
        image: data.image['small'],
        marketCapRank: data.market_cap_rank,
        hashingAlgorithm: data.hashing_algorithm,
        description: data.description['en'],
        links: {
            homePageUrls: data.links.homepage.filter(l => l !== "").filter(link => link !== null),
            blockChainSitesUrls: data.links.blockchain_site.filter(l => l !== "").filter(link => link !== null),
            communityUrls: [...data.links.official_forum_url.filter(l => l !== "").filter(link => link !== null), ...data.links.chat_url.filter(l => l !== "").filter(link => link !== null)],
            socialNetworksUrls: [data.links.twitter_screen_name ? `${socialNetworks.find(s => s.name === 'twitter').url}${data.links.twitter_screen_name}` : "",
                data.links.facebook_username ? `${socialNetworks.find(s => s.name === 'facebook').url}${data.links.facebook_username}` : ""
            ],
            reposUrls: [...data.links.repos_url['github'].filter(l => l !== ""), ...data.links.repos_url['bitbucket'].filter(l => l !== "")]
        }
    }
    return {type: actionTypes.FETCH_COIN_DETAILS_SUCCESS, payload: coinDetails};
}


const mapResponseToPriceDetails = (data) => {
    const coinPriceDetails = {
        currentPrice: {
            [`${Currency.EUR}`]: data.current_price[Currency.EUR],
            [`${Currency.GBP}`]: data.current_price[Currency.GBP],
            [`${Currency.USD}`]: data.current_price[Currency.USD]
        },
        ath: {
            [`${Currency.EUR}`]: data.ath[Currency.EUR],
            [`${Currency.GBP}`]: data.ath[Currency.GBP],
            [`${Currency.USD}`]: data.ath[Currency.USD]
        },
        athDate: {
            [`${Currency.USD}`]: data.ath_date[Currency.USD]
        },
        high24h: {
            [`${Currency.EUR}`]: data.high_24h[Currency.EUR],
            [`${Currency.GBP}`]: data.high_24h[Currency.GBP],
            [`${Currency.USD}`]: data.high_24h[Currency.USD]
        },
        low24h: {
            [`${Currency.EUR}`]: data.low_24h[Currency.EUR],
            [`${Currency.GBP}`]: data.low_24h[Currency.GBP],
            [`${Currency.USD}`]: data.low_24h[Currency.USD]
        },
        priceChange24h: {
            [`${Currency.EUR}`]: data.price_change_24h_in_currency[Currency.EUR],
            [`${Currency.GBP}`]: data.price_change_24h_in_currency[Currency.GBP],
            [`${Currency.USD}`]: data.price_change_24h_in_currency[Currency.USD]
        },
        priceChangePercentage24h: {
            [`${Currency.EUR}`]: data.price_change_percentage_24h_in_currency[Currency.EUR],
            [`${Currency.GBP}`]: data.price_change_percentage_24h_in_currency[Currency.GBP],
            [`${Currency.USD}`]: data.price_change_percentage_24h_in_currency[Currency.USD]
        }

    }
    return {type: actionTypes.FETCH_COIN_PRICE_DATA_SUCCESS, payload: coinPriceDetails};
}

const mapResponseToCoinMarketData = (data) => {
    const coinMarketData = {
        totalSupply: data['total_supply'],
        maxSupply: data['max_supply'],
        circulatingSupply: data['circulating_supply'],
        marketCap: {
            [`${Currency.EUR}`]: data.market_cap[Currency.EUR],
            [`${Currency.GBP}`]: data.market_cap[Currency.GBP],
            [`${Currency.USD}`]: data.market_cap[Currency.USD]
        },
        marketCapChange24h: {
            [`${Currency.EUR}`]: data.market_cap_change_24h_in_currency[Currency.EUR],
            [`${Currency.GBP}`]: data.market_cap_change_24h_in_currency[Currency.GBP],
            [`${Currency.USD}`]: data.market_cap_change_24h_in_currency[Currency.USD]
        },
        marketCapChangePercentage24h: {
            [`${Currency.EUR}`]: data.market_cap_change_percentage_24h_in_currency[Currency.EUR],
            [`${Currency.GBP}`]: data.market_cap_change_percentage_24h_in_currency[Currency.GBP],
            [`${Currency.USD}`]: data.market_cap_change_percentage_24h_in_currency[Currency.USD]
        },
        fullyDilutedMarketCap: {
            [`${Currency.EUR}`]: data.fully_diluted_valuation[Currency.EUR],
            [`${Currency.GBP}`]: data.fully_diluted_valuation[Currency.GBP],
            [`${Currency.USD}`]: data.fully_diluted_valuation[Currency.USD]
        },
        totalVolume: {
            [`${Currency.EUR}`]: data.total_volume[Currency.EUR],
            [`${Currency.GBP}`]: data.total_volume[Currency.GBP],
            [`${Currency.USD}`]: data.total_volume[Currency.USD]
        }
    }
    return {type: actionTypes.FETCH_COIN_MARKET_DATA_SUCCESS, payload: coinMarketData};
}

export const cleanUpCoinDetails = () => {
    eventSource.close()
    return {
        type: actionTypes.FETCH_COIN_DETAILS_SUCCESS, payload: null
    }
}

export const cleanUpCoinMarketData = () => {
    return {
        type: actionTypes.FETCH_COIN_MARKET_DATA_SUCCESS, payload: null
    }
}

export const cleanUpCoinPriceDetails = () => {
    return {
        type: actionTypes.FETCH_COIN_PRICE_DATA_SUCCESS, payload: null
    }
}