import React from "react";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";

const StockTableRow = (props) => {
    return (
        <tr onClick={props.handleOnTableRowClick}
            style={{backgroundColor: props.isSelected ? "#f3f3f3" : "", cursor: "pointer"}}>
            <td>
                <p className="mb-1 text-dark font-weight-medium">
                    <Image
                        src={props.logoUrl}
                        alt={"Stock icon"}
                        style={{width: "38px", height: "38px"}} className="mr-2"/>
                    {props.symbol}
                </p>
            </td>
            <td><p className="font-weight-medium">{props.name}</p></td>
            <td><p className="font-weight-medium">{props.exchange}</p></td>
        </tr>
    )
}

StockTableRow.propTypes = {
    symbol: PropTypes.string,
    name: PropTypes.string,
    exchange: PropTypes.string,
    logoUrl: PropTypes.string,
    handleOnTableRowClick: PropTypes.func
}

export default StockTableRow
