import { Context } from "../store/appContext";
import { ServiceCard } from "../component/serviceCard.jsx";
import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useContext, useState, useEffect } from "react";

export const SearchResult = () => {
    useEffect(() => { { actions.getServices() } }, [])

    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <>
            <div className="container-fluid row">
                {store.services.length == 0 ?
                    <div className="w-100 text-center mt-5">
                        <h1>Busca un servicio</h1>
                    </div>
                    :
                    store.services.map((element, index) => {
                        if (element.name.toLowerCase().includes(params.service_name.toLowerCase())) {
                            return (
                                <div key={index} className="col-3 my-2">
                                    <ServiceCard name={element.name} description={element.description} service_id={index} card_photo={element.service_photo_url} />
                                </div>
                            )
                        }

                    })
                }
            </div>
        </>
    )

}