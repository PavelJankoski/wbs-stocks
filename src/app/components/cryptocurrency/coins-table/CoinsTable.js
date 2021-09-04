import React from "react";
import CoinTableRow from "./coin-table-row/CoinTableRow";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

const CoinsTable = (props) => {

    const handleOnTableRowClick = (coin) => {
        props.history.push(`/coin/${coin.id}`);
    }

    const renderTableData = props.coinsData.map((coin) => (
        <CoinTableRow key={coin.id}
                      name={coin.name}
                      coinIcon={coin.coinIcon}
                      handleOnTableRowClick={() => handleOnTableRowClick(coin)}
                      symbol={coin.symbol}
                      priceChangePercentage1h={coin.priceChangePercentage1h}
                      priceChangePercentage24h={coin.priceChangePercentage24h}
                      priceChangePercentage7d={coin.priceChangePercentage7d}
                      marketCapital={coin.marketCapital}
                      lastPrice={coin.lastPrice}/>
    ));

    return (
        <div className="table-responsive">
            <table className="table table-stretched table-hover">
                <thead>
                <tr>
                    <th colSpan={2}>Coin</th>
                    <th>Last Price</th>
                    <th>1h</th>
                    <th>24h</th>
                    <th>7d</th>
                    <th>Market Cap</th>
                </tr>
                </thead>
                <tbody>
                {renderTableData}
                </tbody>
            </table>
        </div>
    )
}

CoinsTable.propTypes = {
    coinsData: PropTypes.array
}

export default withRouter(CoinsTable);
