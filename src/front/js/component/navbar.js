import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useResolvedPath, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png"
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	let navigate = useNavigate()

	const searchState = ["name", "type_service"]

	const [search, setSearch] = useState("")

	const searcher = (e) => {
		setSearch(e.target.value)
	}

	// Pasar resultados de busqueda al URL
	// Luego sacar del URL la palabra
	// Y finalmente cambiar los servicio acorde con eso
	const results = () => {
		if (search.trim() !== "") {
			let filteredResult = []
			searchState.forEach((prop) => {
				let filtered = store.services.filter((data) => data[prop].toLowerCase().includes(search.toLowerCase()));
				filteredResult = filteredResult.concat(filtered)
			})
			actions.searchService(filteredResult)
			navigate(`/services/search/${search}`)
		}
	}

	function UserButtons() {
		return (
			<ul className="navbar-nav justify-content-end my-2">
				<Link className="btn btn-outline-info bg-light mx-2 especiales d-flex justify-content-center align-items-center" aria-current="page" to={'/section'}>
					Servicios
				</Link>
				{store.token == "" ?
					<>
						<Link className="btn btn-outline-info bg-light mx-2 especiales d-flex justify-content-center align-items-center" aria-current="page" to={'/login'}>
							Login
						</Link>

						<Link className="btn btn-outline-info bg-light especiales d-flex justify-content-center align-items-center" aria-current="page" to={'/signup'}>
							Signup
						</Link>
					</>
					:
					<>
						<li>
							{store.userInfo.profile_photo_url == undefined ?
								<button className="btn btn-outline-info bg-light mx-2 especiales">
									Publica tu servicio
								</button>
								:
								<Link className="btn btn-outline-info bg-light mx-2 especiales" aria-current="page" to={'/post_service'}>
									Publica tu servicio
								</Link>
							}
						</li>
						<li className="nav-item">
							<Link aria-current="page" to={'/login'}>
								<button type="button" onClick={() => actions.userLogout()} className="btn btn-outline-info bg-light mx-2 especiales">Logout</button>
							</Link>
						</li>
						<Link className="btn btn-outline-info bg-light especiales-profile mx-2 d-flex justify-content-center align-items-center" aria-current="page" to={'/profile'}>
							<i className="fa-solid fa-user"></i>
						</Link>
					</>
				}
			</ul>
		)
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg  navbar-contenedor">
				<div className="container-fluid container-navbar">
					<div className="div-nav-logo">
						<Link className="navbar-brand" to={`/`}>
							<img src={logo} alt="Logo" width="240" height="40"
							/>
						</Link>
					</div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse nav justify-content-end div-nav-links" >
						<form className="d-flex mx-5" onSubmit={(e) => e.preventDefault()} role="search">
							<input value={search} onChange={searcher} className="form-control me-2 searching" type="search" placeholder="Encuentra tu servicio" aria-label="Search" />
							<button onClick={results}
								className="btn btn-outline-info bg-light especiales-lupa" type="submit"><i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</form>
						<UserButtons />
					</div>
				</div>
			</nav>
		</>
	);
};
