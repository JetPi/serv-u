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
                                    <div className="col-4 my-3 div-image">
                                        <img className="image-rounder p-2" src={element.service_photo_url} alt="" />
                                        

                                    </div>
                                    <div className="col-8 my-3">
                                        <div className="col-12 text-center fs-1  my-5 title-service">
                                            {element.name}
                                        </div>
                                        <div className="d-flex justify-content-between color-datos">
                                            <div className="col-5 mx-2  fs-5">
                                                -Tipo: {element.type_service.charAt(0).toUpperCase() + element.type_service.slice(1)} <br />
                                                -A domicilio: {element.home_delivery == true ? <i className="fa-solid fa-check color-check"></i> : <i className="fa-solid fa-xmark color-x"></i>} 
                                                
                                            </div>
                                            <div className="col-5 mx-2  fs-5">
                                                -Dirección: {element.location} <br />
                                                -Precio Base: {element.base_price} $
                                            </div>
                                            

                                        </div>
                                        <div className="p-2 fs-5 description color-datos ">
                                        -Descripción: {element.description}
                                        </div>
                                        
                                        <div className="order-modal">
                                            <OrderModal services_id={element.id} />
                                        </div>

                                    </div>

                                    <div className="col-12 my-2 d-flex align-items-center">
                                        
                                        <ServiceComment services_id={element.id} />
                                    </div>
                                </div>
                            )
                        }
                    }
                    )}


                </div>
                :
                <div>Loading...</div>
            }
        </>
    )

}