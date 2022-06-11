import React from "react";
import CoinTableRow from "./coin-table-row/CoinTableRow";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import AppPagination from "../../../shared/components/AppPagination";

const CoinsTable = (props) => {

    const handleOnTableRowClick = (coin) => {
        props.history.push(`/coin/${coin.id}`);
    }

    const renderTableData = props.coinsData.coinsArr.map((coin, index) => (
        <CoinTableRow key={coin.id}
                      name={coin.name}
                      coinIcon={coin.coinIcon}
                      handleOnTableRowClick={() => handleOnTableRowClick(coin)}
                      symbol={coin.symbol}
                      priceChangePercentage1h={coin.priceChangePercentage1h}
                      priceChangePercentage24h={coin.priceChangePercentage24h}
                      priceChangePercentage7d={coin.priceChangePercentage7d}
                      marketCapital={coin.marketCapital}
                      rank={((props.coinsData.pagination.page - 1) * props.pageSize) + index + 1}
                      lastPrice={coin.lastPrice}/>
    ));

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-stretched table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
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
                <div className="d-flex justify-content-center mt-3">
                    <AppPagination size={props.coinsData.pagination.totalPages} onPageChange={props.handlePageChange} page={props.coinsData.pagination.page}/>
                </div>
            </div>
        </div>

    )
}

CoinsTable.propTypes = {
    coinsData: PropTypes.object,
    pageSize: PropTypes.number,
    handlePageChange: PropTypes.func
}

export default withRouter(CoinsTable);
