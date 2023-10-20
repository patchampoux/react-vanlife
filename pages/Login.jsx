import React, {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {loginUser} from "../api";

export default function Login() {
	const [loginFormData, setLoginFormData] = React.useState({email: "", password: ""})
	const location = useLocation();
	const navigate = useNavigate();
	const [status, setStatus] = useState('idle');
	const [error, setErrror] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();

		const redirectPath = location.state?.from || '/host';

		setStatus('submitting');

		try {
			await loginUser(loginFormData);

			setErrror(null);

			localStorage.setItem("loggedin", true)

			navigate(redirectPath, {
				replace: true
			});
		} catch (err) {
			setErrror(err);
		} finally {
			setStatus('idle');
		}
	}

	function handleChange(e) {
		const {name, value} = e.target
		setLoginFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	return (
		<div className="login-container">
			{location.state?.message && <h3 className="login-error">{location.state.message}</h3>}
			<h1>Sign in to your account</h1>
			{error?.message && <h3 className="login-error">{error.message}</h3>}
			<form onSubmit={handleSubmit} className="login-form">
				<input
					name="email"
					onChange={handleChange}
					type="email"
					placeholder="Email address"
					value={loginFormData.email}
				/>
				<input
					name="password"
					onChange={handleChange}
					type="password"
					placeholder="Password"
					value={loginFormData.password}
				/>
				<button
					aria-disabled={status === 'submitting'}
					disabled={status === 'submitting'}
				>
					{status === 'submitting' ? 'Logging in...' : 'Log in'}
				</button>
			</form>
		</div>
	)

}