import btoa from 'btoa';

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

export const RECOMMENDATION_TRENDS_DATE_FORMAT = "MMM YYYY"
export const DEFAULT_DATE_FORMAT = "DD MMM YYYY"