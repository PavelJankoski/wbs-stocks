import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import {Trans} from 'react-i18next';
import {Link} from "react-router-dom";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            currentLanguage: this.languages[0]
        }
    }
    languages = [
        {
            label: "English",
            flag: "flag-icon-us",
            tag: "en-US"
        },
        {
            label: "Македонски",
            flag: "flag-icon-mk",
            tag: "mk-MK"
        }
    ]

    toggleOffcanvas() {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }

    toggleRightSidebar() {
        document.querySelector('.right-sidebar').classList.toggle('open');
    }

    handleLanguageChange(e, l) {
        e.preventDefault();
        this.setState({currentLanguage: l})
    }

    render() {
        return (
            <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
                    <Link className="navbar-brand brand-logo-mini align-self-center d-lg-none" to="/dashboard"
                          onClick={evt => evt.preventDefault()}><img src={require("../../assets/images/logo-mini.png")}
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
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                                    <div className="d-inline-flex mr-0 mr-md-3">
                                        <div className="flag-icon-holder">
                                            <i className={`flag-icon ${this.state.currentLanguage.flag}`}/>
                                        </div>
                                    </div>
                                    <span className="profile-text font-weight-medium d-none d-md-block">{this.state.currentLanguage.label}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="navbar-dropdown preview-list">
                                    {this.languages.map((l, idx) => {
                                        return (<React.Fragment key={`lang-${idx}`}>
                                                <Dropdown.Item className="dropdown-item  d-flex align-items-center" onClick={(e) => this.handleLanguageChange(e, l)}>
                                                    <div className="flag-icon-holder">
                                                        <i className={`flag-icon ${l.flag}`} />
                                                    </div>
                                                    {l.label}
                                                </Dropdown.Item>
                                                {idx !== this.languages.length-1 ? <div className="dropdown-divider"/> : null}
                                        </React.Fragment>
                                            )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
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
