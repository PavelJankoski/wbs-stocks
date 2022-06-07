import React from "react";
import PropTypes from "prop-types";

const SelectableButton = (props) => {
    return (
        <a onClick={props.handleOnButtonClick}
                className={`m-2 btn ${props.selected === true ? "btn-secondary" : "btn-light"}`}>{props.label}</a>
    )
}

SelectableButton.propTypes = {
    selected: PropTypes.bool,
    label: PropTypes.string,
    handleOnButtonClick: PropTypes.func
}

export default SelectableButton
