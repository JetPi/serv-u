import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/active_order.css";



export const ActiveOrders = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getOrders() } }, [])

    if (store.orders.length > 0) {
        return <ul>{store.orders.map((order) =>
            <li key={order.id}>

                <div className="col-12 d-flex justify-content-start fs-4 m-auto ">
                    <span>Estatus de la orden: {order.status}</span>
                    {order.status === "pendiente" ?
                        <button className="btn btn-outline-success mx-3"
                            onClick={() => actions.updateOrder(order.id)}
                            type="submit">
                            <i class="fa-solid fa-check color-check"></i>
                        </button>

                        :
                        <></>
                    }
                </div>
            </li>
            )}
            </ul>
    }


    return (

        <div>Cargando...</div>

    )

}
