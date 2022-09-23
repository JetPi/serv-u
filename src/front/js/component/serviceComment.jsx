import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"


export const ServiceComment = () => {
    const { store, actions } = useContext(Context)

    const [listComments, setListComments] = useState([]);

    const [comment, setComment] = useState("");



    const handleKey = (event) => {
        if (event.key === "Enter") {
            console.log(comment)
            actions.sendComment();
        }
    };
    // const handleKey = (event) => {
    //     if (comment.comment.trim() !== "") {
    //         return alert("Por favor añade un comentario")
    //     } else event.key === "Enter"
    //     return actions.sendComment();


    // };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <>
            {
                store.errorCode != 401 ?
                    <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">
                        <div className="row card py-2 shadow-lg">
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
                                                {listComments.length <= 0
                                                    ? "No hay comentarios de esta publicacion"
                                                    : +listComments.length + " Comentarios"}
                                            </div>
                                            {listComments.map((comentario, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border-bottom d-flex justify-content-between align-item-center py-2"
                                                    >
                                                        <div className="comment-list">
                                                            <p>{comentario.comment}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    navigate("/login")
            }
        </>
    );
};
