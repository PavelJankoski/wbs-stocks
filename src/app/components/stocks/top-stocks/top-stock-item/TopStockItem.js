import React from "react";
import PropTypes from "prop-types";
import {Badge, Image} from "react-bootstrap";
import NumberFormat from "react-number-format";

const TopStockItem = (props) => {
    return (
        <div className="row align-items-center mb-2">
            <div className="col-2">
                <p className="m-0 font-weight-semibold text-truncate">{props.index} <Image
                    src={`${props.stock.logo !== null ? props.stock.logo : require("../../../../../assets/images/placeholder.jpg")}`}
                    alt={"Stock icon"}
                    style={{width: "38px", height: "38px"}} className="ml-2"/></p>
            </div>

            <div className="col-8">
                <h4 className="font-weight-semibold">{props.stock.companyName} <small
                    className="text-muted">{props.stock.symbol}</small></h4>
            </div>

            <div className="col-2">
                <h4>
                    <span className={`badge ${props.stock.changePercent < 0 ? "badge-danger" : "badge-success"} p-2`} style={{color: "white"}}>
                        <NumberFormat value={props.stock.changePercent} decimalScale={3} displayType={'text'}
                                      thousandSeparator={true} suffix={'%'}/>
                    </span>
                </h4>
            </div>
        </div>
    )
}

TopStockItem.propTypes = {
    index: PropTypes.number,
    stock: PropTypes.object
}

export default TopStockItem;
