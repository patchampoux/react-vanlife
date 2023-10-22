import React from "react"
import {Link, NavLink, Outlet, useLoaderData} from "react-router-dom"
import {getVan} from "../../api"
import {requireAuth} from "../../utils";

export async function loader({params}) {
	await requireAuth()
	return getVan(params.id);
}

export default function HostVanDetail() {
	const van = useLoaderData();

	const activeStyles = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616"
	}

	return (
		<section>
			<Link
				to=".."
				relative="path"
				className="back-button"
			>&larr; <span>Back to all vans</span></Link>
			{van &&
				<div className="host-van-detail-layout-container">
					<div className="host-van-detail">
						<img src={van.imageUrl} alt={`Photo of ${van.name}`}/>
						<div className="host-van-detail-info-text">
							<i
								className={`van-type van-type-${van.type}`}
							>
								{van.type}
							</i>
							<h3>{van.name}</h3>
							<h4>${van.price}/day</h4>
						</div>
					</div>

					<nav className="host-van-detail-nav">
						<NavLink
							to="."
							end
							style={({isActive}) => isActive ? activeStyles : null}
						>
							Details
						</NavLink>
						<NavLink
							to="pricing"
							style={({isActive}) => isActive ? activeStyles : null}
						>
							Pricing
						</NavLink>
						<NavLink
							to="photos"
							style={({isActive}) => isActive ? activeStyles : null}
						>
							Photos
						</NavLink>
					</nav>
					<Outlet context={{van}}/>
				</div>}
		</section>
	)
}
