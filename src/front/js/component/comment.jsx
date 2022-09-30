import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/comment.css";


export const Comment = () => {

    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getComment() } }, [])

    return (

        <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">


            {store.comments?.map((comentario, index) => {
                return (


                    <div className="row my-3 div_comentario" key={index}>
                        <div className="col-md-4 div_foto_comentario">
                            <img src={comentario.user_data?.profile_photo_url} className="img_comment_home" alt="foto" />
                        </div>
                        <div className="col-md-8 ">
                            <div className="row card-body d-flex mx-2">
                                <div className="row">
                                    <h5 className="card-title">
                                        {comentario.user_data?.username}
                                    </h5>
                                </div>
                                <div className="row">
                                    <p className="card-text">
                                        {comentario.observation}
                                    </p>
                                </div>
                                <div className="row">
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {comentario.rating}/5
                                        </small>
                                    </p>
                                </div>



                            </div>

                        </div>
                    </div>

                );
            })}

        </div>

    )
};

