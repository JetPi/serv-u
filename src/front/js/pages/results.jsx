import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ServiceCard } from "../component/serviceCard.jsx";




export const SearchResult = () => {

    const { store } = useContext(Context);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-9 row">
                        {store.servicesResults.map((element, index) => {
                            return (
                                <div key={index} className="col-4 my-2">
                                    <ServiceCard name={element.name} description={element.description} service_id={index} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )

}