import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ServiceCard } from "../component/serviceCard.jsx";

export const SearchResult = () => {

    const { store } = useContext(Context);
    return (
        <>

            <div className="container-fluid row">
                {store.servicesResults.length == 0 ?
                    <div className="w-100 text-center mt-5">
                        <h1>Busca un servicio</h1>
                    </div>
                    :
                    store.servicesResults.map((element, index) => {
                        return (
                            <div key={index} className="col-3 my-2">
                                <ServiceCard name={element.name} description={element.description} service_id={index} card_photo={element.service_photo_url} />
                            </div>
                        )

                    })
                }
            </div>
        </>
    )

}