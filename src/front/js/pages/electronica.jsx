import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Electronica = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
			<h1>Electronica</h1>
		</div>
	);
};