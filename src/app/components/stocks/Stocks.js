import React, {useState} from 'react';
import latestStocksArray from "../../shared/objects/latestStocksArray";
import StockExchangeTable from "./stock-exchange-table/StockExchangeTable";
import MostPopularStocks from "./most-popular-stocks/MostPopularStocks";
import StockTimeSeries from "./stock-timeseries/StockTimeSeries";
import StockTable from "./stock-table/StockTable";
import PageHeader from "../../shared/components/page-header/PageHeader";

const Stocks = () => {
    const [selectedStock, setSelectedStock] = useState(latestStocksArray[0]);

    const handleOnTableRowClick = (stock) => {
        setSelectedStock(stock);
    }

    return (
        <div>
            <PageHeader title="Dashboard" />
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <MostPopularStocks/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 grid-margin stretch-card">
                    <StockTimeSeries selectedStock={selectedStock}/>
                </div>
                <div className="col-md-4 grid-margin stretch-card">
                    <StockTable selectedStock={selectedStock} handleOnTableRowClick={handleOnTableRowClick}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <StockExchangeTable/>
                </div>
            </div>
        </div>
    );
}

export default Stocks;
