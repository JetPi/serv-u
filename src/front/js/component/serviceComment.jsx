import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes, { element } from 'prop-types';
import { Link, useNavigate } from "react-router-dom"
import "../../styles/comment.css";

export const ServiceComment = (props) => {
    // Variables
    const { store, actions } = useContext(Context)
    const { services_id } = props

    const initialStar = ["fa-regular", "fa-regular", "fa-regular", "fa-regular", "fa-regular"]
    const starVariant = "fa-solid star-color"

    useEffect(() => { { actions.getServiceComments(services_id) } }, [])

    const [commentData, setCommentData] = useState({ comment: "", rating: 0 });

    const [starsState, setStarsState] = useState({ stars: initialStar })
    const [starSelected, setStarsSelected] = useState({ state: false, star: 0, })

    // Functions
    const handleKey = (event) => {
        if (event.key === "Enter") {
            if (store.token == "") {
                alert("Para hacer un comentario tienes que registrarte o iniciar sesión.")
            }else if(Validar()){               
                actions.sendComment({ observation: commentData.comment, services_id: services_id, rating: commentData.rating }); 
            }
        }
    };

    const Validar = () => {
        if (commentData.comment.trim() == "" || (commentData.rating <= 0 && commentData.rating >= 5)) {
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
                if (starSelected == false) {
                    setStarsState({
                        ...starsState,
                        stars: initialStar,
                    })
                } else {
                    newStars(starSelected.star)
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
        setStarsSelected({
            state: true,
            star: ratingNumber
        })
    }

    const handleChange = (event) => {
        setCommentData({
            ...commentData,
            comment: event.target.value
        });
    };

    return (

        <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">
            <div className="row card py-2 shadow-lg w-100">
                <div className="col-12 d-flex justify-content-center flex-column">
                    <div className="col-12 d-flex flex-row p-1">
                        {/* Stars, its good how I made them */}
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
                    </div>
                    {/* Comment input */}
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
                    {/* Published Comments */}
                    <div className="container-fluid row div-service-comment">
                        {/* Header */}
                        <div className="border-bottom items border-0">
                            {store.comments.length <= 0
                                ? "No hay comentarios en esta publicación"
                                : `${store.comments.length} Comentarios`}
                        </div>
                        {/* Comment Generator */}
                        {store.comments.map((comentario, index) => {
                            let commentStars = []
                            for (let index = 0; index < starsState.stars.length; index++) {
                                if (index < comentario.rating) {
                                    const element = starVariant
                                    commentStars.push(element)
                                } else {
                                    commentStars.push("fa-regular")
                                }
                            }
                            return (
                                <div key={index} className="border-bottom d-flex align-item-center py-2 col-lg-6 col-sm-12">
                                    <div className="w-100 ">
                                        <div className="d-flex flex-row w-100">
                                            <div className="my-2">
                                                {comentario.user_data.profile_photo_url == undefined ?
                                                    <img src="https://picsum.photos/50/50" className="profile-photo" />
                                                    :
                                                    <img src={comentario.user_data.profile_photo_url} className="profile-photo " />
                                                }
                                            </div>
                                            <div className="d-flex align-items-center fw-bold">
                                                {comentario.user_data.username}
                                            </div>
                                            <div className="w-100 d-flex justify-content-end align-items-center">
                                                {commentStars.map((element, index) => {
                                                    return (<i key={index} className={`${element} fa-star`}></i>)
                                                })}
                                            </div>
                                        </div>
                                        <p>{comentario.observation}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
};