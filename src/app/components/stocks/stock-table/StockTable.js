import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import StockTableRow from "./stock-table-row/StockTableRow";
import * as actions from '../../../store/actions/index';
import PropTypes from "prop-types";
import SelectableButton from "../../../shared/components/SelectableButton";
import './StockSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {fetchStockSectors} from "../../../store/actions/index";

const StockTable = (props) => {
    const [selectedSector, setSelectedSector] = useState(undefined);

    const dispatch = useDispatch();

    const stocksTableData = useSelector((state) => state.stocksReducer.stocksTableData, shallowEqual);
    const stockSectors = useSelector((state) => state.stocksReducer.stockSectors, shallowEqual)

    useEffect(() => {
        dispatch(fetchStockSectors())
    }, [dispatch]);

    useEffect(() => {
        const symbolsJoined = [].map(s => s.shortName).join(",");
        dispatch(actions.fetchLatestStockValues(symbolsJoined));
    }, [dispatch])

    const renderTableData = stocksTableData.map((s) => (
        <StockTableRow key={s.shortName + "-table-row"}
                       name={s.name}
                       handleOnTableRowClick={() => props.handleOnTableRowClick(s)}
                       shortName={s.shortName}
                       change={parseFloat(s.change)}
                       lastPrice={s.latestPrice}
                       isSelected={s.shortName === props.selectedStock.shortName}/>
    ));

    const handleSectorClick = (label) => {
        let sector = stockSectors.find(el => el === label)
        if (selectedSector === sector) {
            setSelectedSector(undefined)
        } else {
            setSelectedSector(sector)
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="font-weight-medium">Search Market Symbols</h4>

                <div className="mt-3 inputs">
                    <FontAwesomeIcon icon={faSearch} className="search"/>
                    <input type="text" className="form-control" placeholder="Type symbol..."/>
                </div>
                <div className="row">
                    {stockSectors !== undefined ? stockSectors.map(sector =>
                        <SelectableButton handleOnButtonClick={() => handleSectorClick(sector)}
                                          selected={sector === selectedSector} label={sector}/>
                    ) : <div/>}
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
