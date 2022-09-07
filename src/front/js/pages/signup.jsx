import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
			<h1>Signup Page</h1>
		</div>
	);
};