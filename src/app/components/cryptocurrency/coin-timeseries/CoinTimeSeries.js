import React from "react";
import PropTypes from "prop-types";
import { AdvancedChart } from "react-tradingview-embed";

const CoinTimeSeries = (props) => {
    return (
        <div className="h-100 w-100">
            <AdvancedChart
                widgetProps={{
                    "withdateranges": false,
                    "theme": "light",
                    "toolbar_bg": "#f1f3f6",
                    "symbol": `BINANCE:${props.coinSymbol === "usdt" ? "BTC" : props.coinSymbol}USDT`
                }}/>
        </div>
    );
}

CoinTimeSeries.propTypes = {
    coinSymbol: PropTypes.string
}

export default CoinTimeSeries;
