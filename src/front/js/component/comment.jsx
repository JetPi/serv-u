import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";
import "../../styles/comment.css";


export const Comment = () => {

    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getComment() } }, [])

    const filtrarPorRating=(obj)=> {
        if ('rating' in obj && (obj.rating) >= 4 ){
          return true;
        } else {    
          return false;
        }
      }

    let arr = store.comments

    const arrPorRating = arr.filter(filtrarPorRating);

    const goodComments = arrPorRating.slice(0, 6);

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

        <div className="container d-flex flex-column text-center justify-content-center align-items-center">
            <div className="my-5">
                <h2 className="title_comment_component">
                    Experiencias de nuestros clientes
                </h2>
            </div>


            {goodComments.map((comment, index) => {
                return (


                    <div className="row my-3 div_comentario" key={index}>

                        <div className="col-12 d-flex">
                            <div className="col-4 div_foto_comentario">
                                <img src={comment.user_data?.profile_photo_url} className="img_comment_home" alt="foto" />
                            </div>
                            <div className="col-8">
                                <div className="row div-username-and-stars">
                                    <div className="col-5">
                                        <h5 className="card-user-title">
                                            {comment.user_data?.username}
                                            
                                        </h5>
                                    </div>
                                    <div className="col-7">
                                        <p className="card-text rating_stars">
                                            
                                                {stars(comment.rating)}
                                            
                                        </p>
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

                    </div>

                );
            })}

        </div>

    )
};

