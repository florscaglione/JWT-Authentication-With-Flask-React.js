import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">HOME</span>
			</Link>

			<div className="ml-auto">
				<Link to="/register">
					<button className="btn btn-primary mr-2 btn-lg">Register</button>
				</Link>
				{!store.token ? (
					<Link to="/login">
						<button className="btn btn-primary btn-lg">Log in</button>
					</Link>
				) : (
					<button onClick={() => actions.logout()} className="btn btn-primary">
						Log out
					</button>
				)}
			</div>
		</nav>
	);
};
