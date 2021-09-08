import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {cleanUpCoinDetails, fetchCoinDetails} from "../../../store/actions/cryptocurrenciesActions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Badge, Image} from "react-bootstrap";
import {Currency} from "../../../shared/objects/currencies";
import NumberFormat from "react-number-format";
import LinkDropdownButton from "../../UI/LinkDropdownButton";
import CoinTimeSeries from "../coin-timeseries/CoinTimeSeries";

const CoinDetails = (props) => {

    const {coin_id} = useParams()
    const dispatch = useDispatch()

    let coinDetails = useSelector((state) => state.cryptocurrenciesReducer.coinDetails, shallowEqual)

    useEffect(() => {
        dispatch(fetchCoinDetails(coin_id))
        return function cleanup() {
            debugger
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
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-xl-4 col-12">
                        <NumberFormat style={{fontSize: 70}} decimalScale={2} displayType={"text"} prefix={'$'}
                                      thousandSeparator={true}
                                      value={coinDetails.priceData.currentPrice[`${Currency.USD}`]}/>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-12 mb-3 mt-4 border-right-lg">
                        <div>
                            <p className="h5">Market Cap</p>
                            <NumberFormat decimalScale={2} displayType={"text"} prefix={'$'}
                                          thousandSeparator={true}
                                          style={{fontWeight: 1000, fontSize: 20}}
                                          value={coinDetails.marketData.marketCap[`${Currency.USD}`]}/>
                        </div>
                        <div className="d-flex mt-2">
                            <Badge variant={"light"} className="p-2 align-self-center">24h</Badge>
                            <NumberFormat decimalScale={2} displayType={"text"} suffix={'%'}
                                          thousandSeparator={true}
                                          className={`${coinDetails.marketData.marketCapChangePercentage24h >= 0 ? "text-success" : "text-danger"} ml-2`}
                                          style={{fontWeight: 1000, fontSize: 20}}
                                          value={coinDetails.marketData.marketCapChangePercentage24h[`${Currency.USD}`]}/>
                        </div>
                    </div>
                    {coinDetails.marketData.fullyDilutedMarketCap[`${Currency.USD}`] &&
                    <div className="col-lg-2 col-sm-12 col-md-3 mb-3 mt-4 border-right-lg">
                        <p className="h5">Fully Diluted Market Cap</p>
                        <NumberFormat decimalScale={2} displayType={"text"} prefix={'$'}
                                      thousandSeparator={true}
                                      style={{fontWeight: 1000, fontSize: 20}}
                                      value={coinDetails.marketData.fullyDilutedMarketCap[`${Currency.USD}`]}/>
                    </div>}
                    <div className="col-xl-2 col-lg-3 col-12 mb-3 mt-4 border-right-lg">
                        <div className="d-flex">
                            <p className="h5">Volume</p>
                            <Badge variant={"light"} className="p-2 ml-2 align-self-center text-gray">24h</Badge>
                        </div>
                        <NumberFormat decimalScale={2} displayType={"text"} prefix={'$'}
                                      thousandSeparator={true}
                                      style={{fontWeight: 1000, fontSize: 20}}
                                      value={coinDetails.marketData.totalVolume[`${Currency.USD}`]}/>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-12 mt-4 mb-3">
                        <div>
                            <p className="h5">Circulating Supply</p>
                            <NumberFormat decimalScale={2} displayType={"text"}
                                          thousandSeparator={true}
                                          className="m-auto"
                                          style={{fontWeight: 1000, fontSize: 15}}
                                          value={coinDetails.marketData.circulatingSupply}/>

                        </div>
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

                <div className="row mt-4 mb-4">
                    <div className="col-lg-8 col-12">
                        <CoinTimeSeries coinId={coin_id}/>
                    </div>

                    <div className="col-lg-4 col-12">
                        <div className="card border-light">
                            <div className="card-body">
                                <p className="h3 font-weight-bold mb-5">Price Details</p>

                                <div className="d-flex pb-4 border-bottom">
                                    <p className="h5">{coinDetails.name} Price</p>
                                    <NumberFormat decimalScale={2} displayType={"text"}
                                                  prefix={'$'}
                                                  thousandSeparator={true}
                                                  className="m-auto"
                                                  value={coinDetails.priceData.currentPrice[`${Currency.USD}`]}/>
                                </div>
                                <div className="d-flex pt-4 pb-4 border-bottom">
                                    <div className="d-flex">
                                        <p className="h5">Price change</p>
                                        <Badge variant={"light"} className="p-2 ml-2 align-self-center">24h</Badge>
                                    </div>
                                    <NumberFormat decimalScale={2} displayType={"text"}
                                                  prefix={'$'}
                                                  thousandSeparator={true}
                                                  value={coinDetails.priceData.priceChange24h[`${Currency.USD}`]}/>
                                    <NumberFormat decimalScale={2} displayType={"text"}
                                                  suffix={'%'}
                                                  thousandSeparator={true}
                                                  className={`${coinDetails.priceData.priceChangePercentage24h >= 0 ? "text-success" : "text-danger"}`}
                                                  value={coinDetails.priceData.priceChangePercentage24h[`${Currency.USD}`]}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8 col-12">
                        <p className="h2 font-weight-medium">About {coinDetails.name}</p>
                        <span style={{fontSize: 20}}>
                            {coinDetails.description}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDetails