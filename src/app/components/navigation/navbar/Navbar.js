import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import LanguageDropdown from "./language-dropdown/LanguageDropdown";
import languages from "../../../shared/objects/languages";
import SearchAutocomplete from "./search-autocomplete/SearchAutocomplete";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../../store/actions';
import * as actionTypes from '../../../store/actionTypes';

const Navbar = (props) => {
    const searchLoading = useSelector((state) => state.stocksReducer.searchStocksLoading);
    const searchAutocompleteData = useSelector((state) => state.stocksReducer.searchedStocks);
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(0);

    const toggleOffcanvas = () => {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }

    const onSearchInputChange = (e) => {
        const searchText = e.target.value;
        if(timer) {
            clearTimeout(timer);
        }
        if(searchText.length!==0) {
            setTimer(setTimeout(() =>
                dispatch(actions.searchStocks(searchText)), 1500)
            );
        }
        else {
            dispatch({type: actionTypes.SEARCH_STOCKS_SUCCESS, payload: []})
        }
    }

    const onSearchItemClick = (symbol) => {
        // TODO: Navigate to symbol route
        props.history.push("/stocks/details/"+symbol)
    }

    return (
        <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
                <Link className="navbar-brand brand-logo-mini align-self-center d-lg-none" to="/dashboard"
                      onClick={evt => evt.preventDefault()}><img
                    src={require("../../../../assets/images/logo-mini.png")}
                    width={50} alt="logo"/></Link>
                <button className="navbar-toggler navbar-toggler align-self-center" type="button"
                        onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                    <i className="mdi mdi-menu"/>
                </button>

                {props.location.pathname === "/stocks" ? <SearchAutocomplete loading={searchLoading}
                                    inputPlaceholder={"Search..."}
                                    autocompleteData={searchAutocompleteData}
                                    onSearchChange={onSearchInputChange}
                                    onItemClick={onSearchItemClick}/> : null}

                <ul className="navbar-nav navbar-nav-right header-links align-self-center">
                    <li className="nav-item dropdown language-dropdown">
                        <LanguageDropdown languages={languages}/>
                    </li>

                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                        onClick={toggleOffcanvas}>
                    <span className="mdi mdi-menu"/>
                </button>
            </div>
        </nav>
    );
}

export default withRouter(Navbar);