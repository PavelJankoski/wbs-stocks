import React from "react";
import PropTypes from "prop-types";

const PageHeader = (props) => {
    return (
        <div className="row page-title-header">
            <div className="col-12">
                <div className="page-header">
                    <h4 className="page-title font-weight-medium">{props.title}</h4>
                </div>
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    title: PropTypes.string
}

export default PageHeader;
