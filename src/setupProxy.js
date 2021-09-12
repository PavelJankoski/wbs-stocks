const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/v1/**', {
        target: 'http://api.marketstack.com/',
        changeOrigin: true
    }));
    app.use(proxy('/api/v1/**', {
        target: 'https://finnhub.io/',
        changeOrigin: true
    }));
    app.use(proxy('/query', {
        target: 'https://www.alphavantage.co/',
        changeOrigin: true
    }));
};