import React from "react";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import NumberFormat from "react-number-format";

const TopStockItem = (props) => {
    return (
        <div className="row align-items-center">
            <div className="col-2">
                <p className="m-0">{props.index} <Image src={"https://storage.googleapis.com/iex/api/logos/AAPL.png"} roundedCircle alt={"Stock icon"}
                                                        style={{width: "50px", height: "50px"}}/></p>
            </div>

            <div className="col-8">
                <h4 className="font-weight-semibold">{props.stock.companyName} <small className="text-muted">{props.stock.symbol}</small></h4>
            </div>

            <div className="col-2">
                <h5 className={`font-weight-medium ${props.stock.changePercent < 0 ? "text-danger" : "text-success"}`}>
                    <NumberFormat value={props.stock.changePercent} decimalScale={3} displayType={'text'}
                                  thousandSeparator={true} suffix={'%'}/></h5>
            </div>
        </div>
    )
}

TopStockItem.propTypes = {
    index: PropTypes.number,
    stock: PropTypes.object
}

export default TopStockItem;
