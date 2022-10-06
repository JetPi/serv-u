import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/active_order.css";



export const ActiveOrders = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getOrders() } }, [])

    if (store.orders.length > 0) {
        return <ul>{store.orders.map((order) => <li key={order.id}><span>Estatus de la orden: {order.status}</span>
            <div className="col-6 d-flex justify-content-end fs-4 m-auto ">
                {order.status === "pendiente" ? <button className="btn btn-outline-success"
                    onClick={() => actions.updateOrder(order.id)}
                    type="submit"><i class="fa-solid fa-check color-check"></i></button> : <></>}
            </div>
        </li>)}</ul>
    }


    return (

        <div>Cargando...</div>

    )

}
