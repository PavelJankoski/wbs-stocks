import React, {useState} from "react";
import {Dropdown} from "react-bootstrap";
import i18n from "i18next";
import PropTypes from "prop-types";

const LanguageDropdown = (props) => {
    const [currentLanguage, setCurrentLanguage] = useState(props.languages[0]);

    const handleLanguageChange = (e, l) => {
        e.preventDefault();
        i18n.changeLanguage(l.tag)
        setCurrentLanguage(l);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                <div className="d-inline-flex mr-0 mr-md-3">
                    <div className="flag-icon-holder">
                        <i className={`flag-icon ${currentLanguage.flag}`}/>
                    </div>
                </div>
                <span className="profile-text font-weight-medium d-none d-md-block">{currentLanguage.label}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="navbar-dropdown preview-list">
                {props.languages.map((l, idx) => {
                    return (<React.Fragment key={`lang-${idx}`}>
                            <Dropdown.Item className="dropdown-item  d-flex align-items-center" onClick={(e) => handleLanguageChange(e, l)}>
                                <div className="flag-icon-holder">
                                    <i className={`flag-icon ${l.flag}`} />
                                </div>
                                {l.label}
                            </Dropdown.Item>
                            {idx !== props.languages.length-1 ? <div className="dropdown-divider"/> : null}
                        </React.Fragment>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}

LanguageDropdown.propTypes = {
    languages: PropTypes.array
}

export default LanguageDropdown;