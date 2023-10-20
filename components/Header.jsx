import React from "react";
import {Link, NavLink} from "react-router-dom";
import imageUrl from "/assets/images/avatar-icon.png";

export default function Header() {
	function fakeLogOut() {
		localStorage.removeItem("loggedin")
	}

	return (
		<header>
			<Link className="site-logo" to="/">#VanLife</Link>
			<nav>
				<NavLink className={({isActive}) => isActive ? 'active-link' : null} to="/host">Host</NavLink>
				<NavLink className={({isActive}) => isActive ? 'active-link' : null} to="/about">About</NavLink>
				<NavLink className={({isActive}) => isActive ? 'active-link' : null} to="/vans">Vans</NavLink>
				<Link className="login-link" to="login"><img className="login-icon" src={imageUrl}/></Link>
				<button onClick={fakeLogOut}>X</button>
			</nav>
		</header>
	);
}