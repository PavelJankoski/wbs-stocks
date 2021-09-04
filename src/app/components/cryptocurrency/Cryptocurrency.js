import React, {useEffect, useState} from "react";
import CoinsTable from "./coins-table/CoinsTable";
import ExchangesTable from "./exchanges-table/ExchangesTable";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {fetchCoinsMarketData, fetchExchanges} from "../../store/actions/index";

const Cryptocurrency = () => {

    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(COINS)

    const coinsTableData = useSelector((state) => state.cryptocurrenciesReducer.coinsTableData, shallowEqual);
    const coinsTableDataLoading = useSelector((state) => state.cryptocurrenciesReducer.coinsTableLoading, shallowEqual);
    const exchangesTableData = useSelector((state) => state.cryptocurrenciesReducer.exchangesTableData, shallowEqual);
    const exchangesTableDataLoading = useSelector((state) => state.cryptocurrenciesReducer.exchangesTableLoading, shallowEqual);

    const renderTable = () => {
        switch (activeTab) {
            case COINS:
                return <CoinsTable coinsData={coinsTableData}/>
            case EXCHANGES:
                return <ExchangesTable exchanges={exchangesTableData}/>
            default:
                return null;
        }
    }

    const renderSpinner = () => {
        return <div className="h-100 d-flex align-self-center align-items-center">
            <Spinner variant={'primary'} animation="border"
                     style={{width: "100px", height: "100px"}}/>
        </div>
    }

    useEffect(() => {
        if (activeTab === COINS) {
            dispatch(fetchCoinsMarketData());
        } else {
            dispatch(fetchExchanges());
        }
    }, [dispatch, activeTab])

    return (
        <div className="h-100">
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="btn-group">
                        <button type={"button"}
                                className={`btn btn-lg btn-inverse-primary ${activeTab === COINS ? 'active' : ''}`}
                                onClick={() => setActiveTab(COINS)}>{COINS}</button>
                        <button type={"button"}
                                className={`btn btn-lg btn-inverse-primary ${activeTab === EXCHANGES ? 'active' : ''}`}
                                onClick={() => setActiveTab(EXCHANGES)}>{EXCHANGES}</button>
                    </div>
                </div>
            </div>
            <div className="row h-100">
                <div className="col-md-12 grid-margin h-100">
                    <div className="card h-100">
                        {
                            coinsTableDataLoading || exchangesTableDataLoading ? renderSpinner() :
                                <div className="card-body h-100">
                                    {
                                        renderTable()
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const COINS = "Coins"
const EXCHANGES = "Exchanges"

export default Cryptocurrency;
