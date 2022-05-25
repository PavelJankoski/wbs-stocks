import React from "react";
import {Bar} from "react-chartjs-2";
import {datasetKeyProvider} from "../../../shared/utils/utils";
import PropTypes from "prop-types";

const RecommendationTrends = (props) => {

    const marketingOverviewOptions = {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 0
            }
        },
        pan: {
            enabled: true,
            mode: "xy"
        },
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    display: true,
                    beginAtZero: true,
                    fontColor: "#b9b8b8",
                    stepSize: 100
                },
                gridLines: {
                    display: false,
                    color: "#dde4eb",
                    zeroLineColor: "#dde4eb"
                }
            }],
            xAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    fontColor: "#b9b8b8",
                    color: "#dde4eb",
                    zeroLineColor: "#dde4eb"
                },
                gridLines: {
                    display: true,
                    color: "#dde4eb",
                    zeroLineColor: "#dde4eb"
                },
            }]
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };
    return (
        <div>
            <h3>Recommendation Trends</h3>
            <Bar data={props.data} options={marketingOverviewOptions} datasetKeyProvider={datasetKeyProvider}/>
        </div>

    )
}

RecommendationTrends.propTypes = {
    data: PropTypes.object}

export default RecommendationTrends;