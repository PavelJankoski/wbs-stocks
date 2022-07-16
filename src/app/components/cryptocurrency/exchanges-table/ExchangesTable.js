import React, {useCallback} from "react";
import PropTypes from "prop-types";
import ExchangeTableRow from "./exchange-table-row/ExchangeTableRow";
import AppPagination from "../../../shared/components/AppPagination";

const ExchangesTable = (props) => {

    const handleOnTableRowClick = (exchange) => {
        window.open(exchange.url, "_blank");
    }

    const renderTableData = props.exchanges.exchangesArr.map((exchange, index) => (
        <ExchangeTableRow key={exchange.id}
                          name={exchange.name}
                          exchangeIcon={exchange.icon}
                          yearEstablished={exchange.yearEstablished}
                          country={exchange.country}
                          tradeVolume24hBTC={exchange.tradeVolume24hBTC}
                          rank={((props.exchanges.pagination.page - 1) * props.pageSize) + index + 1}
                          handleOnTableRowClick={() => handleOnTableRowClick(exchange)}/>
    ));

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-stretched table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Exchange</th>
                        <th>24h Volume</th>
                        <th>Country</th>
                        <th>Year Established</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderTableData}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center mt-3">
                    <AppPagination size={props.exchanges.pagination.totalPages} onPageChange={props.handlePageChange} page={props.exchanges.pagination.page}/>
                </div>
            </div>
        </div>

    )
}

ExchangesTable.propTypes = {
    exchanges: PropTypes.object,
    pageSize: PropTypes.number,
    handlePageChange: PropTypes.func
}

export default ExchangesTable;
