import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(""); //hago estos 2 useStates porque necesito que el email y contraseña
	const [password, setPassword] = useState(""); //queden almacenados (seteados) en una vble. para poderlos enviar al backend
	const token = localStorage.getItem("token");

	console.log("This is your token", token);

	const handleClick = () => {
		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		};

		fetch("https://3001-purple-impala-p24iuy49.ws-eu16.gitpod.io/api/token", options)
			.then(resp => {
				if (resp.status === 200) return resp.json();
				else alert("There has been some error");
			})
			.then(data => {
				console.log("This came from the backend", data);
				localStorage.setItem("token", data.access_token); //access_token es lo que me respondió el token en Postman
			})
			.catch(error => {
				console.error("There was an error!!", error);
			});
	};

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{token && token != "" && token != undefined ? ( //condición TERNARIA (es un if/else "simplificado")
				"You are logged in whit this token" + token
			) : (
				<div>
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<button onClick={handleClick}>Login</button>
				</div>
			)}
		</div>
	);
};
