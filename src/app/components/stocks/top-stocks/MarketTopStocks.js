import React from "react";
import TopStockItem from "./top-stock-item/TopStockItem";
import {Image, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";

const MarketTopStocks = (props) => {

    const renderSpinner = () => {
        return <div className="col d-flex justify-content-center">
            <Spinner variant={'primary'} animation="border" style={{width: "60px", height: "60px"}}/>
        </div>
    }

    return (
        <div className="card p-4">
            <div className="card-title">
                <h4 className="font-weight-bold text-black">
                    <Image src={props.icon} roundedCircle alt={"Market icon"}
                           style={{width: "50px", height: "50px"}}/> {props.title}</h4>
            </div>
            <div>
                <div className="row ml-2">
                    <div className="col">
                        {props.loading ? renderSpinner() :
                            props.stocks.map((s, index) =>
                                <TopStockItem key={s.symbol} stock={s} index={index + 1}/>)
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

MarketTopStocks.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    loading: PropTypes.bool,
    stocks: PropTypes.object
}

export default MarketTopStocks;
