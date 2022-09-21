import React, { useContext, useState, useEffect } from "react";
import { ActiveOrders } from "../component/activeOrders.jsx";
import { ActiveService } from "../component/activeService.jsx";

import { Link, useNavigate } from "react-router-dom"

import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    let navigate = useNavigate()

    useEffect(() => { { actions.getUserInfo() } }, [])
    useEffect(() => {
        {
            if (store.username == "" || store.email == "" || (store.role != "comprador" && store.role != "vendedor")) {
                navigate("/")
            }
        }
    }, [])

    return (
        <div className="container-fluid row mt-4">
            <div className="col-4 mx-2"></div>
            <div className="col-4 column background position-fixed">
                <div className="col-12  my-3">
                    <img className="image-rounder" src="https://picsum.photos/300/300" alt="" />
                </div>
                <div className="col-12 fs-2 d-flex justify-content-center">
                    {store.username == "" ? "Placeholder" : store.username}
                </div>
                <div className="col-12 fs-5 mb-2">
                    Correo: {store.email == "" ? "Placeholder" : store.email}
                </div>
                <div className="col-12 fs-5 mb-2">
                    Rol: {store.role != "" ? (store.role == "comprador" ? "Comprador" : "Vendedor") : "Placeholder"}
                </div>
                <button type="button" onClick={() => actions.userLogout()} className="btn my-2 col-12 fs-5 special">Logout</button>
            </div>
            <div className="col-8 row d-fllex-align">
                <div className="col-12  ">
                    <img className="image-square" src="https://picsum.photos/600/300" alt="" />
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="w-50 mx-1 fs-2 d-flex justify-content-center my-3 background  ">
                        Publica tu Servicio
                    </div>
                    <div className="w-50 mx-1 fs-2 d-flex justify-content-center my-3 background  ">
                        Busca un Servicio
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <div className="col-12 fs-2   d-flex justify-content-center special mb-3">
                        Tus Servicios
                    </div>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="row w-50 mx-1 fs-4 background mb-3  ">
                        <h5 className="text-center">Ordenes Activas</h5>
                        <div className="col-6">
                            <ActiveOrders />
                        </div>
                    </div>
                    <div className="w-50 mx-1 fs-4 justify-content-center mb-3 background  ">
                        <h5 className="text-center">Servicios</h5>
                        <ActiveService />
                    </div>
                </div>
            </div>
        </div>
    );
};