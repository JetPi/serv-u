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

	const results = () => {
		if (search.trim() !== "") {
			let filteredResult = []
			searchState.forEach((prop) => {
				let filtered = store.services.filter((data) => data[prop].toLowerCase().includes(search.toLowerCase()));
				filteredResult = filteredResult.concat(filtered)
			})
			actions.searchService(filteredResult)
			navigate("/services/search")
		}
	}

	useEffect(() => {
		{
			actions.getServices()
		}
	}, [])

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light navbar-contenedor">
				<div className="container-fluid container-navbar">
					<div className="div-nav-logo">
						<Link className="navbar-brand" to={`/`}>
							<img src={logo}
								alt="Logo"
								width="240"
								height="40"
							/>
						</Link>
					</div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse nav justify-content-end div-nav-links" >
						<form className="d-flex" onSubmit={(e) => e.preventDefault()} role="search">
							<input value={search} onChange={searcher} className="form-control me-2 searching" type="search" placeholder="Encuentra tu servicio" aria-label="Search" />
							<button onClick={results}
								className="btn btn-outline-info" type="submit">Buscar</button>
							<div className="button-style">
								<button
									className="btn btn-outline-info" type="submit">Servicios</button>
							</div>
						</form>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to={'/faq'}><h5>FAQ</h5></Link>
							</li>
							{store.token == "" ?
								<>
									<Link className="nav-link active" aria-current="page" to={'/login'}>
										<h5>Login</h5>
									</Link>

									<Link className="nav-link active" aria-current="page" to={'/signup'}>
										<h5>Signup</h5>
									</Link>
								</>
								:
								<Link className="nav-link active" aria-current="page" to={'/profile'}>
									<h5>Profile</h5>
								</Link>
							}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
