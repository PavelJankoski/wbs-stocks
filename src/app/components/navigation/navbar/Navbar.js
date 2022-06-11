import React from 'react';
import {Link, withRouter} from "react-router-dom";
import LanguageDropdown from "./language-dropdown/LanguageDropdown";
import languages from "../../../shared/objects/languages";

const Navbar = (props) => {

    const toggleOffcanvas = () => {
        debugger
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
        props.history.push("/stocks/details/"+"AAPL")
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
