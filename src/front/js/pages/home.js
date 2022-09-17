import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"
import "../../styles/home.css";

import servicios from "../../img/servicios.png"


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5 container-home">
			
			<div className="d-flex ">
				<div className="col-6 ">
					<div className="div-home-text">
						<h1 className="home-title">¿Quienes somos?</h1>
					<div className="description">
						Somos <b className="name-servu-descriptico">Serv U</b>, una plataforma dedicada a ofrecer servicios verificados y de calidad.
						Para adquirir un servicio, comunicarse con un proveedor o incluso publicar tu servicio 
						solo necesitas registrarte. Es muy fácil, porque <b>Serv U está para servirte</b> 
					</div>
					
					</div>
					

				</div>
				<div className="col-6 div-img-home">
					<img src={servicios}

						alt="Imagen"
						width="550"
						height="400"
					/>

				</div>

			</div>



		</div>


	);
};
