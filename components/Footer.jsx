import React from "react";

export default function footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer>&#169; {currentYear} #VANLIFE</footer>
	);
}