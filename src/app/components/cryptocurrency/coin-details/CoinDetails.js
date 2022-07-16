import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {cleanUpCoinDetails, fetchCoinDetails} from "../../../store/actions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Badge, Image} from "react-bootstrap";
import {Currency} from "../../../shared/objects/currencies";
import NumberFormat from "react-number-format";
import LinkDropdownButton from "../../UI/LinkDropdownButton";
import CoinTimeSeries from "../coin-timeseries/CoinTimeSeries";
import parse from 'html-react-parser'
import {TechnicalAnalysis} from "react-tradingview-embed";
import {Box} from "@mui/material";
import {numberFormatter} from "../../../shared/utils/utils";

const CoinDetails = () => {

    const {coin_id} = useParams()
    const dispatch = useDispatch()

    let coinDetails = useSelector((state) => state.cryptocurrenciesReducer.coinDetails, shallowEqual)

    useEffect(() => {
        dispatch(fetchCoinDetails(coin_id))
        return function cleanup() {
            dispatch(cleanUpCoinDetails())
        }
    }, [dispatch, coin_id])

    return (
        coinDetails &&
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="d-flex col-12">
                        <Image src={coinDetails.image} roundedCircle alt={'Coin icon'}
                               style={{width: 50, height: 50}}/>
                        <p className="h1 font-weight-bold" style={{fontSize: 50}}>{coinDetails.name}</p>
                        <p className="h4 mt-4 ml-1">{coinDetails.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Badge variant={'secondary'}
                               className="p-2 align-self-center align-items-center">Rank
                            #{coinDetails.marketCapRank}</Badge>
                        <Badge variant={'light'}
                               className="p-2 ml-2 align-self-center align-items-center">{coinDetails.hashingAlgorithm}</Badge>
                        <LinkDropdownButton title={"Homepage"} links={coinDetails.links.homePageUrls}/>
                        {coinDetails.links.blockChainSitesUrls.length > 0 &&
                            <LinkDropdownButton title={"Explorers"} links={coinDetails.links.blockChainSitesUrls}/>}
                        {coinDetails.links.communityUrls.length > 0 &&
                            <LinkDropdownButton title={"Community"} links={coinDetails.links.communityUrls}/>}
                        {coinDetails.links.reposUrls.length > 0 &&
                            <LinkDropdownButton title={"Repos"} links={coinDetails.links.reposUrls}/>}
                        {coinDetails.links.socialNetworksUrls.length > 0 &&
                            <LinkDropdownButton title={"Social"} links={coinDetails.links.socialNetworksUrls}/>}
                    </div>
                </div>
                <div className="row mt-4 align-items-center">
                    <div className="col-xl-8 col-12 coin-price-box">
                        <NumberFormat className="coin-price" style={{
                            fontWeight: "bold",
                            fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                        }} decimalScale={2} displayType={"text"} prefix={'$'}
                                      thousandSeparator={true}
                                      value={coinDetails.priceData.currentPrice[Currency.USD]}/>
                        <Box className="coin-important-data-box">
                            <div className="row d-flex align-items-center coin-important-data">
                                <h4 className="m-0"
                                    style={{fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"}}>24H %</h4>
                                <NumberFormat decimalScale={2} displayType={"text"}
                                              suffix={'%'}
                                              thousandSeparator={true}
                                              style={{
                                                  fontSize: 20,
                                                  fontWeight: "bold",
                                                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                              }}
                                              className={`${coinDetails.priceData.priceChangePercentage24h >= 0 ? "text-success" : "text-danger"} font-weight-bold ml-2`}
                                              value={coinDetails.priceData.priceChangePercentage24h[Currency.USD]}/>
                            </div>
                            <div className="row d-flex align-items-center coin-important-data">
                                <h4 className="m-0 mr-4"
                                    style={{fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"}}>24H High</h4>
                                <NumberFormat decimalScale={2} displayType={"text"}
                                              prefix={'$'}
                                              thousandSeparator={true}
                                              className="font-weight-bold"
                                              style={{
                                                  fontSize: 20,
                                                  fontWeight: "bold",
                                                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                              }}
                                              value={coinDetails.priceData.high24h[Currency.USD]}/>
                            </div>
                            <div className="row d-flex align-items-center coin-important-data">
                                <h4 className="m-0 mr-4"
                                    style={{fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"}}>24H Low</h4>
                                <NumberFormat decimalScale={2} displayType={"text"}
                                              prefix={'$'}
                                              thousandSeparator={true}
                                              className="font-weight-bold"
                                              style={{
                                                  fontSize: 20,
                                                  fontWeight: "bold",
                                                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                              }}
                                              value={coinDetails.priceData.low24h[Currency.USD]}/>
                            </div>
                        </Box>
                    </div>
                    <div className="col-xl-4 mt-xl-0 mt-4">
                        <div className="row border-bottom">
                            <div className="col-sm-6 text-center">
                                <h5 className="pt-2"
                                    style={{
                                        fontSize: 20,
                                        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                    }}>Market Cap</h5>
                                <p style={{
                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                    fontWeight: "bold",
                                    fontSize: 35
                                }}>{numberFormatter(coinDetails.marketData.marketCap[Currency.USD], "$")}
                                </p>
                            </div>
                            <div className="col-sm-6 text-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <h5 className="pt-2"
                                        style={{
                                            fontSize: 20,
                                            fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                        }}>Volume</h5>
                                    <Badge variant={"secondary"}
                                           className="p-1 ml-2 text-gray">24h</Badge>
                                </div>
                                <p style={{
                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                    fontWeight: "bold",
                                    fontSize: 35
                                }}>{numberFormatter(coinDetails.marketData.totalVolume[Currency.USD], "$")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 ">
                    <div className="col-xl-7 col-12 ">
                        <div className="row">
                            <CoinTimeSeries coinSymbol={coinDetails.symbol}/>
                        </div>
                        <div className="row mt-5">
                            <p className="h2 font-weight-medium">About {coinDetails.name}</p>
                            <span style={{fontSize: 20}}>
                            {parse(coinDetails.description)}
                         </span>
                        </div>

                    </div>

                    <div className="col-xl-4 offset-xl-1 col-12 mt-xl-0 mt-4">
                        <div className="card bg-light" style={{borderRadius: 30}}>
                            <div className="card-title ml-3 mt-4 mb-0"><h3
                                className="font-weight-bold">{coinDetails.name} Statistics</h3></div>
                            <div className="card-body ml-2 mr-2 mt-0">
                                <div className="row coin-price-statistics-row-box">
                                    <div className="mt-4">
                                        <div className="d-flex">
                                            <p className="m-0" style={{fontSize: 18}}>Market Cap Change</p>
                                            <p className="badge badge-secondary align-self-center p-1 ml-2 m-0">24h</p>
                                        </div>

                                        <NumberFormat decimalScale={2} displayType={"text"} suffix={"%"}
                                                      thousandSeparator={true}
                                                      className={`${coinDetails.marketData.marketCapChangePercentage24h >= 0 ? "text-success" : "text-danger"}`}
                                                      style={{
                                                          fontSize: 20,
                                                          fontWeight: "bold",
                                                          fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                                      }}
                                                      value={coinDetails.marketData.marketCapChangePercentage24h[Currency.USD]}/>

                                    </div>
                                    <div className="coin-price-statistics-right-item mt-4">
                                        <div className="d-flex">
                                            <p className="m-0" style={{fontSize: 18}}>Price Change</p>
                                            <p className="badge badge-secondary align-self-center p-1 ml-2 m-0">24h</p>
                                        </div>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      prefix={"$"}
                                                      thousandSeparator={true}
                                                      style={{
                                                          fontSize: 20,
                                                          fontWeight: "bold",
                                                          fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                                      }}
                                                      className={`${coinDetails.priceData.priceChange24h[Currency.USD] >= 0 ? "text-success" : "text-danger"}`}
                                                      value={coinDetails.priceData.priceChange24h[Currency.USD]}/>
                                    </div>
                                </div>

                                <div className="row coin-price-statistics-row-box">
                                    <div className="mt-4">
                                        <p className="m-0" style={{fontSize: 18}}>All Time High</p>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      prefix={'$'}
                                                      thousandSeparator={true}
                                                      style={{
                                                          fontSize: 20,
                                                          fontWeight: "bold",
                                                          fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                                      }}
                                                      value={coinDetails.priceData.ath[Currency.USD]}/>

                                    </div>
                                    <div className="coin-price-statistics-right-item mt-4">
                                        <p className="m-0" style={{fontSize: 18}}>Circulating Supply</p>
                                        <p style={{
                                            margin: 0,
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                        }}>{numberFormatter(coinDetails.marketData.circulatingSupply)}</p>
                                    </div>
                                </div>

                                <div className="row coin-price-statistics-row-box">
                                    <div className="mt-4">
                                        <p className="m-0" style={{fontSize: 18}}>Max Supply</p>
                                        <p style={{
                                            margin: 0,
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                        }}>{numberFormatter(coinDetails.marketData.maxSupply)}</p>

                                    </div>
                                    <div className="coin-price-statistics-right-item mt-4">
                                        <p className="m-0" style={{fontSize: 18}}>Total Supply</p>
                                        <p style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"
                                        }}>{numberFormatter(coinDetails.marketData.totalSupply)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <TechnicalAnalysis widgetProps={{
                                "isTransparent": true,
                                "colorTheme": "light",
                                "width": "100%",
                                "symbol": `BINANCE:${coinDetails.symbol === "usdt" ? "BTC" : coinDetails.symbol}USDT`
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDetails