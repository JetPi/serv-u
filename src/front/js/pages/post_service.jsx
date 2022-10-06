import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import "../../styles/post_service.css";

export const Post_service = () => {

    let navigate = useNavigate()
    const { store, actions } = useContext(Context);

    const [serviceData, setServiceData] = useState({
        name: "",
        type_service: "",
        location: "",
        home_delivery: false,
        base_price: "",
        description: ""
    })

    // useState de la imagen del servicio
    const [imageFile, setImageFile] = useState();

    //Preview de la imagen
    const [previewSource, setPreviewSource] = useState()

    // Función handle para los campos de srting y integer
    const handleChange = (event) => {
        setServiceData({
            ...serviceData,
            [event.target.name]: event.target.value
        })
    }

    // Función handle del check para home service
    const handleCheck = () => {
        setServiceData({
            ...serviceData,
            home_delivery: !serviceData.home_delivery
        })
    }

    // Función handle para la imagen
    const handleFileInputChange = (e) => {
        setServiceData({
            ...serviceData,
            [e.target.name]: e.target.files[0]
        })
        const file = e.target.files[0];
        previewFile(file);
    }

    // Función para ver la imagen que se quiere subir
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSource(reader.result)
        }
    }

    // Submit del formulario
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", serviceData.file);
        formData.append("name", serviceData.name);
        formData.append("type_service", serviceData.type_service);
        formData.append("location", serviceData.location);
        formData.append("home_delivery", serviceData.home_delivery)
        formData.append("base_price", serviceData.base_price)
        formData.append("description", serviceData.description)
        formData.append("owner", serviceData.owner)
        if (serviceData.name.trim() !== "" &&
            serviceData.type_service.trim() !== "" && serviceData.location.trim() !== "" &&
            serviceData.base_price.trim() !== "" &&
            serviceData.description.trim() !== "") {
                const response = await actions.addService(formData);
                if (response) {
                    navigate('/profile')
                }
        } else {
            alert("Error: Completa los campos correctamente.");
					return false;
        }

    };

    return (
        <div className="container text-center mt-5">
            <div className="text-center my-3">
                <h1>Publica tu servicio</h1>
            </div>
            <form className="row g-3 mx-5 justify-content-center" onSubmit={handleSubmit}>
                <div className="col-md-4 ">
                    <div className="div-tipo-servicio">
                        <label className="form-label">Tipo de servicio</label>
                    </div>

                    <select
                        value={serviceData.type_service}
                        onChange={handleChange}
                        name="type_service"
                        className="form-select">
                        <option defaultValue>Elige</option>
                        <option value={"electricidad"}>Electricidad</option>
                        <option value={"plomeria"}>Plomería</option>
                        <option value={"hogar"}>Hogar</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <div className="div-tipo-servicio">
                        <label className="form-label">Nombre del servicio</label>
                    </div>

                    <input type="text" className="form-control"
                        value={serviceData.name}
                        onChange={handleChange}
                        name="name"
                    />
                </div>
                <div className="col-md-10">
                    <div className="div-tipo-servicio">
                        <label className="form-label">Ubicación</label>
                    </div>

                    <input type="text" className="form-control"
                        value={serviceData.location}
                        onChange={handleChange}
                        name="location"
                    />
                </div>
                <div className="col-md-10">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                            value={serviceData.home_delivery}
                            onChange={handleCheck}
                            name="home_delivery"


                        />
                        <div className="div-tipo-servicio">
                            <label className="form-check-label">
                                ¿Es a domicilio?
                            </label>
                        </div>

                    </div>
                </div>
                <div className="col-md-10">
                    <div className="div-tipo-servicio">
                        <label className="form-label">Tarifa básica</label>
                    </div>

                    <input type="text" className="form-control"
                        value={serviceData.base_price}
                        onChange={handleChange}
                        name="base_price"
                    />
                    <p className="parrafo-price">Ingresa solamente números. Ejemplo: 1234</p>
                </div>

                <div className="col-md-10">
                    <div className="div-tipo-servicio">
                        <label className="form-label">Descripción</label>
                    </div>

                    <input type="text" className="form-control"
                        value={serviceData.description}
                        onChange={handleChange}
                        name="description"
                    />
                </div>
                <button type="button" className="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Click para cargar una foto
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Sube una foto</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="col-md-10 div-tipo-servicio">
                                    <input type="file" name="file"
                                        onChange={handleFileInputChange}
                                        value={imageFile}
                                        className="form-input"
                                    />
                                </div>
                                <div className="col-md-10 my-2">
                                    {previewSource && (
                                        <img
                                            src={previewSource} alt="choosen"
                                            style={{ height: '300px' }}
                                        />
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 div-button-submit">
                    <button type="submit" className="btn btn-primary">Publicar</button>
                </div>
            </form>

        </div>
    );
};