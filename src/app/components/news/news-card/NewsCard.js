import React from "react";
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, CardActionArea} from '@mui/material';

const NewsCard = (props) => {
    const handleCardClick = () => {
        window.open(props.link, "_blank");
    }

    return (
        <Card onClick={handleCardClick}>
            <CardActionArea sx={{
                height: "100%"
            }}>
                <Box sx={{
                    display: 'flex'
                }}>
                    <CardMedia
                        component="img"
                        sx={{width: '30%'}}
                        image={`${props.image !== "" ? props.image : require("../../../../assets/images/placeholder.jpg")}`}
                        alt="News image"
                    />
                    <CardContent>
                        <Typography variant="caption" sx={{color: "#4e8896"}}>
                            {props.category}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            textOverflow: 'ellipsis',
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: "1.5em",
                            minHeight: '3em'
                        }}>
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            textOverflow: 'ellipsis',
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: "1.5em",
                            minHeight: '4.5em'
                        }}>
                            {props.description}
                        </Typography>
                        <Typography component="div" variant="body1" className="mt-3">
                            {props.source}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {props.day} {props.month}, {props.year}
                        </Typography>
                    </CardContent>
                </Box>
            </CardActionArea>

        </Card>
    );
}

NewsCard.propTypes = {
    source: PropTypes.string,
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string
}

export default NewsCard;
