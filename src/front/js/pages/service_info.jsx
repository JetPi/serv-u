import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const ServiceInfo = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    let navigate = useNavigate();

    return (
        <div className="container-fluid row">
            <div className="col-12 d-flex justify-content-center fs-1">

            </div>
        </div>
    )

}