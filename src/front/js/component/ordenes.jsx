import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Alert } from "./alert.jsx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const OrderModal = ({ services_id }) => {
    const { store, actions } = useContext(Context);
    const [orderState, setOrderState] = useState({
        status: "pendiente",
        observacion: "",
        direccion: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target
        setOrderState((prevState) => ({ ...prevState, [name]: value }))
    }

    const createOrder = () => {
        if (orderState.direccion.trim() && orderState.observacion.trim() == "") {
            return toast("Completa los campos vacios", {
                position: 'top-center',
                autoClose: true,
                type: 'warning',
                closeButton: true,
                closeOnClick: true
            })
        } else {
            const orderData = { ...orderState, services_id }
            actions.addOrders(orderData).then((response) => {
                if (response) {
                    //return alert("Servicio contratado")
                    toast("Exito", {
                        position: 'top-center',
                        autoClose: true,
                        type: 'success',
                        closeButton: true,
                        closeOnClick: true
                    })
                } else
                    toast("Hubo un error", {
                        position: 'top-center',
                        autoClose: true,
                        type: 'error',
                        closeButton: true,
                        closeOnClick: true
                    })
            }
            )
        }
    }

    return (
        <>
            <ToastContainer />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Contratar</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Informacion del cliente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Direccion: </label>
                                    <input type="text" className="form-control" onChange={handleChange} value={orderState.direccion} name="direccion" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Observacion:</label>
                                    <textarea className="form-control" onChange={handleChange} value={orderState.observacion} name="observacion" id="message-text"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Metodo de pago: Efectivo <br>
                                    </br>Pago movil:
                                        <ul>
                                            <li>Cedula: J-0673637-3</li>
                                            <li>Nombre: Serv-u</li>
                                            <li>Telefono: 04244401044</li>
                                        </ul></label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={createOrder} >Contratar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}