import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import StockTableRow from "./stock-table-row/StockTableRow";
import * as actions from '../../../store/actions/index';
import SelectableButton from "../../../shared/components/SelectableButton";
import {fetchStockSectors} from "../../../store/actions/index";
import {IconButton, InputAdornment, TextField} from '@mui/material';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import SearchIcon from '@material-ui/icons/Search'
import AppPagination from "../../../shared/components/AppPagination";
import PropTypes from "prop-types";

const StockTable = (props) => {
    const [searchedStock, setSearchedStock] = useState(undefined);

    const [timer, setTimer] = useState(0);

    const [selectedSector, setSelectedSector] = useState(undefined);

    const dispatch = useDispatch();

    const stocksTableData = useSelector((state) => state.stocksReducer.searchedStocks, shallowEqual);
    const stockSectors = useSelector((state) => state.stocksReducer.stockSectors, shallowEqual)

    const onSearchInputChange = (searchText) => {
        if (timer) {
            clearTimeout(timer);
        }
        setSearchedStock(searchText)
        setTimer(setTimeout(() =>
            dispatch(actions.searchStocks(0, 5, searchText, selectedSector)), 1500)
        );

    }

    useEffect(() => {
        dispatch(fetchStockSectors())
        dispatch(actions.searchStocks(0, 5, searchedStock, selectedSector))
    }, [dispatch]);

    const renderTableData = stocksTableData.data.map((s) => (
        <StockTableRow key={s.companyName + "-table-row"}
                       name={s.companyName}
                       exchange={s.exchange}
                       logoUrl={s.logoUrl}
                       handleOnTableRowClick={() => props.handleClick(s)}
                       symbol={s.symbol}
        />
    ));

    const handleSectorClick = (sector) => {
        if (timer) {
            clearTimeout(timer);
        }
        if (selectedSector === sector) {
            setSelectedSector(undefined)
            setTimer(setTimeout(() =>
                dispatch(actions.searchStocks(0, 5, searchedStock, undefined)), 1500)
            );
        } else {
            setSelectedSector(sector)
            setTimer(setTimeout(() =>
                dispatch(actions.searchStocks(0, 5, searchedStock, sector)), 1500)
            );
        }

    }

    const handlePageChange = (e, page) => {
        if (timer) {
            clearTimeout(timer);
        }

        setTimer(setTimeout(() =>
            dispatch(actions.searchStocks(page - 1, 5, searchedStock, undefined)), 1500)
        );
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="font-weight-medium">Search Market Symbols</h4>

                <div className="mt-3">
                    <TextField
                        placeholder="Type stock symbol or company name"
                        type="text"
                        variant="standard"
                        fullWidth
                        value={searchedStock}
                        onChange={(e) => onSearchInputChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),

                            endAdornment: searchedStock && (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => onSearchInputChange("")}
                                ><CancelRoundedIcon/></IconButton>
                            )
                        }}
                    />
                </div>
                <div className="row">
                    {stockSectors !== undefined ? stockSectors.map(sector =>
                        <SelectableButton handleOnButtonClick={() => handleSectorClick(sector)}
                                          selected={sector === selectedSector} label={sector}/>
                    ) : <div/>}
                </div>

                {
                    stocksTableData.data.length > 0 ? <div>
                            <div className="table-responsive">
                                <table className="table table-stretched table-hover">
                                    <thead>
                                    <tr>
                                        <th className="col-2">Symbol</th>
                                        <th className="col-5">Name</th>
                                        <th className="col-5">Exchange</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {renderTableData}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center mt-3">
                                    <AppPagination size={stocksTableData.pagination.totalPages}
                                                   onPageChange={handlePageChange}/>
                                </div>
                            </div>
                        </div>
                        : <div/>}
            </div>
        </div>
    )
}

StockTable.propTypes = {
    handleClick: PropTypes.func
}

export default StockTable;
