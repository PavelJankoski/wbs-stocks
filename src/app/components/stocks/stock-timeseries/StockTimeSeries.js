import React, {useState} from "react";
import {Line} from "react-chartjs-2";
import {datasetKeyProvider} from "../../../shared/utils/utils";

const StockTimeSeries = () => {
    const colors = {
        success: {
            borderColor: 'rgb(107,213,169)',
            backgroundColor: 'rgba(107,213,169, 0.1)'
        },
        error: {
            borderColor: 'rgb(255,98,88)',
            backgroundColor: 'rgba(255,98,88, 0.1)'
        }
    }
    const salesStatisticsData = {
        labels: ["Jan 1", "Jan 7", "Jan 14", "Jan 21", "Jan 28", "Feb 4", "Feb 11", "Feb 18"],
        datasets: [{
            label: 'Revenue',
            data: [60, 75, 65, 130, 130, 145, 110, 145, 155, 149, 170],
            borderColor: colors.success.borderColor,
            backgroundColor: colors.success.backgroundColor,
            borderWidth: 2,
            fill: true
        }]
    }
    const [active, setActive] = useState(0);

    const salesStaticsOptions = {
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
                ticks: {
                    max: 200,
                    min: 0,
                    stepSize: 50,
                    fontColor: "#8b9298",
                    beginAtZero: false
                },
                gridLines: {
                    color: "#f8f8f8",
                    zeroLineColor: "#f8f8f8",
                    display: true,
                    drawBorder: false
                }
            }]
        }
    };
    const timeSeries = ['1D', '1W', '1M', '1Y'];

    const renderTimeSeries = timeSeries.map((t, idx) => (
        <li className="nav-item">
            <button className={`nav-link ${active === idx ? 'active': ''}`} onClick={() => setActive(idx)} data-toggle="tab" role="tab" aria-selected="false">{t}</button>
        </li>
    ))


    return (
        <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="mb-0 font-weight-medium">AAPL INC</h4>
                    <div className="d-xl-flex flex-column flex-lg-row">
                        <p>O: <span className="text-info">146.2</span> H: <span className="text-info">146.2</span> L: <span className="text-info">146.2</span> C: <span className="text-info">146.2</span></p>
                        <ul className="nav nav-tabs sales-mini-tabs ml-lg-auto mb-4 mb-md-0" role="tablist">
                            {renderTimeSeries}
                        </ul>
                    </div>
                        <div className="data-wrapper d-flex mt-2 mt-lg-0">
                            <div className="wrapper mb-4">
                                <h5 className="mb-0">Change (%)</h5>
                                <div className="d-xl-flex align-items-center">
                                    <h4 className="font-weight-semibold text-success">1,26%</h4>
                                </div>
                            </div>
                        </div>
                    <Line data={salesStatisticsData} options={salesStaticsOptions}  datasetKeyProvider={datasetKeyProvider} height={50} width={100}/>
                </div>
            </div>
        </div>
    )
}

export default StockTimeSeries;
