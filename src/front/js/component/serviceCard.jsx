import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";
import { Link, useResolvedPath } from "react-router-dom";
import "../../styles/serviceCard.css";

export const ServiceCard = (props) => {
    const { name, description } = props
    return (
        <div className="card w-100 h-100" style={{ width: "18rem" }}>
            <img src="https://picsum.photos/300/300" className="img-body" alt="..." />
            <div className="card-body h-100 d-flex align-items-between justify-content-between flex-column">
                <h5 className="text-center">{name}</h5>
                <p className="card-text text-center">{description}</p>
                <a href="#" className="btn background ">Go to service</a>
            </div>
        </div>
    )
};

ServiceCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
}