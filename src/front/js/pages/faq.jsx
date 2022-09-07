import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Faq = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center mt-5">
			<h1>FAQ</h1>
		</div>
	);
};