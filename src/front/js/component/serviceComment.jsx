import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom"


export const ServiceComment = (props) => {
    const { store, actions } = useContext(Context)
    const { services_id } = props

    const [commentData, setCommentData] = useState({
        comment: "",
        rating: 0
    });

    useEffect(() => { { actions.getComment() } }, [])

    const handleKey = (event) => {
        if (event.key === "Enter") {
            if (Validar()) {
                actions.sendComment({ observation: commentData.comment, services_id: services_id, rating: commentData.rating });
            }
        }
    };

    const Validar = () => {
        if (commentData.comment.trim() == "" || (commentData.rating >= 1 && commentData.rating >= 5)) {
            alert("Por favor completa el campo vacío")
            return false
        } else {
            return true
        }
    };

    const handleChange = (event) => {
        setCommentData({
            ...commentData,
            comment: event.target.value
        });
    };

    return (
        <>
            <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">
                <div className="w-100 row">
                    <button className="btn"><i class="fa-regular fa-star"></i></button>
                    <button className="btn"><i class="fa-solid fa-star"></i></button>
                </div>
                <div className="row card py-2 shadow-lg w-50">
                    <div className="col-12 d-flex justify-content-center flex-column">
                        <input
                            name="comment"
                            onChange={handleChange}
                            type="text"
                            className="align-text-center text-center p-3 border-0"
                            placeholder="Presiona enter para añadir un comentario"
                            onKeyDown={handleKey}
                        />

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 my-3">
                                    <div className="border-bottom items border-0">
                                        {store.comments.length <= 0
                                            ? "No hay comentarios de esta publicación"
                                            : +store.comments.length + " Comentarios"}
                                    </div>
                                    {store.comments?.map((comentario, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="border-bottom d-flex justify-content-between align-item-center py-2"
                                            >
                                                <div className="comment-list">
                                                    <p><strong>{comentario.user_data?.username}</strong></p>
                                                    <p>{comentario.observation}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
