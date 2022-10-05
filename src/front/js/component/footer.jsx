import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useResolvedPath, useNavigate } from "react-router-dom";
import cssPhoto from "../../img/cssPhoto.png"
import cloudinaryPhoto from "../../img/cloudinaryPhoto.png"
import flaskPhoto from "../../img/flaskPhoto.png"
import html5Photo from "../../img/html5Photo.png"
import reactPhoto from "../../img/reactPhoto.png"
import pythonPhoto from "../../img/pythonPhoto.png"
import "../../styles/footer.css";

export const Footer = () => {
    return (
        <div className="navbar justify-content-center bg-dark text-light footer-body">
            <div className="col-5 p-3">
                <p className="text-light fw-bold">Powered by</p>
                <div>
                    <img className="powered-photo" src={cssPhoto} alt="" />
                    <img className="powered-photo" src={cloudinaryPhoto} alt="" />
                    <img className="powered-photo" src={flaskPhoto} alt="" />
                    <img className="powered-photo" src={html5Photo} alt="" />
                    <img className="powered-photo" src={reactPhoto} alt="" />
                    <img className="powered-photo" src={pythonPhoto} alt="" />
                </div>
            </div>
            <div className="col-2 d-flex justify-content-center">
                <div className="text-muted">Serv-U Inc.</div>
            </div>
            <div className="col-5 p-3 d-flex justify-content-end">
                <p className="text-muted d-flex align-items-end">Brought to you by: <br /> Oriana Calderón <br /> Victor Seidman <br /> Ibrahim Zárraga</p>
            </div>
        </div>
    )
}