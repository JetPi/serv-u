import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Lecciones = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
			<h1>Lecciones</h1>
		</div>
	);
};