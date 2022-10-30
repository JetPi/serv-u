import React, { useContext, useState, useEffect, useReducer } from "react";
import { Context } from "../store/appContext";
import PropTypes, { element } from 'prop-types';
import { Link, useNavigate } from "react-router-dom"
import "../../styles/comment.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Check if comment is valid
const Validar = (text, rating) => {
    // Check if comment isn't empty, and that the rating is a valid value
    if (text.trim() == "" || (rating <= 0 && rating >= 5)) {
        toast("Por favor completa el campo vacio", {
            position: 'top-center',
            autoClose: true,
            type: 'warning',
            closeButton: true,
            closeOnClick: true
        })
        return false
    } else {
        return true
    }
};

function commentReducer(state, action) {
    const { type, comment, stars, rating } = action
    switch (type) {
        case "CHANGE-STAR":
            return ({ ...state, stars: stars })
        case "CHANGE-RATING":
            return ({ ...state, rating: rating })
        case "CHANGE-COMMENT":
            return ({ ...state, text: comment })
        default:
            break;
    }
}

// Star color renderer
const newStars = (starNumber, starLength, rating, starProps) => {
    let updatedStars = []
    // If the recieved number is 0, default to the amount of  rating
    if (starNumber == 0) {
        for (let index = 0; index < starLength; index++) {
            // If the index is lower than rating, turn star colorful
            if (index < rating) {
                const element = starProps.starColor
                updatedStars.push(element)
            } else {
                updatedStars.push("fa-regular")
            }
        }
    } else {
        // Else, the recieved number corresponds to a highlighted star
        for (let index = 0; index < starLength; index++) {
            // If index is lower than the highlighted star, turn star colorful
            if (index < starNumber) {
                const element = starProps.starColor
                updatedStars.push(element)
            } else {
                updatedStars.push("fa-regular")
            }
        }
    }

    return updatedStars
}

const defaultState = {
    text: "",
    rating: 0,
    stars: ["fa-regular", "fa-regular", "fa-regular", "fa-regular", "fa-regular"]
}

function useComment({ initialState = defaultState, reducer = commentReducer } = {}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const dispatchTypes = {
        star: "CHANGE-STAR",
        rating: "CHANGE-RATING",
        comment: "CHANGE-COMMENT",
    }

    const changeStar = (newStars) => {
        dispatch({
            type: dispatchTypes.star,
            stars: newStars
        })
    }

    const changeCommentText = (newComment) => {
        dispatch({
            type: dispatchTypes.comment,
            comment: newComment
        })
    }

    const changeRating = (newRating) => {
        dispatch({
            type: dispatchTypes.rating,
            rating: newRating
        })
    }

    const getStarProps = (...props) => {
        return {
            starColor: "fa-solid star-color",
            starBorder: "fa-regular",
            ...props
        }
    }

    return {
        state,
        changeStar,
        changeCommentText,
        changeRating,
        getStarProps,
    }
}

export const CommentTextBox = ({ services_id = 0, ExtraComponent = () => { return null } }) => {
    // Variables
    const { state, changeCommentText, changeRating, changeStar, getStarProps } = useComment()
    const { store, actions } = useContext(Context)
    const { sendComment } = actions
    const { token } = store
    const { stars, rating, text } = state
    const starProps = { ...getStarProps() }

    useEffect(() => { { actions.getServiceComments(services_id) } }, [services_id])

    // Change the comment value
    const handleChange = (event) => {
        changeCommentText(event.target.value);
    };

    // Change the rating
    const ratingRenderer = (ratingNumber) => {
        changeRating(ratingNumber)
        newStars(ratingNumber)
    }

    // Change the state of stars
    const starRenderer = (starNumber) => {
        changeStar(newStars(starNumber, stars.length, rating, starProps))
    }

    // Send comment to backend
    const handleKey = (event) => {
        // On enter
        if (event.key === "Enter") {
            // Check if user is registered
            if (token == "") {
                toast("Para hacer un comentario tienes que registrarte o iniciar sesion", {
                    position: 'top-center',
                    autoClose: true,
                    type: 'warning',
                    closeButton: true,
                    closeOnClick: true
                })
                // If user is registered, validate comment, then send
            } else if (Validar(text, rating)) {
                sendComment({ observation: text, services_id: services_id, rating: rating })
                changeCommentText("");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center ">
                <div className="row card py-2 shadow-lg w-100">
                    <div className="col-12 d-flex justify-content-center flex-column">
                        <div className="col-12 d-flex flex-row p-1">
                            {/* Stars, its good how I made them */}
                            {stars.map((element, index) => {
                                return (
                                    <button
                                        className="button-clearer"
                                        key={index}
                                        onMouseOver={() => starRenderer(index + 1)}
                                        onMouseOut={() => starRenderer(0)}
                                        onClick={() => ratingRenderer(index + 1)}>
                                        <i className={`${element} fa-star`}></i>
                                    </button>
                                )
                            })}
                        </div>
                        {/* Comment input */}
                        <div className="col-12">
                            <input
                                name="comment"
                                onChange={handleChange}
                                type="text"
                                className="w-100 text-center p-1 "
                                placeholder="Presiona enter para añadir un comentario"
                                onKeyDown={handleKey}
                                value={text}
                            />

                            <ExtraComponent services_id={services_id} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export { useComment, defaultState, commentReducer }