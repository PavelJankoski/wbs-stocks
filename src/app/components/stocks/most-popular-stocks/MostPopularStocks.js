import React, {useCallback, useEffect} from "react";
import MostPopularStocksItem from "./most-popular-stocks-item/MostPopularStocksItem";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../store/actions";

const MostPopularStocks = () => {
    const dispatch = useDispatch();
    const popularStocks = useSelector((state) => state.stocksReducer.mostPopular, shallowEqual)

    const fetchMostPopularStocksData = useCallback(() => {
        dispatch(actions.fetchMostPopularStock("TSLA"));
        dispatch(actions.fetchMostPopularStock("AAPL"));
        dispatch(actions.fetchMostPopularStock("MSFT"));
        dispatch(actions.fetchMostPopularStock("IBM"));
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
