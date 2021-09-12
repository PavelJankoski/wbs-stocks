import React, {useEffect, useMemo} from "react";
import * as actions from "../../../store/actions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Line} from "react-chartjs-2";
import {datasetKeyProvider} from "../../../shared/utils/utils";

import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import NumberFormat from "react-number-format";

const Details = (props) => {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.stocksReducer.detailsData, shallowEqual);
    const stockDetails = useSelector((state) => state.stocksReducer.detailsStockData, shallowEqual);
    const eps = useSelector((state) => state.stocksReducer.epsCompany, shallowEqual);
    const reports = useSelector((state) => state.stocksReducer.reportsData, shallowEqual);
    useEffect(() => {
        dispatch(actions.getBasicDetails(props.match.params.symbol));

    }, [dispatch])
    useEffect(() => {
        dispatch(actions.getStockDetails(props.match.params.symbol));
    }, [dispatch])
    useEffect(() => {
        dispatch(actions.epsCompanyPerYear(props.match.params.symbol));
    }, [dispatch])

    useEffect(() => {
        dispatch(actions.fetchAnnualReports(props.match.params.symbol));
    }, [dispatch])

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

    const divStyle = {
        width: '85%',
        height: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px'
    };
    const firstRow = {
        marginTop: '10px',
        marginLeft: '110px',

    }
    const styleImg = {
        width: '200px',
        height: '200px',
        marginBottom: '20px'
    }

    return (
        <div>
            <div className="card" style={divStyle}>
                <div className="card-body">
                    <h1 className="page-title font-weight-medium">{details.name}</h1>
                    <div className="row">
                        <div className="col">
                            <img style={styleImg} src={details.logo} alt="logo"/>
                        </div>

                        <div className="col-sm" style={{marginRight:'200px',marginTop:"40px"}}>

                            <div><span><b>Country: </b></span>{details.country}</div>
                            <div style={{marginTop:'10px'}}><span><b>Industry: </b></span>{details.finnhubIndustry}</div>
                            <div style={{marginTop:'10px'}}><span><b>Currency: </b></span>{details.currency}</div>
                            <div style={{marginTop:'10px'}}><span><b>Website:</b> </span><a
                                href={details.weburl}>{details.weburl}</a></div>

                        </div>
                        <div className="col-sm" style={{marginRight:'300px',marginTop:"40px"}}>
                            <div><span><b>Exchange: </b></span>{details.exchange}</div>
                            <div style={{marginTop:'10px'}}>
                                <span><b>Share Outstanding: </b></span>{details.shareOutstanding}</div>
                            <div style={{marginTop:'10px'}}><span><b>Initial Public Offering: </b></span>{details.ipo}
                            </div>
                            <div style={{marginTop:'10px'}}><span><b>Market Capitalization: </b></span> <NumberFormat
                                value={details.marketCapitalization} decimalScale={2}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}/></div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={firstRow}>
                <div className="col-md-7 grid-margin stretch-card">
                    <div className="card">
                        <h4 style={{marginLeft: '10px', marginTop: "10px"}}>About Us</h4>
                        <div style={{
                            textAlign: 'left',
                            fontSize: '1.2em',
                            marginLeft: '2px'
                        }}>{stockDetails.Description}</div>
                    </div>
                </div>
                <div className="col-md-4 grid-margin stretch-card">
                    <div className="card">
                        <h4 style={{marginLeft: "10px", marginTop: "10px"}}>Annual Reports for Last Year</h4>
                        {reports.annualReports &&
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Details</TableCell>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Values</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Cost of revenue</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}} align="left"> <NumberFormat
                                        value={reports.annualReports[0].costOfRevenue} decimalScale={2}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}/></TableCell>
                                </TableRow>
                                <TableRow style={{fontWeight: 'bold'}}>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Gross Profit</TableCell>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}> <NumberFormat
                                        value={reports.annualReports[0].grossProfit} decimalScale={2}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}/></TableCell>
                                </TableRow>
                                <TableRow style={{fontWeight: 'bold'}}>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Net income</TableCell>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}> <NumberFormat
                                        value={reports.annualReports[0].netIncome} decimalScale={2} displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}/></TableCell>
                                </TableRow>
                                <TableRow style={{fontWeight: 'bold'}}>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Total Revenue</TableCell>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}> <NumberFormat
                                        value={reports.annualReports[0].totalRevenue} decimalScale={2}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}/></TableCell>
                                </TableRow>
                                <TableRow style={{fontWeight: 'bold'}}>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Operating income</TableCell>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}> <NumberFormat
                                        value={reports.annualReports[0].operatingIncome} decimalScale={2}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}/></TableCell>
                                </TableRow>
                                <TableRow style={{fontWeight: 'bold'}}>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>Income Before tax</TableCell>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>
                                        <NumberFormat value={reports.annualReports[0].incomeBeforeTax} decimalScale={2}
                                                      displayType={'text'} thousandSeparator={true}
                                                      prefix={'$'}/></TableCell>
                                </TableRow>
                                <TableRow style={{fontWeight: 'bold'}}>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>income tax expense</TableCell>
                                    <TableCell align="left" style={{fontWeight: 'bold'}}>
                                        <NumberFormat value={reports.annualReports[0].incomeTaxExpense} decimalScale={2}
                                                      displayType={'text'} thousandSeparator={true}
                                                      prefix={'$'}/>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                        }
                    </div>
                </div>
            </div>
            <div className="row" style={{marginLeft: '110px'}}>
                <div className="col-7">
                    <div className="card">
                        <h4 style={{marginLeft: "10px", marginTop: "10px"}}>Earnings Per Share(EPS)</h4>
                        <div>
                            <Line data={eps.chartData}
                                  options={timeSeriesStockOptions}
                                  datasetKeyProvider={datasetKeyProvider}
                                  height={50}
                                  width={100}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Details