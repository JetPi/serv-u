import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"
import "../../styles/home.css";

import servicios from "../../img/service_home.png"
import { CommentList } from "../component/commentList.jsx";

const commentHeader = (comments = []) => {
	return `${comments.length} Clientes Satisfechos`
}

export const Home = () => {
	const { actions } = useContext(Context)
	const { getRatedComments } = actions
	return (
		<div className="container text-center mt-5 container-home">
			<div className="d-flex ">
				<div className="col-6 ">
					<div className="div-home-text my-5">
						<h1 className="home-title">¿Quienes somos?</h1>
						<div className="description">
							Somos <b className="name-servu-descriptico">Serv-U</b>, una plataforma dedicada a ofrecer servicios verificados y de calidad.
							Para adquirir un servicio, comunicarse con un proveedor o publicar tu servicio
							solamente necesitas registrarte. Es muy fácil, porque <b>Serv-U está para servirte.</b>
						</div>
					</div>
				</div>
				<div className="col-6 div-img-home">
					<img src={servicios} alt="Imagen" width="555" height="400" />
				</div>
			</div>

			<div>
				<CommentList
					services_id={1}
					header={commentHeader}
					commentGetter={{ action: getRatedComments, data: 4 }}
					props={{ height: "auto" }}
					commentModifier={(comment) => { return comment.slice(0, 4) }}
				/>
			</div>
		</div>
	);
};
