import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Comment = (props) => {




    const { username, description, profile_photo_url, rating } = props

    return (

        <div className="card mb-3" style={{ maxwidth: 50 }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                                {username}                          
                        </h5>
                        <p className="card-text">
                            comentario.
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                rating
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
};

Comment.propTypes = {
    username: PropTypes.string,
    description: PropTypes.string,
    profile_photo_url: PropTypes.string,
    rating: PropTypes.number
}