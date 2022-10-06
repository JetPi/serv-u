import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ServiceComment } from "../component/serviceComment.jsx"
import "../../styles/home.css";

export const Faq = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
			<h1>Busca un Servicio</h1>
		</div>
	);
};