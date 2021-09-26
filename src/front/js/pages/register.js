import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.scss";

export const Register = () => {
	const [email, setEmail] = useState(""); //hago estos 2 useStates porque necesito que el email y contraseña
	const [password, setPassword] = useState(""); //queden almacenados (seteados) en una vble. para poderlos enviar al backend

	async function createUser() {
		const result = await fetch(`https://3001-purple-impala-p24iuy49.ws-eu18.gitpod.io/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
		console.log(result);
	}

	return (
		<div className="text-center mt-5">
			<h1>Register</h1>
			<input
				type="text"
				placeholder="New Email"
				onChange={event => {
					setEmail(event.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="New Password"
				onChange={event => {
					setPassword(event.target.value);
				}}
			/>
			<button onClick={createUser}>Register</button>
			{/*             <button onClick={createUser}>
				<Link to="/login">Register</Link>
			</button> */}
		</div>
	);
};
