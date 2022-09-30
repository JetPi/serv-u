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

    // let imageNames = {
    //     profileImageName: `profile-${id}`,
    //     bannerImageName: `banner-${id}`,
    // }

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
                    <div className=" col-4 mx-2"></div>
                    <div className="col-4 column background position-fixed">
                        {/* Profile Info */}
                        <div className="col-12  my-3">
                            {profile_photo_url == undefined ?
                                <AdvancedImage className="image-rounder" cldImg={imageFiles.profileImage} />
                                :
                                <img className="image-rounder" src={profile_photo_url} alt="" />
                            }
                            {/* Button */}
                            <button
                                type="button"
                                className="btn fab-upload-file position-absolute top-50"
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

                        <div className="col-12 fs-2 d-flex justify-content-center">
                            {username == "" ? "Placeholder" : username}
                        </div>

                        <div className="col-12 fs-5 mb-2">
                            Correo: {email == "" ? "Placeholder" : email}
                        </div>
                        <div className="col-12 fs-5 mb-2">
                            Rol: {role != "" ? (role == "comprador" ? "Comprador" : "Vendedor") : "Placeholder"}
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
                        <button type="button" onClick={() => userLogout()} className="btn my-2 col-12 fs-5 special">Logout</button>
                    </div>
                    {/* Banner and services */}
                    <div className="col-8 row d-flex align-content-center">
                        <div className="col-12">
                            {/* Think about this */}
                            {banner_photo_url == undefined ?
                                <AdvancedImage className="image-square" cldImg={imageFiles.bannerImage} />
                                :
                                <img className="image-square" src={banner_photo_url} alt="" />
                            }
                            <button type="button" className="btn fab-upload-file  position-absolute upload-position" data-bs-toggle="modal" data-bs-target="#bannerModal"><i className="upload-icon"></i></button>
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
                        {/* Botones de redirección a otras vistas */}
                        <div className="col-12">
                            <div className="row d-flex justify-content-center">
                                <div className="title-size mx-2 fs-2 text-center my-3 background">
                                    {profile_photo_url == undefined ? 
                                            "Publica tu servicio" 
                                            : 
                                            <Link className="text-center text-reset text-decoration-none"  aria-current="page" to={'/post_service'}>
                                                Publica tu Servicio
                                            </Link>
                                    }
                                </div>
                                <div className="title-size mx-2 fs-2 text-center my-3 background">
                                    Busca un Servicio
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row d-flex justify-content-center">
                                    <div className="title-size mx-2 fs-4 background  ">
                                        <h5 className="text-center">Ordenes Activas</h5>
                                        <div className="col-6">
                                            <ActiveOrders />
                                        </div>
                                    </div>
                                    <div className="title-size mx-2 fs-4 background  ">
                                        <h5 className="text-center">Servicios</h5>
                                        <ActiveService />
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
