import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { ServiceComment } from "../component/serviceComment.jsx"
import { Context } from "../store/appContext";
import "../../styles/service_info.css";
import { OrderModal } from "../component/ordenes.jsx";

export const ServiceInfo = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <>
            {store.services != "" ?
                <div className="container-fluid row justify-content-center">
                    {store.services.map((element, index) => {
                        if (index == params.id) {
                            return (
                                <div className="w-100 row" key={index}>
                                    <div className="col-4 my-3 background">
                                        <img className="image-rounder p-2" src={element.service_photo_url} alt="" />
                                    </div>
                                    <div className="col-8 my-3">
                                        <div className="col-12 text-center fs-1 special my-3">
                                            {element.name}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="col-5 background my-1 mx-2 p-2 fs-5">
                                                Tipo: {element.type_service.charAt(0).toUpperCase() + element.type_service.slice(1)} <br />
                                                A Domicilio: {element.home_delivery == true ? "Si" : "No"}
                                            </div>
                                            <div className="col-5 background my-1 mx-2 p-2 fs-5">
                                                Dirección: {element.location} <br />
                                                Precio Base: {element.base_price} $
                                            </div>
                                            <div>
                                                <OrderModal services_id={element.id} />
                                            </div>
                                        </div>
                                        <div className="col-12 fs-3 text-center special my-3">
                                            Descripción
                                        </div>
                                        <div className="col-12 text-center background my-1 fs-5">
                                            {element.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    )}
                    <div className="col-12 text-center special fs-1">
                        Comentarios
                    </div>
                    <div className="col-12 my-2 d-flex align-items-center">
                        <ServiceComment services_id={params.id} />
                    </div>
                </div>
                :
                <div>Loading...</div>
            }
        </>
    )

}