import React, {useMemo} from "react";
import {Line} from "react-chartjs-2";
import {datasetKeyProvider} from "../../../../shared/utils/utils";
import PropTypes from "prop-types";
import {Spinner} from "react-bootstrap";

const MostPopularStocksItem = (props) => {

    const areaOptions = useMemo(() => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    display: false
                }],
                xAxes: [{
                    display: false
                }]
            },
            legend: {
                display: false
            },
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    tension: 0
                }
            }
        }
    }, [])
    return (
        <div className={`col-xl-3 col-lg-6 col-sm-6 mt-md-0 mt-4 ${props.loading ? "text-center" : ""} grid-margin-xl-0 grid-margin`}>
            {!props.loading && Object.keys(props.stock.chartData).length !== 0 ? <div className="d-flex">
                <div className="wrapper">
                    <h4 className="mb-0 font-weight-semibold">{props.stock.name}</h4>
                    <h5 className={`mb-0 font-weight-medium ${props.stock.stockPercentage < 0 ? "text-danger" : "text-success"}`}>{`${props.stock.stockPercentage}%`}</h5>
                    <p className="mb-0 text-muted">{Object.keys(props.stock.chartData).length !== 0 ? props.stock.chartData.datasets[0].data[9] : 0} USD</p>
                </div>
                <div className="wrapper my-auto ml-auto ml-lg-4">
                    <Line data={props.stock.chartData}
                              options={areaOptions}
                              datasetKeyProvider={datasetKeyProvider}
                              height={50}
                              width={100}  />
                </div>
            </div> : <Spinner variant={'primary'} animation="border" style={{width: "60px", height: "60px"}} />}
        </div>
    )
}

MostPopularStocksItem.propTypes = {
    loading: PropTypes.bool,
    stock: PropTypes.object
}

export default MostPopularStocksItem;
