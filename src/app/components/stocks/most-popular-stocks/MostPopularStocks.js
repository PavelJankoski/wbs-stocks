import React, {useCallback, useEffect} from "react";
import MostPopularStocksItem from "./most-popular-stocks-item/MostPopularStocksItem";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../store/actions";
import stocksTimeSeries from "../../../shared/objects/stocksTimeSeries";
import stockInterval from "../../../shared/objects/stockInterval";

const MostPopularStocks = () => {
    const dispatch = useDispatch();
    const popularStocks = useSelector((state) => state.stocksReducer.mostPopular, shallowEqual)

    const fetchMostPopularStocksData = useCallback(() => {
        dispatch(actions.fetchMostPopularStock(stocksTimeSeries.INTRADAY, "IBM", stockInterval["60"]));
        dispatch(actions.fetchMostPopularStock(stocksTimeSeries.INTRADAY, "TSLA", stockInterval["60"]));
        dispatch(actions.fetchMostPopularStock(stocksTimeSeries.INTRADAY, "AAPL", stockInterval["60"]));
        dispatch(actions.fetchMostPopularStock(stocksTimeSeries.INTRADAY, "MSFT", stockInterval["60"]));
    }, [dispatch])


    useEffect(() => {
        fetchMostPopularStocksData();
    }, [fetchMostPopularStocksData]);

    const renderPopularStocksItems = Object.keys(popularStocks).map((s) =>
        (<MostPopularStocksItem key={s} loading={popularStocks[`${s}`].loading}
                                stock={popularStocks[`${s}`]}/>)
    )

    return (
        <div className="row">
            <div className="col-md-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            {renderPopularStocksItems}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostPopularStocks;
