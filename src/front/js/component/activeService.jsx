import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";



export const ActiveService = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getServices() } }, [])

    if (store.services.length > 0) {
        return <ul>{store.userServices.map((service) => <li key={service.id}>{service.name}</li>)}</ul>
    }

    return (
        <div>Cargando...</div>
    )

}