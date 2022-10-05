import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/serviceCard.css";

export const ServiceCard = (props) => {
    const { name, description, service_id, card_photo } = props
    return (
        <div className="card " >
            <img src={card_photo} className="img-body card-photo" alt="..." />
            <div className="card-body card-size d-flex align-items-between justify-content-between flex-column">
                <h5 className="text-center barra">{name}</h5>
                <p className="card-text text-center description-card">{description}</p>
                <Link className="nav-link active text-center" aria-current="page" to={`/service/${service_id}`}>
                    <button type="button" className="btn especial">Ir a servicio</button>
                </Link>
            </div>
        </div>
    )
};

ServiceCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number
}