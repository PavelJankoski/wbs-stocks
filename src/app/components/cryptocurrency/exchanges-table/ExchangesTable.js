import React from "react";
import PropTypes from "prop-types";
import ExchangeTableRow from "./exchange-table-row/ExchangeTableRow";

const ExchangesTable = (props) => {

    const renderTableData = props.exchanges.map((exchange) => (
        <ExchangeTableRow key={exchange.id}
                          name={exchange.name}
                          exchangeIcon={exchange.icon}
                          yearEstablished={exchange.yearEstablished}
                          country={exchange.country}
                          tradeVolume24hBTC={exchange.tradeVolume24hBTC}
                          handleOnTableRowClick={() => props.handleOnTableRowClick(exchange)}/>
    ));

    return (
        <div className="table-responsive">
            <table className="table table-stretched table-hover">
                <thead>
                <tr>
                    <th colSpan={2}>Exchange</th>
                    <th>24h Volume</th>
                    <th>Country</th>
                    <th>Year Established</th>
                </tr>
                </thead>
                <tbody>
                {renderTableData}
                </tbody>
            </table>
        </div>
    )
}

ExchangesTable.propTypes = {
    exchanges: PropTypes.array,
    handleOnTableRowClick: PropTypes.func
}

export default ExchangesTable;
