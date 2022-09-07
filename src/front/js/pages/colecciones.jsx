import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Colecciones = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
			<h1>Colecciones</h1>
		</div>
	);
};