import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes, { element } from 'prop-types';
import { Link, useNavigate } from "react-router-dom"
import "../../styles/comment.css";

export const ServiceComment = (props) => {
    const { store, actions } = useContext(Context)
    const { services_id } = props

    const [commentData, setCommentData] = useState({
        comment: "",
        rating: 0
    });

    const initialStar = [
        "fa-regular",
        "fa-regular",
        "fa-regular",
        "fa-regular",
        "fa-regular"
    ]

    // Añadir una variable que pase a true si la estrella es seleccionada, y pasa a false de lo contrario
    // Para poder

    const starVariant = "fa-solid star-color"

    const [starsState, setStarsState] = useState({ stars: initialStar })

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

    const newStars = (starNumber) => {
        let updatedStars = []
        for (let index = 0; index < starsState.stars.length; index++) {
            if (index < starNumber) {
                const element = starVariant
                updatedStars.push(element)
            } else {
                updatedStars.push("fa-regular")
            }
        }
        setStarsState({
            ...starsState,
            stars: updatedStars
        })
    }

    const changeStars = (starNumber) => {
        switch (starNumber) {
            case 1: {
                newStars(1)
                break;
            }
            case 2: {
                newStars(2)
                break;
            }
            case 3: {
                newStars(3)
                break;
            }
            case 4: {
                newStars(4)
                break;
            }
            case 5: {
                newStars(5)
                break;
            }
            case 0: {
                if (commentData.rating <= 0) {
                    setStarsState({
                        ...starsState,
                        stars: initialStar,
                    })
                }
                break;
            }
        }

    }

    const changeRating = (ratingNumber) => {
        setCommentData({
            ...commentData,
            rating: ratingNumber
        })
        changeStars(ratingNumber)
    }

    const handleChange = (event) => {
        setCommentData({
            ...commentData,
            comment: event.target.value
        });
    };

    return (
        <>
            <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">
                <div className="row card py-2 shadow-lg w-50">
                    <div className="col-12 d-flex justify-content-center flex-column">
                        <div className="col-12 d-flex flex-row p-1">
                            {/* Stars, it annoys me how I made it */}
                            {starsState.stars.map((element, index) => {
                                return (
                                    <button
                                        className="button-clearer"
                                        key={index}
                                        onMouseOver={() => changeStars(index + 1)}
                                        onMouseOut={() => changeStars(0)}
                                        onClick={() => changeRating(index + 1)}>
                                        <i className={`${element} fa-star`}></i>
                                    </button>
                                )
                            })}

                            {/* <button
                                className="button-clearer"
                                onMouseOver={() => changeStars(2)}
                                onMouseOut={() => changeStars(0)}
                                onClick={() => changeRating(2)}>
                                <i className={`${starsState.star2} fa-star`}></i>
                            </button>
                            <button
                                className="button-clearer"
                                onMouseOver={() => changeStars(3)}
                                onMouseOut={() => changeStars(0)}
                                onClick={() => changeRating(3)}>
                                <i className={`${starsState.star3} fa-star`}></i>
                            </button>
                            <button
                                className="button-clearer"
                                onMouseOver={() => changeStars(4)}
                                onMouseOut={() => changeStars(0)}
                                onClick={() => changeRating(4)}>
                                <i className={`${starsState.star4} fa-star`}></i>
                            </button>
                            <button
                                className="button-clearer"
                                onMouseOver={() => changeStars(5)}
                                onMouseOut={() => changeStars(0)}
                                onClick={() => changeRating(5)}>
                                <i className={`${starsState.star5} fa-star`}></i>
                            </button> */}
                        </div>
                        <div className="col-12">
                            <input
                                name="comment"
                                onChange={handleChange}
                                type="text"
                                className="w-100 text-center p-1 border-0"
                                placeholder="Presiona enter para añadir un comentario"
                                onKeyDown={handleKey}
                            />
                        </div>

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
