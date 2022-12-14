import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import logo from "../../img/logo.png"

export const Signup = () => {
	let navigate = useNavigate()
	const { store, actions } = useContext(Context);

	const [userData, setUserData] = useState({
		username: "", email: "", password: ""
	});

	const handleChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (actions.signupValidityChecker(userData)) {
			if(actions.userSignup(userData)){
				navigate("/login")
			return true
			}
			
		}
		else {
			return false
		}

	}

	return (
		<div className="container text-center mt-5">
			<div className="d-flex div-form">

				<div className="col-6 text-center div-registrarse">
					<div><h1>Registrarse</h1></div>
					<form onSubmit={handleSubmit} action="login.php">
						<div className="text-center">

							<div className="col-12 my-3 div-email">
								<label className="label-email fs-5">
									Correo:
								</label>
								<input
									className="form-control"
									placeholder="Email"
									type="text"
									name="email"
									value={userData.email}
									onChange={handleChange}

								/>
							</div>
						</div>
						<div className="d-flex  my-3">

							<div className="col-12 div-username">
								<label className="label-username fs-5">
									Nombre de usuario:
								</label>
								<input
									className="form-control"
									placeholder="Nombre de usuario"
									type="text"
									name="username"
									value={userData.username}
									onChange={handleChange}
								/>
							</div>

						</div>
						<div>
							<div className="col-12 my-3 div-password">
								<label className="label-password fs-5">
									Contraseña:
								</label>
								<input
									className="form-control"
									placeholder="Contraseña"
									type="password"
									name="password"
									value={userData.password}
									onChange={handleChange}
								/>
								<p className="parrafo-password">La contraseña debe tener más de 8 caracteres.</p>
							</div>
						</div>
						<div className="col-12 my-3">
							<p className="parrafo-conditions">
								Al registrarte aceptas todos los términos y condiciones de la plataforma.
							</p>
						</div>
						<div className="col-12">
							<button className="btn btn-primary w-100 my-3 fs-5" type="submit">
								Registrarse
							</button>
						</div>
					</form>
					<div className="row d-flex my-3">
						<div className="row fs-5 d-flex">
							<div className="col-12 d-flex ">
								<p className="parrafo-go-to-register">¿Ya te registraste?</p>

								<Link to={`/login`}>
									Ingresa aquí
								</Link>
							</div>
						</div>
					</div>


				</div>

			</div>
		</div>
	);
};