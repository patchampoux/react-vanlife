import {redirect} from "react-router-dom";

export async function requireAuth(request) {
	const authenticated = localStorage.getItem("loggedin");
	const url = new URL(request.url);
	const pathname = url.pathname;

	if (!authenticated) {
		throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`);
	}
}