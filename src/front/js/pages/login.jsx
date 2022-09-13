import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	let initialState = {
		email: "",
		password: "",
	}

	let [userData, setUserData] = useState(initialState)

	let handleChange = ({ target }) =>{
		setUserData({
            ...userData,
            [target.name]: target.value,
        })
    };

	let handleSubmit = async (event) =>{
		if (actions.loginValidityChecker(userData)){
			
		}
	}

	return (
		<div className="container-fluid container-fitter">
			<div className="row view-fitter mt-4">
				{/* Imagen */}
				<div className="col-sm-12 col-md-6 d-flex justify-content-center ">
					<img className="image-fitter" src="https://picsum.photos/700/1000" alt=""/>
				</div>
				{/* Form */}
				<div className="col-sm-12 col-md-6 d-flex flex-column">
					<div className="d-flex justify-content-center align-items-top col-12">
						<h1>Iniciar Sesión</h1>
					</div>
					<div className="col-12 form-fitter align-items-center d-flex justify-content-center">
						<form>
							{/* Campo de correo */}
							<div className="mb-3 d-flex flex-column">
								<label for="exampleInputEmail1" className="form-label fs-2">Correo Electrónico</label>
								<input type="email" onChange={handleChange} className="form-control input-fitter" id="exampleInputEmail1" aria-describedby="emailHelp"/>
								<div id="emailHelp" className="form-text">Nunca compartiremos tu información.</div>
							</div>
							{/* Campo de contraseña */}
							<div className="mb-3 d-flex flex-column fs-2">
								<label for="exampleInputPassword1" className="form-label">Contraseña</label>
								<input type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
							</div>
							{/* Botón de enviado */}
							<button type="submit" className="btn btn-primary fs-5">Iniciar Sesión</button>
							{/* Redirigir a vista de signup */}
							<div className="col-12 row mt-3">
								<div className="col-6 d-flex justify-content-start fs-4">
									¿No estás registrado?
								</div>
								<div className="col-6 d-flex justify-content-end fs-4 align-items-center">
									<Link to="/signup">
										<span>Regístrate</span>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			
		</div>
	);
};