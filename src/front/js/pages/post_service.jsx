import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import "../../styles/post_service.css";

export const Post_service = () => {

    let navigate = useNavigate()
    const { store, actions } = useContext(Context);

    const [serviceData, setServiceData] = useState({
        name: "",
        type: "",
        location: "",
        // home_delivery: false,
        base_price: "",
        description: ""
        // owner: store.email

    })

  
    // useState de la imagen del servicio
    const [imageFile, setImageFile] = useState();

    //Preview de la imagen
    const [previewSource, setPreviewSource]=useState()


    const handleChange = (event) => {
        setServiceData({
            ...serviceData,
            [event.target.name]: event.target.value
        })

    }
    const handleCheck = (event) =>
        setServiceData({
            ...serviceData,
            [event.target.name]: event.target.checked
    }) 
    

    // // Submit la imagen del servicio
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", serviceData.file);
        formData.append("name", serviceData.name);
        formData.append("type", serviceData.type);
        formData.append("location", serviceData.location);
        formData.append("home_delivery", serviceData.home_delivery)
        formData.append("base_price", serviceData.base_price)
        formData.append("description", serviceData.description)
        formData.append("owner", serviceData.owner)
        actions.addService(formData);
        if (await actions.addService(serviceData)) {
                    console.log("handlesub")
                     navigate("/profile")
                }
                return true
    };
    const handleFileInputChange=(e)=>{
        setServiceData({
            ...serviceData,
            [e.target.name]: e.target.files[0]
        })
        const file = e.target.files[0];
        previewFile(file);
        

    }
    const previewFile=(file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            setPreviewSource(reader.result)
        }
    }
    
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
                        value={serviceData.type}
                        onChange={handleChange}
                        name="type"
                        className="form-select">
                        <option defaultValue>Elige</option>
                        <option>electricidad</option>
                        <option>plomeria</option>
                        <option>hogar</option>
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
                <input type="file" name="file" 
                    onChange={handleFileInputChange}
                    value={imageFile} 
                    className="form-input"
                />







                <div className="col-md-10 div-button-submit">
                    <button type="submit" className="btn btn-primary" >Publicar</button>
                </div>

            </form>

            {/* <form onSubmit={handleSubmitImage} className="row g-3 mx-5 justify-content-center">
                
                <div className="col-md-10 div-button-submit">
                    <button className="btn btn-primary" type="submit">submit</button>
                </div>
                
            </form> */}
            {previewSource && (
                <img 
                    src={previewSource} alt="choosen"
                    style={{height:'300px'}}
                />
            )}

        </div>
    );
};