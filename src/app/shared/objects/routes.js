import {lazy} from "react";

const Stocks = lazy(() => import('../../components/stocks/Stocks'));
const Dashboard = lazy(() => import('../../example/dashboard/Dashboard'));
const Cryptocurrency = lazy(() => import('../../components/cryptocurrency/Cryptocurrency'));
const CoinDetails = lazy(() => import('../../components/cryptocurrency/coin-details/CoinDetails'))
const CryptocurrencyNews = lazy(() => import('../../components/news/cryptocurrency/CryptocurrencyNews'));
const StocksNews = lazy(() => import('../../components/news/stocks/StocksNews'));

const Buttons = lazy(() => import('../../example/basic-ui/Buttons'));
const Dropdowns = lazy(() => import('../../example/basic-ui/Dropdowns'));

const BasicElements = lazy(() => import('../../example/form-elements/BasicElements'));

const BasicTable = lazy(() => import('../../example/tables/BasicTable'));

const Mdi = lazy(() => import('../../example/icons/Mdi'));

const ChartJs = lazy(() => import('../../example/charts/ChartJs'));

const Error404 = lazy(() => import('../../example/error-pages/Error404'));
const Error500 = lazy(() => import('../../example/error-pages/Error500'));

const Login = lazy(() => import('../../example/user-pages/Login'));
const Register1 = lazy(() => import('../../example/user-pages/Register'));

const routes = [
    {
        to: "/stocks",
        component: Stocks
    },
    {
        to: "/cryptocurrency",
        component: Cryptocurrency
    },
    {
        to: "/news/stocks-market",
        component: StocksNews
    },
    {
        to: "/news/cryptocurrency-market",
        component: CryptocurrencyNews
    },
    {
        to: "/dashboard",
        component: Dashboard
    },
    {
        to: "/coin/:coin_id",
        component: CoinDetails
    },
    {
        to: "/basic-ui/buttons",
        component: Buttons
    },
    {
        to: "/basic-ui/dropdowns",
        component: Dropdowns
    },
    {
        to: "/form-Elements/basic-elements",
        component: BasicElements
    },
    {
        to: "/tables/basic-table",
        component: BasicTable
    },
    {
        to: "/icons/mdi",
        component: Mdi
    },
    {
        to: "/charts/chart-js",
        component: ChartJs
    },
    {
        to: "/user-pages/login",
        component: Login
    },
    {
        to: "/user-pages/register",
        component: Register1
    },
    {
        to: "/error-pages/error-404",
        component: Error404
    },
    {
        to: "/error-pages/error-500",
        component: Error500
    }
]

export default routes;
