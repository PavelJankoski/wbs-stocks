import React, {useCallback, useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import stockExchangesTableColumns from "../../../shared/objects/stockExchangesTableColumns";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions';


const StockExchangeTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState("");
    const [timer, setTimer] = useState(0);
    const stockExchanges = useSelector((state) => state.stocksReducer.stockExchanges, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchStockExchanges(rowsPerPage, rowsPerPage * page, searchText));
    }, [dispatch, searchText, page, rowsPerPage])

    const onTableRowClick = useCallback((rowData, rowMeta) => {
        window.open(`https://${stockExchanges.data[rowMeta.rowIndex].website}`, "_blank");
    }, [stockExchanges])

    const handleOnSearchChange = (searchText) => {
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
                    setPage(0);
                    setRowsPerPage(10);
                    setSearchText(searchText);
                    dispatch(actions.fetchStockExchanges(10, 0, searchText));
        }, 1500)
        );
    }

    const options = {
        filter: false,
        print: false,
        sort: false,
        serverSide: true,
        viewColumns: false,
        rowsPerPage: rowsPerPage,
        page: page,
        count: stockExchanges.total,
        rowsPerPageOptions: [5, 10, 20],
        responsive: 'standard',
        selectableRows: 'none',
        customSearch: () => {return true},
        onSearchChange: (searchText) => handleOnSearchChange(searchText),
        onRowClick: (rowData, rowMeta) => onTableRowClick(rowData, rowMeta),
        onChangePage: (page) => setPage(page),
        onChangeRowsPerPage: (rowsPerPage) => setRowsPerPage(rowsPerPage)
    };

    return (
        <MUIDataTable
            title={"Exchanges"}
            data={stockExchanges.data}
            columns={stockExchangesTableColumns}
            options={options}
        />
    )
}

export default StockExchangeTable;
