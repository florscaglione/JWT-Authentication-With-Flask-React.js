import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(""); //hago estos 2 useStates porque necesito que el email y contraseña
	const [password, setPassword] = useState(""); //queden almacenados (seteados) en una vble. para poderlos enviar al backend
	const history = useHistory();

	console.log("This is your token", store.token);
	const handleClick = () => {
		actions.login(email, password).then(() => {
			history.push("/"); //redireccionamiento a la pág. principal
		});
	};

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{store.token && store.token != "" && store.token != undefined ? ( //condición TERNARIA (es un if/else "simplificado")
				"You are logged in whit this token" + store.token
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
