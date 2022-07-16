import React from "react";
import PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import NumberFormat from 'react-number-format';

const ExchangeTableRow = (props) => {
    return (
        <tr onClick={props.handleOnTableRowClick} style={{cursor: "pointer"}}>
            <td>
                <p className="mb-1 text-dark font-weight-semibold">{props.rank}</p>
            </td>
            <td>
                <div className="d-flex align-items-center">
                    <Image src={props.exchangeIcon} alt={"Exchange icon"}/>
                    <p className="font-weight-medium ml-5 mt-3">{props.name}</p>
                </div>
            </td>
            <td className="font-weight-medium">
                <NumberFormat value={props.tradeVolume24hBTC} decimalScale={2} displayType={'text'}
                              thousandSeparator={true}
                              suffix={' BTC'}/>
            </td>
            <td className="font-weight-medium">
                <p className="m-0">{props.country}</p>
            </td>
            <td className={`font-weight-medium`}>
                <p className="m-0">{props.yearEstablished}</p>
            </td>
        </tr>
    )
}

ExchangeTableRow.propTypes = {
    exchangeIcon: PropTypes.string,
    name: PropTypes.string,
    yearEstablished: PropTypes.string,
    country: PropTypes.string,
    tradeVolume24hBTC: PropTypes.number,
    rank: PropTypes.number,
    handleOnTableRowClick: PropTypes.func
}

export default ExchangeTableRow
