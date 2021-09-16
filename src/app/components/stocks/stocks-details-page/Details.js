import React, {useEffect, useMemo} from "react";
import * as actions from "../../../store/actions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Line} from "react-chartjs-2";
import {datasetKeyProvider} from "../../../shared/utils/utils";

import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import NumberFormat from "react-number-format";
import CompanyWikiLinks from "./CompanyWikiLinks";
import {Spinner} from "react-bootstrap";
import RecommendationTrends from "./RecommendationTrends";
import {cleanUpCoinDetails} from "../../../store/actions";

const Details = (props) => {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.stocksReducer.detailsData, shallowEqual);
    const stockDetails = useSelector((state) => state.stocksReducer.detailsStockData, shallowEqual);
    const eps = useSelector((state) => state.stocksReducer.epsCompany, shallowEqual);
    const reports = useSelector((state) => state.stocksReducer.reportsData, shallowEqual);
    const productsWikiLinks = useSelector((state) => state.stocksReducer.productsWikiLinks.data, shallowEqual);
    const productsWikiLinksLoading = useSelector((state) => state.stocksReducer.productsWikiLinks.loading, shallowEqual);
    const servicesWikiLinks = useSelector((state) => state.stocksReducer.servicesWikiLinks.data, shallowEqual);
    const servicesWikiLinksLoading = useSelector((state) => state.stocksReducer.servicesWikiLinks.loading, shallowEqual);
    const developmentsWikiLinks = useSelector((state) => state.stocksReducer.developmentsWikiLinks.data, shallowEqual);
    const developmentsWikiLinksLoading = useSelector((state) => state.stocksReducer.developmentsWikiLinks.loading, shallowEqual);
    const designsWikiLinks = useSelector((state) => state.stocksReducer.designsWikiLinks.data, shallowEqual);
    const designsWikiLinksLoading = useSelector((state) => state.stocksReducer.designsWikiLinks.loading, shallowEqual);
    const recommendationTrends = useSelector((state) => state.stocksReducer.recommendationTrends, shallowEqual);
    const recommendationTrendsLoading = useSelector((state) => state.stocksReducer.recommendationTrendsLoading, shallowEqual);

    const renderSpinner = <div className="h-100 d-flex align-self-center align-items-center justify-content-center">
        <Spinner
            variant={'primary'} animation="border" style={{width: "100px", height: "100px"}}/></div>


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

    useEffect(() => {
        dispatch(actions.fetchCompanyRecommendationTrends(props.match.params.symbol));
    }, [dispatch])

    useEffect(() => {
        if (details?.name !== undefined) {

            dispatch(actions.fetchCompanyProductsWikiLinks(details.name));
            dispatch(actions.fetchCompanyServicesWikiLinks(details.name));
            dispatch(actions.fetchCompanyDevelopmentsWikiLinks(details.name));
            dispatch(actions.fetchCompanyDesignsWikiLinks(details.name))
        }
        return function cleanup() {
            dispatch(actions.cleanUpCompanyServicesWikiLinks())
            dispatch(actions.cleanUpCompanyProductsWikiLinks())
            dispatch(actions.cleanUpCompanyDesignsWikiLinks())
            dispatch(actions.cleanUpCompanyDevelopmentsWikiLinks())
        }
    }, [dispatch, details])

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
        height: '40%',
        marginTop: '10px'
    };
    const firstRow = {
        marginTop: '10px',
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
                    <h1 className="font-weight-medium">{details.name}</h1>
                    <div className="row">
                        <div className="col">
                            <img style={styleImg} src={details.logo} alt="logo"/>
                        </div>

                        <div className="col-sm" style={{marginTop: "40px"}}>

                            <div><span><b>Country: </b></span>{details.country}</div>
                            <div style={{marginTop: '10px'}}><span><b>Industry: </b></span>{details.finnhubIndustry}
                            </div>
                            <div style={{marginTop: '10px'}}><span><b>Currency: </b></span>{details.currency}</div>
                            <div style={{marginTop: '10px'}}><span><b>Website:</b> </span><a
                                href={details.weburl}>{details.weburl}</a></div>

                        </div>
                        <div className="col-sm" style={{marginTop: "40px"}}>
                            <div><span><b>Exchange: </b></span>{details.exchange}</div>
                            <div style={{marginTop: '10px'}}>
                                <span><b>Share Outstanding: </b></span>{details.shareOutstanding}</div>
                            <div style={{marginTop: '10px'}}><span><b>Initial Public Offering: </b></span>{details.ipo}
                            </div>
                            <div style={{marginTop: '10px'}}><span><b>Market Capitalization: </b></span> <NumberFormat
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
                        <div className="card-body">
                            <h3>About Us</h3>
                            <div style={{
                                textAlign: 'left',
                                fontSize: '1.2em',
                                marginLeft: '2px'
                            }}>{stockDetails.Description}</div>
                        </div>

                    </div>
                </div>
                <div className="col-md-5 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3>Annual Reports for Last Year</h3>
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
                                            value={reports.annualReports[0].netIncome} decimalScale={2}
                                            displayType={'text'}
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
                                        <TableCell align="left" style={{fontWeight: 'bold'}}>Operating
                                            income</TableCell>
                                        <TableCell align="left" style={{fontWeight: 'bold'}}> <NumberFormat
                                            value={reports.annualReports[0].operatingIncome} decimalScale={2}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'$'}/></TableCell>
                                    </TableRow>
                                    <TableRow style={{fontWeight: 'bold'}}>
                                        <TableCell align="left" style={{fontWeight: 'bold'}}>Income Before
                                            tax</TableCell>
                                        <TableCell align="left" style={{fontWeight: 'bold'}}>
                                            <NumberFormat value={reports.annualReports[0].incomeBeforeTax}
                                                          decimalScale={2}
                                                          displayType={'text'} thousandSeparator={true}
                                                          prefix={'$'}/></TableCell>
                                    </TableRow>
                                    <TableRow style={{fontWeight: 'bold'}}>
                                        <TableCell align="left" style={{fontWeight: 'bold'}}>income tax
                                            expense</TableCell>
                                        <TableCell align="left" style={{fontWeight: 'bold'}}>
                                            <NumberFormat value={reports.annualReports[0].incomeTaxExpense}
                                                          decimalScale={2}
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
            </div>
            <div className="row">
                <div className="col-xl-7">
                    <div className="card">
                        <div className="card-body">
                            <h3>Earnings Per Share(EPS)</h3>
                            <div>
                                <Line data={eps.chartData}
                                      options={timeSeriesStockOptions}
                                      datasetKeyProvider={datasetKeyProvider}
                                      height={200}/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-5 mt-xl-0 mt-4">
                    <div className="card">
                        <div className="card-body">
                            {recommendationTrendsLoading ? renderSpinner :
                                <RecommendationTrends data={recommendationTrends}/>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            {productsWikiLinksLoading ? renderSpinner :
                                <CompanyWikiLinks wikiLinks={productsWikiLinks} title="Products:"/>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            {servicesWikiLinksLoading ? renderSpinner :
                                <CompanyWikiLinks wikiLinks={servicesWikiLinks} title="Services:"/>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            {developmentsWikiLinksLoading ? renderSpinner :
                                <CompanyWikiLinks wikiLinks={developmentsWikiLinks} title="Developments:"/>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-body">
                            {designsWikiLinksLoading ? renderSpinner :
                                <CompanyWikiLinks wikiLinks={designsWikiLinks} title="Designs:"/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Details