import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";



export const ActiveOrders = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getOrders() } }, [])

    if (store.orders.length > 0) {
        return <ul>{store.orders.map((order) => <li key={order.id}>{order.status}</li>)}</ul>
    }


    return (

        <div>Cargando...</div>

    )

}
