import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
	const { store, actions } = useContext(Context);

    useEffect(() =>{ {actions.getUserInfo()} }, [])

	return (
		<div className="container-fluid row mt-4">
                <div className="col-4 mx-2"></div>
                <div className="col-4 column background position-fixed">
                    <div className="col-12  my-3">
                        <img className="image-rounder" src="https://picsum.photos/300/300" alt=""/>  
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
                </div>
                <div className="col-8 row d-fllex-align">
                    <div className="col-12  ">
                        <img className="image-square" src="https://picsum.photos/600/300" alt=""/>
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
                        <div className="w-50 mx-1 fs-4 d-flex justify-content-center background mb-3  ">
                            Servicios con actividad
                        </div>
                        <div className="w-50 mx-1 fs-4 d-flex justify-content-center mb-3 background  ">
                            Servicios
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <div className="w-50 mx-1 fs-5 background">
                            <ul className="my-2">
                                <li>Service 1</li>
                                <li>Service 2</li>
                                <li>Service 3</li>
                            </ul>
                        </div>
                        <div className="w-50 mx-1 fs-5 background">
                            <ul className="my-2">
                                <li>Service 1</li>
                                <li>Service 2</li>
                                <li>Service 3</li>
                            </ul>
                        </div>
                    </div>
                </div>
		</div>
	);
};