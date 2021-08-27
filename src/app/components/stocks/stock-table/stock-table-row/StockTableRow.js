import React from "react";
import PropTypes from "prop-types";
import {formatStringToDecimal} from "../../../../shared/utils/utils";

const StockTableRow = (props) => {
    return (
        <tr onClick={props.handleOnTableRowClick}
            style={{backgroundColor: props.isSelected ? "#f3f3f3" : "", cursor: "pointer"}}>
            <td>
                <p className="mb-1 text-dark font-weight-medium">{props.shortName}</p><small
                className="font-weight-medium">{props.name}</small>
            </td>
            <td className="font-weight-medium">${formatStringToDecimal(props.lastPrice)}</td>
            <td className={`${props.change >= 0 ? "text-success" : "text-danger"} font-weight-medium`}>{props.change}%</td>
        </tr>
    )
}

StockTableRow.propTypes = {
    shortName: PropTypes.string,
    name: PropTypes.string,
    lastPrice: PropTypes.number,
    change: PropTypes.number,
    isSelected: PropTypes.bool,
    handleOnTableRowClick: PropTypes.func
}

export default StockTableRow
