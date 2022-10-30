import React, { useContext, useState, useEffect, useReducer } from "react";
import { Context } from "../store/appContext";
import PropTypes, { element } from 'prop-types';
import { Link, useNavigate } from "react-router-dom"
import "../../styles/comment.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useComment, defaultState, commentReducer } from "./commentTextBox.jsx"

const defaultHeader = (comments) => {
    return comments.length <= 0 ?
        "No hay comentarios en esta publicación"
        : `${comments.length} Comentarios`
}

const DefaultCommentGenerator = ({
    comment,
    starProps = {
        starColor: "star-color fa-solid",
        starBorder: "fa-regular"
    },
    stars = [0, 0, 0, 0, 0]
}) => {
    let commentStars = []
    for (let index = 0; index < stars.length; index++) {
        if (index < comment.rating) {
            commentStars.push(starProps.starColor)
        } else {
            commentStars.push(starProps.starBorder)
        }
    }
    return (
        <div className="border-bottom d-flex align-item-center py-2 col-lg-6 col-sm-12">
            <div className="w-100 ">
                <div className="d-flex flex-row w-100">
                    <div className="my-2">
                        {comment.user_data.profile_photo_url == undefined ?
                            <img src="https://picsum.photos/50/50" className="profile-photo" />
                            :
                            <img src={comment.user_data.profile_photo_url} className="profile-photo " />
                        }
                    </div>
                    <div className="d-flex align-items-center fw-bold">
                        {comment.user_data.username}
                    </div>
                    <div className="w-100 d-flex justify-content-end align-items-center">
                        {commentStars.map((element, index) => {
                            return (<i key={index} className={`${element} fa-star`}></i>)
                        })}
                    </div>
                </div>
                <p className="d-flex justify-content-start align-items-center mx-5">{comment.observation}</p>
            </div>
        </div>
    );
}

export const CommentList = ({
    services_id = 0,
    header = defaultHeader,
    commentGetter = { action: () => { return null }, data: [] },
    CommentGenerator = DefaultCommentGenerator,
    commentModifier = (comment) => { return comment },
    props = {} } = {}) => {

    // Variables
    const { store, actions } = useContext(Context)
    const { getStarProps } = useComment()

    const starProps = { ...getStarProps() }
    const { getServiceComments } = actions
    const { comments } = store
    const mappingComment = commentModifier(comments)

    // Conditional for getting rated comments instead
    useEffect(() => {
        {
            if (commentGetter === null) {
                getServiceComments(services_id)
            } else {
                commentGetter.action(commentGetter.data)
            }
        }
    }, [services_id])

    return (
        <>
            <ToastContainer />
            <div className="d-flex flex-column text-center justify-content-center align-items-center">
                {/* Published Comments */}
                <div className={`container-fluid row div-service-comment`} style={{ ...props }}> {/* Here for custom props */}
                    {/* Header */}
                    <div className="border-bottom items border-0 d-flex justify-content-end align-items-center">
                        {header(comments)}
                    </div>
                    {/* Comment Generator */}
                    {mappingComment.map((comment, index) => {
                        return <CommentGenerator
                            comment={comment}
                            starProps={starProps}
                            key={index} />
                    })}
                    {/* End of Comment Generator */}
                </div>
            </div>
        </>
    );
};