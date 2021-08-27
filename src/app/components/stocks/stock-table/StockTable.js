import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import StockTableRow from "./stock-table-row/StockTableRow";
import * as actions from '../../../store/actions/index';
import latestStocksArray from "../../../shared/objects/latestStocksArray";
import PropTypes from "prop-types";

const StockTable = (props) => {
    const dispatch = useDispatch();
    const stocksTableData = useSelector((state) => state.stocksReducer.stocksTableData, shallowEqual);

    useEffect(() => {
        const symbolsJoined = latestStocksArray.map(s => s.shortName).join(",");
        dispatch(actions.fetchLatestStockValues(symbolsJoined));
    }, [dispatch])

    const renderTableData = stocksTableData.map((s) => (
        <StockTableRow key={s.shortName + "-table-row"}
                       name={s.name}
                       handleOnTableRowClick={() => props.handleOnTableRowClick(s)}
                       shortName={s.shortName}
                       change={parseFloat(s.change)}
                       lastPrice={s.latestPrice}
                       isSelected={s.shortName===props.selectedStock.shortName}/>
    ));

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="font-weight-medium">People Also Watch</h4>
                <div className="table-responsive">
                    <table className="table table-stretched table-hover">
                        <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Last Price</th>
                            <th>Change</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderTableData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

StockTable.propTypes = {
    selectedStock: PropTypes.object,
    handleOnTableRowClick: PropTypes.func
}

export default StockTable;
