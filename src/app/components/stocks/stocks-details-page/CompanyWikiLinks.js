import PropTypes from "prop-types";
import React from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Spinner} from "react-bootstrap";

const CompanyWikiLinks = (props) => {

    const renderSpinner = <div className="h-100 d-flex align-self-center align-items-center justify-content-center">
        <Spinner
            variant={'primary'} animation="border" style={{width: "100px", height: "100px"}}/></div>


    const renderItems = props.wikiLinks ? props.wikiLinks.map((item, idx) => (
        <li key={`wiki-links-${idx}`}><a href={item} target="_blank"
                                         rel="noopener noreferrer">{item.split("/").at(-1)}</a></li>)) : null

    return (
        <div className="row m-0">
            <Accordion className="w-100 rounded-0">
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.loading ? renderSpinner : <ul>{renderItems}</ul>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

CompanyWikiLinks.propTypes = {
    wikiLinks: PropTypes.array,
    title: PropTypes.string,
    loading: PropTypes.bool
}

export default CompanyWikiLinks