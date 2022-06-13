import PropTypes from "prop-types";
import React from "react";
import {ButtonGroup, DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";


const LinkDropdownButton = (props) => {

    const renderDropdownItems = props.links?.map(link => {
        return <DropdownItem href={link} target="_blank" rel="noopener noreferrer">{link.split("//")[1]}</DropdownItem>
    })

    return (
        props.links?.length > 1 ?
            <DropdownButton id="dropdown-button" className="ml-2 mt-2 mt-sm-0 border-0" as={ButtonGroup}
                            title={props.title}>{renderDropdownItems}</DropdownButton> :
            <a href={props.links[0]} target="_blank" rel="noopener noreferrer"
               className="btn btn-light ml-2 mt-2 mt-sm-0 text-white "  style={{backgroundColor: "#69abb9"}}>
                {props.title}
            </a>
    )
}

LinkDropdownButton.propTypes = {
    title: PropTypes.string,
    links: PropTypes.array
}

export default LinkDropdownButton;

