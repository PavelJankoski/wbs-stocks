import React from "react";
import PropTypes from "prop-types";

const SelectableButton = (props) => {
    return (
        <button onClick={props.handleOnButtonClick} type="button"
                className={`m-2 btn ${props.selected === true ? "btn-secondary" : "btn-light"}`}>{props.label}</button>
    )
}

SelectableButton.propTypes = {
    selected: PropTypes.bool,
    label: PropTypes.string,
    handleOnButtonClick: PropTypes.func
}

export default SelectableButton
