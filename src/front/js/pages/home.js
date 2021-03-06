import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import welcome2 from "../../img/welcome2.png";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},
		[store.token] //quiero que se ejecute cada vez que encuentre un token,y cada vez que cambie
	);

	return (
		<div className="text-center mt-5">
			{/* 	<h1>WELCOME!</h1> */}
			<p>
				<img src={welcome2} />
			</p>
			<div className="alert alert-info">{store.message}</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
};
