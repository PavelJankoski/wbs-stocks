import React from "react";
import PropTypes from "prop-types";

const NewsCard = (props) => {

    return (
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={props.image} alt={props.title} />
            <div className="card-body">
                <div className="card-source">
                    {props.source}
                </div>
                <div className="card-date">
                    <h4 className="mb-0 text-white">{props.day}</h4>
                    <p className="mb-0 text-uppercase text-white">{props.month}</p>
                </div>
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-block">Read more <i className="mdi mdi-arrow-right"/></a>
                </div>
        </div>
    )
}

NewsCard.propTypes = {
    source: PropTypes.string,
    day: PropTypes.string,
    month: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string
}

export default NewsCard;
