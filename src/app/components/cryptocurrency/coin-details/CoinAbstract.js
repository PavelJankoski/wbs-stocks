import React, {useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {cleanUpCoinAbstract, fetchCoinAbstract} from "../../../store/actions/cryptocurrenciesActions";
import PropTypes from "prop-types";

const CoinAbstract = (props) => {

    const dispatch = useDispatch()

    let coinAbstract = useSelector((state) => state.cryptocurrenciesReducer.coinAbstract, shallowEqual)

    useEffect(() => {
        dispatch(fetchCoinAbstract(props.coinName))
        return function cleanup() {
            dispatch(cleanUpCoinAbstract())
        }
    }, [dispatch])

    return (
        <div>
            <p className="h2 font-weight-medium">About {props.coinName}</p>
            <span style={{fontSize: 20}}>
                            {coinAbstract}
            </span>
        </div>

    )
}

CoinAbstract.propTypes = {
    coinName: PropTypes.string
}


export default CoinAbstract