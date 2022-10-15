import btoa from 'btoa';
import NumberFormat from "react-number-format";
import React from "react";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const datasetKeyProvider=()=>{
    return btoa(Math.random()).substring(0,12)
}

export const calculateStockPercentage = (oldPrice, newPrice) => {
    let calculatedPercentage = (100 * (parseFloat(newPrice) - parseFloat(oldPrice))) / oldPrice;
    return calculatedPercentage.toFixed(2);
}

export const stockChartObject = (dateTimes, prices, symbol, borderColor = '#6d7cfc', backgroundColor = 'rgb(248,249,255)') => {
    return {
        labels: dateTimes,
        datasets: [{
            label: symbol,
            data: prices,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            borderWidth: 3,
            fill: true
        }]
    }
}

export const toIsoDate = (date) => {
    return new Date(date)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
}

export const formatStringToDecimal = (value) => {
    return value !== null ? parseFloat(value).toFixed(2) : "";
}

export const numberFormatter = (num, prefix = "", digits = 2) => {
    const si = [
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "B"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "P"},
        {value: 1E18, symbol: "E"}
    ];
    const rx = /\.0+$|(\.\d*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > -1; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    if (i < 0){
        return <NumberFormat decimalScale={2} displayType={"text"} prefix={prefix}
                      thousandSeparator={true}
                      value={num}/>
    } else {
        return `${prefix}${(num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol}`;
    }
}

export const RECOMMENDATION_TRENDS_DATE_FORMAT = "MMM YYYY"
export const DEFAULT_DATE_FORMAT = "DD MMM YYYY"