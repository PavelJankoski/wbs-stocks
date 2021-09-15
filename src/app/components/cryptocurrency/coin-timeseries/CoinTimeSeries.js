import React, {useEffect, useMemo, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions/index';
import PropTypes from "prop-types";
import cryptoIntervals from "../../../shared/objects/cryptoIntervals";
import ReactApexChart from "react-apexcharts";
import cryptoTimeSeriesCharts from "../../../shared/objects/cryptoTimeSeriesCharts";
import {datasetKeyProvider} from "../../../shared/utils/utils";
import {Line} from "react-chartjs-2";
import * as Zoom from "chartjs-plugin-zoom" //DO NOT REMOVE THIS

const CoinTimeSeries = (props) => {
    const [active, setActive] = useState(cryptoIntervals[0]);
    const [chart, setChart] = useState(cryptoTimeSeriesCharts.candlestick)
    const dispatch = useDispatch();
    let coinOHCLData = useSelector((state) => state.cryptocurrenciesReducer.coinOHCLData, shallowEqual)
    let coinMarketChartData = useSelector((state) => state.cryptocurrenciesReducer.coinMarketChartData, shallowEqual)

    useEffect(() => {
        if (chart === cryptoTimeSeriesCharts.candlestick) {
            dispatch(actions.fetchCoinOHCLData(props.coinId, active.interval))
        } else {
            dispatch(actions.fetchCoinMarketChartData(props.coinId, active.interval))
        }
        return function cleanup() {
            dispatch(actions.cleanUpCoinOHCLTimeSeries())
            dispatch(actions.cleanUpCoinMarketChartTimeSeries())
        }
    }, [active, chart, dispatch])

    const timeSeriesCryptoOptions = useMemo(() => {
        return {
            maintainAspectRatio: false,
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
                    display: true,
                    ticks: {
                        beginAtZero: false,
                        minTicksLimit: 3,
                        maxTicksLimit: 20
                    },
                    gridLines: {
                        drawBorder: true,
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
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            zoom: {
                drag: false,
                enabled: true,
                mode: "yx",
                rangeMin: {
                    x: 0,
                    y: 0
                },
                rangeMax: {
                    x: 100000,
                    y: 100000
                }
            },
            pan: {
                enabled: true,
                mode: "xy"
            }
        }
    }, [])


    const renderTimeSeries = cryptoIntervals.map((t) => (
        <li key={t.label} className="nav-item">
            <button className={`nav-link ${active.label === t.label ? 'active' : ''}`} onClick={() => setActive(t)}
                    data-toggle="tab" role="tab" aria-selected="false">{t.label}</button>
        </li>
    ))

    const renderChart =
        chart === cryptoTimeSeriesCharts.candlestick ?
            <ReactApexChart
                options={{}}
                series={coinOHCLData}
                type="candlestick"
                height={500}
            /> : <Line data={coinMarketChartData.chartData} options={timeSeriesCryptoOptions} height={500}
                       datasetKeyProvider={datasetKeyProvider}
            />

    const renderCandlestickIcon = chart === cryptoTimeSeriesCharts.candlestick ?
        <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAbUlEQVRIiWNgGHFA70zhf70zhf+JVc9ES8cwMDAwMBKrEJerL5n04zWD5j4YtYB0C0hNhiRbQG0AT2LEJkOYOmLF6e8DmAtwuQgdEPL50E+mLOgC1EyiDAz09AGpkUssoLkPqAZwFTFDxwcDBgC4yDKiS/O5DwAAAABJRU5ErkJggg==" alt=""/>
        : <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAbUlEQVRIiWNgGHHA2Nj4v7Gx8X9i1TPR0jEMDAwMjMQqxOXqs2fP4jWD5j4YtYB0C0hNhiRbQG0AT2LEJkOYOmLF6e8DmAtwuQgdEPL50E+mLOgC1EyiDAz09AGpkUssoLkPqAZwFTFDxwcDBgA6ey220zLCoAAAAABJRU5ErkJggg==" alt=""/>


    const renderLineIcon = chart === cryptoTimeSeriesCharts.candlestick ?
        <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACWElEQVRIib2VPUiVYRTHf+cmIkWCS0ZOgUEtV33Ps8R1uK0ODpXdQXALghKqJQgaGnTrS2gqgsgya4qWBgcjLIL3ea8IDSUtOTXGvYZx856Ge5X3fote+0+H95znf77ecw6Uoarf2AckYvKJdhCq6rSq5p1zU9UO9oxkMnkIuA5kzGwSoKPZgyAI+kVkFHjjvf/exFSCIBgXkWkgC7w0swctHYjIO+AzcElVB733v6tthoaGTicSifsAxWIxk81mP8X1TR0AfwEDjgI/VXUZWBSRHjObAL4AfWZ2M4qi52XbCjTsgaoGQA+wvLm5mQR6E4nEbQAzuygiGWCwUCiciqJoth55wwxU9SAwKyJXwzCci6kWgIUgCAR4ZWZ3VlZW1ltUYZvUYvJD59yzHT1sgZoSOedGgBEzu7IbwqZzkEwmj5jZIzOb8N7/2lXIMCkiF7bmoMJBZ2fnY+BpFEUf6kXTCs65a8AfM3thZjNQ1WQzOwaci326TGkqXwO3gGI94nQ63ZHL5WbMLAUE3vsfW7qKDERk3HtfKEeTpvTrzQFrqroYBEF/NXkqlTqcz+ffisjxrq6u4Th5jYMwDL8CqOqwmc2b2Vnvfbf3/qSZzYrIR1W9MTY2dgBgYGCgb2Nj472ZrZnZ6NLSUq46ANkSVNW89+KcS5vZvIhkwjBcjBuXd9MTSpPdCxREZCoMw3v1SlfjQETONCKPZ62q68B5YM57392IvKZEOyAHKIrIXUobc6YZeQVU1cqN3R/EV0U70daLVg9SPvZtucd1sLot/Y8SrTa02gP+AalHAYBgQE5hAAAAAElFTkSuQmCC"
            alt="Candle chart"/>
        : <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACp0lEQVRIib2VPWhTYRSGn3PTVLFa6KJiJ6GiUnIbmmQQO9TVoYN/GQrdLIIo91ZRUIQ4WPCvSQouKoJYrT+TuDgUrCiK5N7a3NqhioudXIpBK9bYe1waTdKk1bb6TufjnPOec97D930wB9Ox3/IPYBTZW1aC0HSsXtOxv5gZ+1x5geWTZ4/XgfQYaBzhCEDNQgnNrt1Uo9IxS+Dhm+jF91UDFWkZ6enU/Gwv8NpH7iKaXrRAQPWxwiuDH4ciTnfYjV79Wh4TGrF2iCspRVFD42OtqZfF/gULgPwQRBXdmKfuo+lYo4IMo9Kgol3AOD6NInIq29p3G0HLGaruwHSsVqBB8UeNgJpBpjeoylkAFT2oqnEgTDCwPRvpG6hEXnWCiNO9Jo8MoGp5sdRgkWsIGDJdSwS5j+hlr+XS9MIq/OrY1iL7Sihj3/qjxEUwb4JQpmc36O5aqQ0vhdB0rF6QoyhpL5Y8XbIDM3t8vYh/DaHLjZ7PLa1nOaIqBwr3oHTJ32evAze9SPJZoZviW7kYQhnbBmZE9A6i/VAukbApyNe9haMihwNo3Bd5gCbOIAm/EnH7k0TN1LpP/cDOWfzW8Wj6Q8FXOoH6nW70ah4gnLHaBdRHBoFJ080NN7t2Uzn51ucn1k2tzT1CZfPMt2BbMfm8Al4sPQHQ4hxr80XuIbrHiybrvUhymwoDAeVFyOk5uf/+/gBAy6jduGp1/inCZFCmOybaLnwub0AKhunY6kWTEs5Y7b7IPUM1PhpLDRcHN7t2U0C5AWxU2CCQV+XcWCyZrCTdvAKG6q5q5L9lTBimm5s20H0+MuhFk/XVyOdJtCg5gCR8lL65F7N/IfISmI6t4YzV/scJf4vip2IlsaI/WiXI3Ge/Iv9xBbz7Zf0Pid5VjVoGfgKJzheUK44zzgAAAABJRU5ErkJggg=="
            alt="Line chart"/>

    const onCandleChartClicked = () => {
        if (chart !== cryptoTimeSeriesCharts.candlestick) {
            setChart(cryptoTimeSeriesCharts.candlestick)
        }
    }

    const onLineChartClicked = () => {
        if (chart !== cryptoTimeSeriesCharts.line) {
            setChart(cryptoTimeSeriesCharts.line)
        }
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <button className="btn btn-light border-right rounded-0 p-3"
                            onClick={onCandleChartClicked}>{renderCandlestickIcon}</button>
                    <button className="btn btn-light rounded-0 p-3"
                            onClick={onLineChartClicked}>{renderLineIcon}</button>
                </div>

                <ul className="nav nav-tabs justify-content-end" role="tablist">
                    {renderTimeSeries}
                </ul>

                <div className="h-100 w-100">
                    {renderChart}
                </div>

            </div>
        </div>
    );
}

CoinTimeSeries.propTypes = {
    coinId: PropTypes.string
}

export default CoinTimeSeries;
