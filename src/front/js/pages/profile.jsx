import React, { useContext, useState, useEffect } from "react";
import { ActiveOrders } from "../component/activeOrders.jsx";
import { ActiveService } from "../component/activeService.jsx";
import { Link, useNavigate } from "react-router-dom"

import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

// Import any actions required for transformations.
import { fill } from "@cloudinary/url-gen/actions/resize";

import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => { { actions.getUserServices() } }, [])
    useEffect(() => { { actions.getUserInfo() } }, [])
    let navigate = useNavigate()

    //botón de hacer logout
    const userLogout = () => {
        actions.userLogout()
        navigate("/login")
        alert("Succesfully logged out")

    }

    const { username, role, email, id, banner_photo_url, profile_photo_url } = store.userInfo
    const cld = new Cloudinary({ cloud: { cloudName: 'dboidjsun' } });

    const [imageFiles, setImageFiles] = useState({
        profileImage: cld.image('Serv-U_Placeholder').resize(fill().width(450).height(325)),
        bannerImage: cld.image('Serv-U_Placeholder').resize(fill().width(800).height(325)),
    });

    const [uploadImages, setUploadImage] = useState({
        profileImage: [],
        bannerImage: [],
    });

    const handleProfileSubmit = () => {
        const photo = new FormData();
        photo.append("file_profile", uploadImages.profileImage);
        actions.uploadProfileImg(photo);
    };

    const handleBannerSubmit = () => {
        const formData = new FormData();
        formData.append("file_banner", uploadImages.bannerImage);
        actions.uploadBannerImg(formData);
    };

    return (
        <>
            {store.userInfo != "undefined" ?
                <div className="container-fluid row mt-4">
                    <div className="col-4 column background card-profile-datos">
                        {/* Profile Info */}
                        <div className="col-12 d-flex justify-content-center margin-photo">
                            {profile_photo_url == undefined ?
                                <AdvancedImage className="image-style" cldImg={imageFiles.profileImage} />
                                :
                                <img className="image-style" src={profile_photo_url} alt="" />
                            }
                            {/* Button */}
                            <button
                                type="button"
                                className="btn fab-upload-file upload-position-2"
                                data-bs-toggle="modal"
                                data-bs-target="#profileModal">
                                <i className="upload-icon"></i>
                            </button>
                            {/* Modal */}
                            <div className="modal" id="profileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body modal-text">
                                            <input
                                                className="input-group my-2"
                                                type="file"
                                                name="file"
                                                onChange={(e) => setUploadImage({
                                                    ...uploadImages,
                                                    profileImage: e.target.files[0]
                                                })}
                                                accept=".jpg, .jpeg, .png"
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            <button type="button" className="btn btn-primary" onClick={() => handleProfileSubmit()}>Guardar foto</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 fs-2">
                            Usuario:  {username == "" ? "Placeholder" : username}
                        </div>

                        <div className="col-12 fs-5 mb-2">
                            Correo: {email == "" ? "Placeholder" : email}
                        </div>
                        <div className="col-12 fs-5 mb-2">
                            {/* Cambiar la logica para que funcione */}
                            Rol: {store.userServices.length == 0 ? "Comprador" : "Vendedor"}
                        </div>
                        <div className="col-12 fs-2 d-flex justify-content-center">
                            {profile_photo_url == undefined ?
                                <div>
                                    <div className="col-12 alert alert-danger  justify-content-center" role="alert">
                                        <p className="alert_profile">

                                            <i className="fas fa-exclamation-triangle"></i>
                                            Agrega una foto de perfil para publicar un servicio

                                        </p>

                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                    {/* orders and services */}
                    <div className="col-8 row d-flex margin-p">
                        <div className="col-12">
                            <div className="row d-flex">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active color-p" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Ordenes Activas</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link color-p" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Servicios Cargados</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                        <div className="title-size fs-4 background-card card-active-order ">
                                            <h5 className="text-center my-1">Ordenes</h5>
                                            {store.orders.length == 0 ?
                                                <p className="text-center">No tienes ordenes</p>
                                                :
                                                <ActiveOrders />
                                            }
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                        <div className="title-size fs-4 background-card card-active-service ">
                                            <h5 className="text-center my-1">Servicios</h5>
                                            {store.userServices.length == 0 ?
                                                <p className="text-center">No tienes servicios</p>
                                                :
                                                <ActiveService />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Modal */}
                            <div className="modal" id="bannerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body modal-text">
                                            <input
                                                className="input-group my-2"
                                                type="file"
                                                name="file"
                                                onChange={(e) => setUploadImage({
                                                    ...uploadImages,
                                                    bannerImage: e.target.files[0]
                                                })}
                                                accept=".jpg, .jpeg, .png"
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                            <button type="button" className="btn btn-primary" onClick={() => handleBannerSubmit()}>Guardar foto</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div> :
                navigate("/login")
            }
        </>
    )
};
