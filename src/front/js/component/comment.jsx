import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/comment.css";


export const Comment = () => {

    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getRatedComments(4) } }, [])

    let comments = store.comments

    const goodComments = comments.slice(0, 6);

    const star4 = [
        <i className="fas fa-star star-color"></i>,
        <i className="fas fa-star star-color"></i>,
        <i className="fas fa-star star-color"></i>,
        <i className="fas fa-star star-color"></i>,
        <i className="far fa-star"></i>

    ]

    const star5 = [
        <i className="fas fa-star star-color"></i>,
        <i className="fas fa-star star-color"></i>,
        <i className="fas fa-star star-color"></i>,
        <i className="fas fa-star star-color"></i>,
        <i className="fas fa-star star-color"></i>
    ]

    const stars = (rating) => {
        if (rating == 4) {
            return star4
        }
        else if (rating == 5) {

            return star5
        }
        else {
            return false
        }
    }

    return (
        <>
        <div className="container d-flex flex-column text-center justify-content-center align-items-center">
            <div className="my-3">
                <h2 className="title_comment_component">
                    Experiencias de nuestros clientes
                </h2>
            </div>

            <div className="row my-3 w-100" >
                {goodComments.map((comment, index) => {
                    return (
                        <div className="col-6 d-flex my-1 div_comentario" key={index}>
                            <div className="col-4 div_foto_comentario">
                                <img src={comment.user_data.profile_photo_url == undefined ? "https://picsum.photos/50/50" : comment.user_data.profile_photo_url} className="img_comment_home" alt="foto" />
                            </div>
                            <div className="col-8">
                                <div className="row div-username-and-stars">
                                    <div className="col-5">
                                        <h5 className="card-user-title">
                                            {comment.user_data.username}
                                        </h5>
                                    </div>
                                    <div className="col-7">
                                        <div className="card-text rating_stars d-flex flex-row">
                                            {comment.rating == 4 ?
                                                star4.map((element, index) => { return (<div key={index}>{element}</div>) })
                                                :
                                                star5.map((element, index) => { return (<div key={index}>{element}</div>) })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="card-text-observation">
                                            {comment.observation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                })}
                
            </div>
            

        </div>
        <div >
               <p className="paragraph-under-comments fs-5"> con más de {goodComments.length} clientes satisfechos...</p>
            </div>
        </>

    )
};

