import PropTypes from "prop-types";
import React from "react";

const CompanyWikiLinks = (props) => {

    const renderItems = props.wikiLinks ? props.wikiLinks.map((item, idx) => (
        <li key={`wiki-links-${idx}`}><a href={item} target="_blank"  rel="noopener noreferrer">{item.split("/").at(-1)}</a></li>)) : null

    return (
        <div>
            <h3>{props.title}</h3>
            <ul>{renderItems}</ul>
        </div>
    )
}

CompanyWikiLinks.propTypes = {
    wikiLinks: PropTypes.array,
    title: PropTypes.string
}

export default CompanyWikiLinks