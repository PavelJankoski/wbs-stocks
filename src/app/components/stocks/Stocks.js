import React, {useEffect} from 'react';
import StockExchangeTable from "./stock-exchange-table/StockExchangeTable";
import MarketTopStocks from "./top-stocks/MarketTopStocks";
import StockTable from "./stock-table/StockTable";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {fetchMarketTopGainers} from "../../store/actions";
import {fetchMarketTopLosers} from "../../store/actions/stocksActions";

const Stocks = () => {

    const dispatch = useDispatch();
    const topGainersData = useSelector((state) => state.stocksReducer.topGainers, shallowEqual)
    const topLosersData = useSelector((state) => state.stocksReducer.topLosers, shallowEqual)

    useEffect(() => {
        dispatch(fetchMarketTopGainers())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchMarketTopLosers())
    }, [dispatch]);

    return (
        <div>
            <div className="row page-title-header">
                <div className="col-12">
                    <div className="page-header">
                        <h3 className=" font-weight-medium">Stock Market</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 grid-margin">
                    <MarketTopStocks icon={require("../../../assets/images/bull-market.png")} title={"Biggest Market Gainers"} loading={topGainersData.loading} stocks={topGainersData.stocks}/>
                </div>
                <div className="col-xl-6 grid-margin">
                    <MarketTopStocks icon={require("../../../assets/images/bear-market.png")} title={"Biggest Market Losers"} loading={topLosersData.loading} stocks={topLosersData.stocks}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <StockTable/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <StockExchangeTable/>
                </div>
            </div>
        </div>
    );
}

export default Stocks;
