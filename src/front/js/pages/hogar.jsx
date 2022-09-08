import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Hogar = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
			<h1>Hogar</h1>
		</div>
	);
};