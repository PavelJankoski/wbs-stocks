import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions/index';
import PropTypes from "prop-types";
import stockIntervals from "../../../shared/objects/stockIntervals";
import ReactApexChart from "react-apexcharts";
import * as Zoom from "chartjs-plugin-zoom" //DO NOT REMOVE THIS
import {Spinner} from "react-bootstrap";

const StockTimeSeries = (props) => {
    const chartType = {
        candlestick: "candlestick",
        line: "line"
    }
    const [activeRange, setActiveRange] = useState(stockIntervals[0]);
    const [chart, setChart] = useState(chartType.candlestick)
    const dispatch = useDispatch();
    let stockChartData = useSelector((state) => state.stocksReducer.stockHistoricalPrices, shallowEqual)

    useEffect(() => {
        dispatch(actions.fetchStockHistoricalPrices(props.selectedStock, activeRange.interval, chart === chartType.line))

        return function cleanup() {
            dispatch(actions.cleanUpStockHistoricalPrices())
        }
    }, [activeRange, chart, dispatch])

    const renderSpinner = () => {
        return <div className="col d-flex justify-content-center align-items-center h-100">
            <Spinner variant={'primary'} animation="border" style={{width: "60px", height: "60px"}}/>
        </div>
    }

    const renderTimeSeries = stockIntervals.map((t) => (
        <li key={t.label} className="nav-item">
            <button className={`nav-link ${activeRange.label === t.label ? 'active' : ''}`}
                    onClick={() => setActiveRange(t)}
                    data-toggle="tab" role="tab" aria-selected="false">{t.label}</button>
        </li>
    ))

    const renderChart =
        chart === chartType.candlestick ?
            <ReactApexChart
                options={{
                    xaxis: {
                        show: false,
                        labels: {
                            show: false
                        }
                    }
                }}
                series={stockChartData.data}
                type="candlestick"
                height={400}
            /> :
            <ReactApexChart options={{
                xaxis: {
                    show: false,
                    labels: {
                        show: false
                    }
                }
            }} series={stockChartData.data} type="line" height={400}/>


    const renderCandlestickIcon = chart === chartType.candlestick ?
        <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAbUlEQVRIiWNgGHFA70zhf70zhf+JVc9ES8cwMDAwMBKrEJerL5n04zWD5j4YtYB0C0hNhiRbQG0AT2LEJkOYOmLF6e8DmAtwuQgdEPL50E+mLOgC1EyiDAz09AGpkUssoLkPqAZwFTFDxwcDBgC4yDKiS/O5DwAAAABJRU5ErkJggg=="
            alt=""/>
        : <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAbUlEQVRIiWNgGHHA2Nj4v7Gx8X9i1TPR0jEMDAwMjMQqxOXqs2fP4jWD5j4YtYB0C0hNhiRbQG0AT2LEJkOYOmLF6e8DmAtwuQgdEPL50E+mLOgC1EyiDAz09AGpkUssoLkPqAZwFTFDxwcDBgA6ey220zLCoAAAAABJRU5ErkJggg=="
            alt=""/>


    const renderLineIcon = chart === chartType.candlestick ?
        <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACWElEQVRIib2VPUiVYRTHf+cmIkWCS0ZOgUEtV33Ps8R1uK0ODpXdQXALghKqJQgaGnTrS2gqgsgya4qWBgcjLIL3ea8IDSUtOTXGvYZx856Ge5X3fote+0+H95znf77ecw6Uoarf2AckYvKJdhCq6rSq5p1zU9UO9oxkMnkIuA5kzGwSoKPZgyAI+kVkFHjjvf/exFSCIBgXkWkgC7w0swctHYjIO+AzcElVB733v6tthoaGTicSifsAxWIxk81mP8X1TR0AfwEDjgI/VXUZWBSRHjObAL4AfWZ2M4qi52XbCjTsgaoGQA+wvLm5mQR6E4nEbQAzuygiGWCwUCiciqJoth55wwxU9SAwKyJXwzCci6kWgIUgCAR4ZWZ3VlZW1ltUYZvUYvJD59yzHT1sgZoSOedGgBEzu7IbwqZzkEwmj5jZIzOb8N7/2lXIMCkiF7bmoMJBZ2fnY+BpFEUf6kXTCs65a8AfM3thZjNQ1WQzOwaci326TGkqXwO3gGI94nQ63ZHL5WbMLAUE3vsfW7qKDERk3HtfKEeTpvTrzQFrqroYBEF/NXkqlTqcz+ffisjxrq6u4Th5jYMwDL8CqOqwmc2b2Vnvfbf3/qSZzYrIR1W9MTY2dgBgYGCgb2Nj472ZrZnZ6NLSUq46ANkSVNW89+KcS5vZvIhkwjBcjBuXd9MTSpPdCxREZCoMw3v1SlfjQETONCKPZ62q68B5YM57392IvKZEOyAHKIrIXUobc6YZeQVU1cqN3R/EV0U70daLVg9SPvZtucd1sLot/Y8SrTa02gP+AalHAYBgQE5hAAAAAElFTkSuQmCC"
            alt="Candle chart"/>
        : <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACp0lEQVRIib2VPWhTYRSGn3PTVLFa6KJiJ6GiUnIbmmQQO9TVoYN/GQrdLIIo91ZRUIQ4WPCvSQouKoJYrT+TuDgUrCiK5N7a3NqhioudXIpBK9bYe1waTdKk1bb6TufjnPOec97D930wB9Ox3/IPYBTZW1aC0HSsXtOxv5gZ+1x5geWTZ4/XgfQYaBzhCEDNQgnNrt1Uo9IxS+Dhm+jF91UDFWkZ6enU/Gwv8NpH7iKaXrRAQPWxwiuDH4ciTnfYjV79Wh4TGrF2iCspRVFD42OtqZfF/gULgPwQRBXdmKfuo+lYo4IMo9Kgol3AOD6NInIq29p3G0HLGaruwHSsVqBB8UeNgJpBpjeoylkAFT2oqnEgTDCwPRvpG6hEXnWCiNO9Jo8MoGp5sdRgkWsIGDJdSwS5j+hlr+XS9MIq/OrY1iL7Sihj3/qjxEUwb4JQpmc36O5aqQ0vhdB0rF6QoyhpL5Y8XbIDM3t8vYh/DaHLjZ7PLa1nOaIqBwr3oHTJ32evAze9SPJZoZviW7kYQhnbBmZE9A6i/VAukbApyNe9haMihwNo3Bd5gCbOIAm/EnH7k0TN1LpP/cDOWfzW8Wj6Q8FXOoH6nW70ah4gnLHaBdRHBoFJ080NN7t2Uzn51ucn1k2tzT1CZfPMt2BbMfm8Al4sPQHQ4hxr80XuIbrHiybrvUhymwoDAeVFyOk5uf/+/gBAy6jduGp1/inCZFCmOybaLnwub0AKhunY6kWTEs5Y7b7IPUM1PhpLDRcHN7t2U0C5AWxU2CCQV+XcWCyZrCTdvAKG6q5q5L9lTBimm5s20H0+MuhFk/XVyOdJtCg5gCR8lL65F7N/IfISmI6t4YzV/scJf4vip2IlsaI/WiXI3Ge/Iv9xBbz7Zf0Pid5VjVoGfgKJzheUK44zzgAAAABJRU5ErkJggg=="
            alt="Line chart"/>

    const onCandleChartClicked = () => {
        if (chart !== chartType.candlestick) {
            setChart(chartType.candlestick)
        }
    }

    const onLineChartClicked = () => {
        if (chart !== chartType.line) {
            setChart(chartType.line)
        }
    }

    return (
        <div style={{height: "500px"}}>
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
                {stockChartData.loading ? renderSpinner() : renderChart}
            </div>
        </div>
    )
}

StockTimeSeries.propTypes = {
    selectedStock: PropTypes.object
}

export default StockTimeSeries;
