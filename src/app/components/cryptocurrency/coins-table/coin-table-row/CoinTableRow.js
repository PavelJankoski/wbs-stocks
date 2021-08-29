import React from "react";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import NumberFormat from 'react-number-format';


const CoinTableRow = (props) => {
    return (
        <tr onClick={props.handleOnTableRowClick} style={{cursor: "pointer"}}>
            <td><Image src={props.coinIcon} alt={"Coin icon"}/></td>
            <td>
                <p className="mb-1 text-dark font-weight-semibold">{props.symbol.toUpperCase()}</p>
                <p className="font-weight-medium m-0">{props.name}</p>
            </td>
            <td className="font-weight-medium">
                <NumberFormat value={props.lastPrice} decimalScale={2} displayType={'text'} thousandSeparator={true}
                              prefix={'$'}/>
            </td>
            <td className={`${props.priceChangePercentage1h >= 0 ? "text-success" : "text-danger"} font-weight-medium`}>
                <NumberFormat value={props.priceChangePercentage1h} decimalScale={3} displayType={'text'}
                              thousandSeparator={true} suffix={'%'}/>
            </td>
            <td className={`${props.priceChangePercentage24h >= 0 ? "text-success" : "text-danger"} font-weight-medium`}>
                <NumberFormat value={props.priceChangePercentage24h} decimalScale={3} displayType={'text'}
                              thousandSeparator={true} suffix={'%'}/>
            </td>
            <td className={`${props.priceChangePercentage7d >= 0 ? "text-success" : "text-danger"} font-weight-medium`}>
                <NumberFormat value={props.priceChangePercentage7d} decimalScale={3} displayType={'text'}
                              thousandSeparator={true} suffix={'%'}/></td>
            <td className={`font-weight-medium`}>
                <NumberFormat value={props.marketCapital} decimalScale={2} displayType={'text'} thousandSeparator={true}
                              prefix={'$'}/>
            </td>
        </tr>
    )
}

CoinTableRow.propTypes = {
    coinIcon: PropTypes.string,
    symbol: PropTypes.string,
    name: PropTypes.string,
    lastPrice: PropTypes.number,
    priceChangePercentage1h: PropTypes.number,
    priceChangePercentage24h: PropTypes.number,
    priceChangePercentage7d: PropTypes.number,
    marketCapital: PropTypes.number,
    handleOnTableRowClick: PropTypes.func
}

export default CoinTableRow
