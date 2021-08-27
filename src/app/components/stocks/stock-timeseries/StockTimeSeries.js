import React, {useEffect, useMemo, useState} from "react";
import {Line} from "react-chartjs-2";
import {datasetKeyProvider, formatStringToDecimal} from "../../../shared/utils/utils";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions/index';
import stockIntervals from "../../../shared/objects/stockIntervals";
import {Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

const StockTimeSeries = (props) => {
    const [active, setActive] = useState(stockIntervals[0]);
    const dispatch = useDispatch();
    const stockInInterval = useSelector((state) => state.stocksReducer.stockInInterval, shallowEqual)


    useEffect(() => {
        if(Object.keys(props.selectedStock).length > 0) {
            dispatch(actions.fetchStocksForInterval(props.selectedStock.shortName, active.interval, 10));
        }
    }, [active, dispatch, props.selectedStock])

    const timeSeriesStockOptions = useMemo(() => {
        return {
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            elements: {
                point: {
                    radius: 3
                },
                line: {
                    tension: 0
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            legend: false,
            scales: {
                xAxes: [{
                    display: false,
                    ticks: {
                        display: false,
                        beginAtZero: false
                    },
                    gridLines: {
                        drawBorder: false,
                        color: "#f8f8f8",
                        zeroLineColor: "#f8f8f8",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "#f8f8f8",
                        zeroLineColor: "#f8f8f8",
                        display: true,
                        drawBorder: false
                    }
                }]
            }
        }
    }, [])


    const renderTimeSeries = stockIntervals.map((t) => (
        <li key={t.label} className="nav-item">
            <button className={`nav-link ${active.label === t.label ? 'active' : ''}`} onClick={() => setActive(t)}
                    data-toggle="tab" role="tab" aria-selected="false">{t.label}</button>
        </li>
    ))


    return (

        <div className="card">
            {!stockInInterval.loading ? <div className="card-body">
                <h4 className="mb-0 font-weight-medium">{props.selectedStock.name}</h4>
                <div className="d-xl-flex flex-column flex-lg-row">
                    <p>
                        O:<span className="text-info">{formatStringToDecimal(stockInInterval.lastData?.open)} </span>
                        H:<span className="text-info">{formatStringToDecimal(stockInInterval.lastData?.high)} </span>
                        L:<span className="text-info">{formatStringToDecimal(stockInInterval.lastData?.low)} </span>
                        C:<span className="text-info">{formatStringToDecimal(stockInInterval.lastData?.close)}</span>
                    </p>
                    <ul className="nav nav-tabs sales-mini-tabs ml-lg-auto mb-4" role="tablist">
                        {renderTimeSeries}
                    </ul>
                </div>
                <div className="data-wrapper d-flex mt-2 mt-lg-0">
                    <div className="wrapper mb-4">
                        <h5 className="mb-0">Change (%)</h5>
                        <div className="d-xl-flex align-items-center">
                            <h4 className={`font-weight-semibold ${stockInInterval.stockPercentage >= 0 ? "text-success" : "text-danger"}`}>{stockInInterval.stockPercentage}%</h4>
                        </div>
                    </div>
                </div>
                <Line data={stockInInterval.chartData} options={timeSeriesStockOptions}
                      datasetKeyProvider={datasetKeyProvider} height={50} width={100}/>
            </div> : <div className="h-100 d-flex align-self-center align-items-center">
                <Spinner variant={'primary'} animation="border" style={{width: "100px", height: "100px"}}/>
            </div>}
        </div>
    )
}

StockTimeSeries.propTypes = {
    selectedStock: PropTypes.object
}

export default StockTimeSeries;
