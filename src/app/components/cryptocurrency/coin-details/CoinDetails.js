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
                        <p className="h1 font-weight-bold ml-2" style={{fontSize: 50}}>{coinDetails.name}</p>
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
                        <LinkDropdownButton title={"Explorers"} links={coinDetails.links.blockChainSitesUrls}/>
                        <LinkDropdownButton title={"Community"} links={coinDetails.links.communityUrls}/>
                        <LinkDropdownButton title={"Repos"} links={coinDetails.links.reposUrls}/>
                        <LinkDropdownButton title={"Social"} links={coinDetails.links.socialNetworksUrls}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-xl-3 col-12">
                        <NumberFormat style={{fontSize: 70}} decimalScale={2} displayType={"text"} prefix={'$'}
                                      thousandSeparator={true}
                                      value={coinDetails.priceData.currentPrice[Currency.USD]}/>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-sm-6 col-12 mb-3 mt-4 border-right-lg">
                        <div>
                            <p className="h5">Market Cap</p>
                            <NumberFormat decimalScale={2} displayType={"text"} prefix={'$'}
                                          thousandSeparator={true}
                                          style={{fontWeight: 1000, fontSize: 20}}
                                          value={coinDetails.marketData.marketCap[Currency.USD]}/>
                        </div>
                        <div className="d-flex mt-2">
                            <Badge variant={"light"} className="p-2 align-self-center">24h</Badge>
                            <NumberFormat decimalScale={2} displayType={"text"} suffix={'%'}
                                          thousandSeparator={true}
                                          className={`${coinDetails.marketData.marketCapChangePercentage24h >= 0 ? "text-success" : "text-danger"} ml-2`}
                                          style={{fontWeight: 1000, fontSize: 20}}
                                          value={coinDetails.marketData.marketCapChangePercentage24h[Currency.USD]}/>
                        </div>
                    </div>
                    {coinDetails.marketData.fullyDilutedMarketCap[Currency.USD] &&
                        <div className="col-xl-2 col-lg-3 col-sm-6 col-12 mb-3 mt-4 border-right-lg">
                            <p className="h5">Fully Diluted Market Cap</p>
                            <NumberFormat decimalScale={2} displayType={"text"} prefix={'$'}
                                          thousandSeparator={true}
                                          style={{fontWeight: 1000, fontSize: 20}}
                                          value={coinDetails.marketData.fullyDilutedMarketCap[Currency.USD]}/>
                        </div>}
                    <div className="col-xl-2 col-lg-3 col-sm-6 col-12 mb-3 mt-4 border-right-lg">
                        <div className="d-flex">
                            <p className="h5">Volume</p>
                            <Badge variant={"secondary"} className="p-1 ml-2 align-self-center text-gray">24h</Badge>
                        </div>
                        <NumberFormat decimalScale={2} displayType={"text"} prefix={'$'}
                                      thousandSeparator={true}
                                      style={{fontWeight: 1000, fontSize: 20}}
                                      value={coinDetails.marketData.totalVolume[`${Currency.USD}`]}/>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-sm-6 col-12 mt-4 mb-3">
                        {coinDetails.marketData.maxSupply && <div className="d-flex">
                            <p className="h5">Circulating<br/>Supply</p>
                            <NumberFormat decimalScale={2} displayType={"text"}
                                          thousandSeparator={true}
                                          className="m-auto"
                                          style={{fontWeight: 1000, fontSize: 15}}
                                          value={coinDetails.marketData.circulatingSupply}/>

                        </div>}
                        {coinDetails.marketData.maxSupply && <div className="d-flex mt-2">
                            <p className="h5">Max Supply</p>
                            <NumberFormat decimalScale={2} displayType={"text"}
                                          thousandSeparator={true}
                                          className="m-auto"
                                          style={{fontWeight: 1000, fontSize: 15}}
                                          value={coinDetails.marketData.maxSupply}/>
                        </div>}
                        {coinDetails.marketData.totalSupply && <div className="d-flex">
                            <p className="h5">Total supply</p>
                            <NumberFormat decimalScale={2} displayType={"text"}
                                          thousandSeparator={true}
                                          className="m-auto"
                                          style={{fontWeight: 1000, fontSize: 15}}
                                          value={coinDetails.marketData.totalSupply}/>
                        </div>}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-xl-8 col-12">
                        <CoinTimeSeries coinSymbol={coinDetails.symbol}/>
                    </div>

                    <div className="col-xl-4 col-12 mt-xl-0 mt-4">
                        <div className="card" style={{borderRadius: 30, backgroundColor: "#f5f5f5"}}>
                            <div className="card-body">
                                <p className="h3 font-weight-bold">Price Details</p>
                                <div className="row">
                                    <div className="col-md-6 col-12 mt-5">
                                        <p className="m-0" style={{fontSize: 18}}>{coinDetails.name} Price</p>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      prefix={'$'}
                                                      thousandSeparator={true}
                                                      className="font-weight-bold"
                                                      style={{fontSize: 20}}
                                                      value={coinDetails.priceData.currentPrice[Currency.USD]}/>
                                    </div>
                                    <div className="col-md-6 col-12 mt-5 text-md-right">
                                        <div className="d-flex justify-content-md-end m-0">
                                            <p className="m-0" style={{fontSize: 18}}>Price change</p>
                                            <p className="badge badge-secondary align-self-center p-1 ml-2 m-0">24h</p>
                                        </div>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      prefix={'$'}
                                                      thousandSeparator={true}
                                                      style={{fontSize: 20}}
                                                      className="font-weight-bold"
                                                      value={coinDetails.priceData.priceChange24h[Currency.USD]}/>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      suffix={'%'}
                                                      thousandSeparator={true}
                                                      style={{fontSize: 20}}
                                                      className={`${coinDetails.priceData.priceChangePercentage24h >= 0 ? "text-success" : "text-danger"} font-weight-bold ml-2`}
                                                      value={coinDetails.priceData.priceChangePercentage24h[Currency.USD]}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-12 mt-5">
                                        <p className="m-0" style={{fontSize: 18}}>24H High</p>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      prefix={'$'}
                                                      thousandSeparator={true}
                                                      className="font-weight-bold"
                                                      style={{fontSize: 20}}
                                                      value={coinDetails.priceData.high24h[Currency.USD]}/>
                                    </div>
                                    <div className="col-md-6 col-12 mt-5 text-md-right">
                                        <p className="m-0" style={{fontSize: 18}}>24H Low</p>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      prefix={'$'}
                                                      thousandSeparator={true}
                                                      className="font-weight-bold"
                                                      style={{fontSize: 20}}
                                                      value={coinDetails.priceData.low24h[Currency.USD]}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-12 mt-5">
                                        <p className="m-0">All Time High</p>
                                        <NumberFormat decimalScale={2} displayType={"text"}
                                                      prefix={'$'}
                                                      thousandSeparator={true}
                                                      className="font-weight-bold"
                                                      style={{fontSize: 20}}
                                                      value={coinDetails.priceData.ath[Currency.USD]}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-8 col-12">
                        <p className="h2 font-weight-medium">About {coinDetails.name}</p>
                        <span style={{fontSize: 20}}>
                            {parse(coinDetails.description)}
                         </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDetails