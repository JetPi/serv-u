import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"


export const ServiceComment = ({ services_id }) => {
    const { store, actions } = useContext(Context)

    const [comment, setComment] = useState("");

    useEffect(() => { { actions.getComment() } }, [])



    const handleKey = (event) => {
        if (event.key === "Enter") {
            validacion(comment)
            actions.sendComment({ observation: comment, services_id });
        }
    };

    const validacion = (comment) => {
        if (comment.trim() == "") {
            alert("Por favor completa el campo vacío")
            return false
        }
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <>
            <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">
                <div className="row card py-2 shadow-lg w-50">
                    <div className="col-12 d-flex justify-content-center flex-column">
                        <input
                            name="comment"
                            value={comment.comment}
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
