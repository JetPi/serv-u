import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	let initialState = {
		email: "",
		password: "",
	}

	let [userData, setUserData] = useState(initialState)

	let handleChange = ({ target }) => {
		setUserData({
			...userData,
			[target.name]: target.value,
		})
	};

	let handleSubmit = async (event) => {
		event.preventDefault()
		if (actions.loginValidityChecker(userData)) {
			if (await actions.loginUser(userData)) {
				navigate("/")
			}
		}
	}

	useEffect(() => { { store.token != "" && actions.userLogout() } }, [])

	return (

		<div className="container-fluid container-fitter">
			<div className="row view-fitter mt-4 justify-content-center">
				{/* Form */}
				<div className="col-sm-12 col-md-6 d-flex flex-column ">
					<div className="d-flex justify-content-center align-items-top col-12">
						<h1>Iniciar Sesión</h1>
					</div>
					<div className="col-12 form-fitter align-items-center d-flex justify-content-center">
						<form onSubmit={handleSubmit}>
							{/* Campo de correo */}
							<div className="mb-3 d-flex flex-column">
								<label htmlFor="exampleInputEmail1" className="form-label fs-2">Correo Electrónico</label>
								<input
									type="email"
									name="email"
									onChange={handleChange}
									className="form-control input-fitter"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
								/>
								<div id="emailHelp" className="form-text">Nunca compartiremos tu información.</div>
							</div>
							{/* Campo de contraseña */}
							<div className="mb-3 d-flex flex-column fs-2">
								<label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
								<input
									type="password"
									name="password"
									onChange={handleChange}
									className="form-control"
									id="exampleInputPassword1"
								/>
							</div>
							{/* Botón de enviado */}
							<button type="submit" className="btn btn-primary w-100 fs-5 my-2">Iniciar Sesión</button>
							{/* Redirigir a vista de signup */}
							<div className="col-12 row mt-3">
								<div className="row fs-5 d-flex">
									<div className="col-12 d-flex ">
										<p className="parrafo-not-registered">¿No estás registrado?</p>

										<Link to="/signup">
										<span>Regístrate</span>
									</Link>
									</div>
								</div>
								
							</div>
						</form>
					</div>
				</div>
			</div>

		</div>
	);
};