import React, {useEffect} from 'react'
import {useParams, withRouter} from "react-router-dom";
import {fetchCoinDetails} from "../../../store/actions/cryptocurrenciesActions";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Currency} from "../../../shared/objects/currencies";

const CoinDetails = (props) => {

    const {coin_id} = useParams()
    const dispatch = useDispatch()

    const coinDetails = useSelector((state) => state.cryptocurrenciesReducer.coinDetails, shallowEqual)

    useEffect(() => {
        dispatch(fetchCoinDetails(coin_id))
    }, [dispatch, coin_id])

    return (
        <div>
            <h3 className="font-weight-bold">{coinDetails.name}</h3>
            <h4>{coinDetails.symbol}</h4>
            <h1>{coinDetails.marketData.currentPrice[`${Currency.USD}`]}</h1>
        </div>
    )
}


export default withRouter(CoinDetails)