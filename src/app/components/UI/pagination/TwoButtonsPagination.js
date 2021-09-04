import React from "react";
import PropTypes from "prop-types";

const TwoButtonsPagination = (props) => {
    return (
            <div className="btn-group justify-content-center" role="group" aria-label="Basic example">
                <button type="button"
                        disabled={props.previousDisabled}
                        onClick={props.handleOnPreviousClick}
                        className="btn btn-secondary"><i className="mdi mdi-arrow-left"/> Previous</button>
                <button type="button"
                        disabled={props.nextDisabled}
                        onClick={props.handleOnNextClick}
                        className="btn btn-secondary">Next <i className="mdi mdi-arrow-right"/></button>
            </div>
    )
}

TwoButtonsPagination.propTypes = {
    previousDisabled: PropTypes.bool,
    nextDisabled: PropTypes.bool,
    handleOnPreviousClick: PropTypes.func,
    handleOnNextClick: PropTypes.func
}

export default TwoButtonsPagination;
