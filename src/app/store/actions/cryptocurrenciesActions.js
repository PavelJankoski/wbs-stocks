import CryptocurrenciesService from "../../api/cryptocurrenciesService";
import * as actionTypes from "../actionTypes";
import socialNetworks from "../../shared/objects/socialNetworks";
import {Currency} from "../../shared/objects/currencies";
import {toIsoDate} from "../../shared/utils/utils";
import {FETCH_COIN_ABSTRACT_SUCCESS} from "../actionTypes";

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

export const fetchCoinAbstract = (name) => {
    return (dispatch) => {
        CryptocurrenciesService.fetchCoinAbstract(name).then(res => {
            debugger
            dispatch({
                type: FETCH_COIN_ABSTRACT_SUCCESS, payload: res.data
            })
        }).catch(e => {
            console.log(e)
        }).finally(() => {

        })
    }
}

export const fetchCoinOHCLData = (id, days = 7) => {
    return (dispatch) => {
        CryptocurrenciesService.fetchCoinOHCLData(id, days).then(res => {
            debugger
            dispatch(mapResponseToCoinOHCLData(res.data))
        }).catch(e => {
            console.log(e)
        }).finally(() => {

        })
    }
}

export const fetchCoinMarketChartData = (id, days = 7) => {
    return (dispatch) => {
        CryptocurrenciesService.fetchCoinMarketChartData(id, days).then(res => {
            dispatch({
                type: actionTypes.FETCH_COIN_MARKET_CHART_DATA_SUCCESS,
                payload: mapResponseToCoinMarketChartData(res.data.prices)
            })
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

    debugger
    const coinDetails = {
        symbol: data.symbol,
        name: data.name,
        image: data.image['small'],
        marketCapRank: data.market_cap_rank,
        hashingAlgorithm: data.hashing_algorithm,
        description: data.description.en,
        links: {
            homePageUrls: data.links.homepage.filter(l => l !== ""),
            blockChainSitesUrls: data.links.blockchain_site.filter(l => l !== ""),
            communityUrls: [...data.links.official_forum_url.filter(l => l !== ""), ...data.links.chat_url.filter(l => l !== ""), data.links.subreddit_url],
            socialNetworksUrls: [data.links.twitter_screen_name ? `${socialNetworks.find(s => s.name === 'twitter').url}${data.links.twitter_screen_name}` : "",
                data.links.facebook_username ? `${socialNetworks.find(s => s.name === 'facebook').url}${data.links.facebook_username}` : ""
            ],
            reposUrls: [...data.links.repos_url['github'].filter(l => l !== ""), ...data.links.repos_url['bitbucket'].filter(l => l !== "")]
        },
        marketData: {
            totalSupply: data.market_data['total_supply'],
            maxSupply: data.market_data['max_supply'],
            circulatingSupply: data.market_data['circulating_supply'],
            marketCap: {
                [`${Currency.EUR}`]: data.market_data.market_cap[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.market_cap[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.market_cap[Currency.USD]
            },
            marketCapChange24h: {
                [`${Currency.EUR}`]: data.market_data.market_cap_change_24h_in_currency[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.market_cap_change_24h_in_currency[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.market_cap_change_24h_in_currency[Currency.USD]
            },
            marketCapChangePercentage24h: {
                [`${Currency.EUR}`]: data.market_data.market_cap_change_percentage_24h_in_currency[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.market_cap_change_percentage_24h_in_currency[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.market_cap_change_percentage_24h_in_currency[Currency.USD]
            },
            fullyDilutedMarketCap: {
                [`${Currency.EUR}`]: data.market_data.fully_diluted_valuation[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.fully_diluted_valuation[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.fully_diluted_valuation[Currency.USD]
            },
            totalVolume: {
                [`${Currency.EUR}`]: data.market_data.total_volume[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.total_volume[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.total_volume[Currency.USD]
            }
        },
        priceData: {
            currentPrice: {
                [`${Currency.EUR}`]: data.market_data.current_price[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.current_price[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.current_price[Currency.USD]
            },
            ath: {
                [`${Currency.EUR}`]: data.market_data.ath[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.ath[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.ath[Currency.USD]
            },
            athDate: {
                [`${Currency.USD}`]: data.market_data.ath_date[Currency.USD]
            },
            high24h: {
                [`${Currency.EUR}`]: data.market_data.high_24h[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.high_24h[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.high_24h[Currency.USD]
            },
            low24h: {
                [`${Currency.EUR}`]: data.market_data.low_24h[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.low_24h[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.low_24h[Currency.USD]
            },
            priceChange24h: {
                [`${Currency.EUR}`]: data.market_data.price_change_24h_in_currency[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.price_change_24h_in_currency[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.price_change_24h_in_currency[Currency.USD]
            },
            priceChangePercentage24h: {
                [`${Currency.EUR}`]: data.market_data.price_change_percentage_24h_in_currency[Currency.EUR],
                [`${Currency.GBP}`]: data.market_data.price_change_percentage_24h_in_currency[Currency.GBP],
                [`${Currency.USD}`]: data.market_data.price_change_percentage_24h_in_currency[Currency.USD]
            }
        }
    }
    debugger
    return {type: actionTypes.FETCH_COIN_DETAILS_SUCCESS, payload: coinDetails};
}

const mapResponseToCoinOHCLData = (data) => {
    const ohclDataArr = [{data: []}]
    data.forEach(item => {

        let date = new Date(item[0]).toLocaleDateString()
        let time = new Date(item[0]).toLocaleTimeString()
        ohclDataArr[0].data.push({
            x: [`${date} ${time}`],
            y: item.slice(1, 5)
        })
    })
    debugger
    return {type: actionTypes.FETCH_COIN_OHCL_DATA_SUCCESS, payload: ohclDataArr}
}

const mapResponseToCoinMarketChartData = (data) => {
    const prices = [];
    const dateTimes = [];
    data.forEach(item => {
        let currentDateTime = new Date(item[0]);
        let currentPrice = parseFloat(item[1]);
        prices.push(currentPrice);
        dateTimes.push(toIsoDate(currentDateTime))
    })
    return {
        prices: prices,
        dateTimes: dateTimes
    }
}

export const cleanUpCoinDetails = () => {
    return {
        type: actionTypes.FETCH_COIN_DETAILS_SUCCESS, payload: null
    }
}

export const cleanUpCoinAbstract = () => {
    return {
        type: actionTypes.FETCH_COIN_ABSTRACT_SUCCESS, payload: null
    }
}

export const cleanUpCoinOHCLTimeSeries = () => {
    return {
        type: actionTypes.FETCH_COIN_OHCL_DATA_SUCCESS, payload: []
    }
}

export const cleanUpCoinMarketChartTimeSeries = () => {
    return {
        type: actionTypes.FETCH_COIN_MARKET_CHART_DATA_SUCCESS, payload: []
    }
}