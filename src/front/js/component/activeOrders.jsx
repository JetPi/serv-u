import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";



export const ActiveOrders = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getOrders() } }, [])

    if (store.orders.length > 0) {
        return <ul>{store.orders.map((order) => <li key={order.id}><span>Estatus de la orden: {order.status}</span>
            <div className="col-6 d-flex justify-content-end fs-4 m-auto ">
                {order.status === "pendiente" ? <button className="btn btn-primary"
                    onClick={() => actions.updateOrder(order.id)}
                    type="submit">Orden Finalizada</button> : <></>}
            </div>
        </li>)}</ul>
    }


    return (

        <div>Cargando...</div>

    )

}
