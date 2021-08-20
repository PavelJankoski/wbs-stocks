import React, {Component} from 'react';
import {Link} from "react-router-dom";
import LanguageDropdown from "../../shared/components/LanguageDropdown";
import {languages} from "../../shared/objects/languages";

class Navbar extends Component {
    toggleOffcanvas() {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }

    toggleRightSidebar() {
        document.querySelector('.right-sidebar').classList.toggle('open');
    }


    render() {
        return (
            <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
                    <Link className="navbar-brand brand-logo-mini align-self-center d-lg-none" to="/dashboard"
                          onClick={evt => evt.preventDefault()}><img src={require("../../../assets/images/logo-mini.png")}
                                                                     width={50} alt="logo"/></Link>
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button"
                            onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                        <i className="mdi mdi-menu"/>
                    </button>
                    <form className="ml-auto search-form d-none d-md-block" action="#">
                        <div className="form-group">
                            <input type="search" className="form-control" placeholder="Search Here"/>
                        </div>
                    </form>
                    <ul className="navbar-nav navbar-nav-right header-links align-self-center">
                        <li className="nav-item dropdown language-dropdown">
                            <LanguageDropdown languages={languages} />
                        </li>

                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                            onClick={this.toggleOffcanvas}>
                        <span className="mdi mdi-menu"/>
                    </button>
                </div>
            </nav>
        );
    }
}

export default Navbar;
