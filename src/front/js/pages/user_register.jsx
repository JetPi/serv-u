import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";


export const ActiveUser = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => { { actions.getUserStatus() } }, [])

    return (
        <>
            <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">
                <div className="row card py-2 shadow-lg w-50">
                    <div className="col-12 d-flex justify-content-center flex-column">
                        <div className="border-bottom items border-0">
                            {store.users.length + " Usuarios"}
                        </div>
                        {store.users.map((element, index) => {
                            console.log(store.users)
                            return (
                                <div
                                    key={index}
                                    className="border-bottom d-flex justify-content-between align-item-center py-2"
                                >
                                    <div>
                                        <p>Usuario: <strong>{element.username}</strong></p>
                                        <p>Email: <strong>{element.email}</strong></p>
                                        <p>Rol: <strong>{element.role}</strong></p>
                                        <p>Estatus: <strong>{element.is_active ? "Activo" : "Inactivo"}</strong></p>
                                    </div>
                                    <div>
                                        <div>
                                            <p></p>
                                            <input type="checkbox"
                                                value={element.is_active}
                                                onChange={() => actions.updateUserStatus(element.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}