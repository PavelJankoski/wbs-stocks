import React from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {AdvancedChart, TechnicalAnalysis, Ticker} from "react-tradingview-embed"; //DO NOT REMOVE THIS

const CoinTimeSeries = (props) => {
    const dispatch = useDispatch();
    let coinOHCLData = useSelector((state) => state.cryptocurrenciesReducer.coinOHCLData, shallowEqual)
    let coinMarketChartData = useSelector((state) => state.cryptocurrenciesReducer.coinMarketChartData, shallowEqual)


    return (
        <div className="h-100 w-100">
            <AdvancedChart
                widgetProps={{
                    "withdateranges": false,
                    "theme": "light",
                    "toolbar_bg": "#f1f3f6",
                    "style": "3",
                    "interval": "5",
                    "range": "1D",
                    "symbol": `BINANCE:${props.coinSymbol === "usdt" ? "BTC" : props.coinSymbol}USDT`
                }}/>

            <TechnicalAnalysis widgetProps={{
                "isTransparent": true,
                "colorTheme": "light",
                "symbol": `BINANCE:${props.coinSymbol === "usdt" ? "BTC" : props.coinSymbol}USDT`
            }} />
        </div>
    );
}

CoinTimeSeries.propTypes = {
    coinSymbol: PropTypes.string
}

export default CoinTimeSeries;
