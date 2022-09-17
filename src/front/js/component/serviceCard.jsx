import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";
import { Link, useResolvedPath } from "react-router-dom";
import "../../styles/serviceCard.css";

export const ServiceCard = (props) => {
    const { store, actions } = useContext(Context);

    //service_id? service_url? We'll figure it out later
    const { name, description } = props
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="https://picsum.photos/300/300" className="card-img-top" alt="..." />
            <div className="card-body d-flex align-items-center flex-column">
                <h5 className="text-center">{name}</h5>
                <p className="card-text">{description}</p>
                <a href="#" className="btn background">Go to service</a>
            </div>
        </div>
    )
};

ServiceCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
}