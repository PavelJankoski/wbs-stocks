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

export const popularStockObject = (dateTimes, prices, symbol) => {
    return {
        labels: dateTimes,
        datasets: [{
            label: symbol,
            data: prices,
            borderColor: '#6d7cfc',
            backgroundColor: 'rgb(248,249,255)',
            borderWidth: 3,
            fill: true
        }]
    }
}
