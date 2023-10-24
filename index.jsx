import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, {loader as vansLoader} from "./pages/Vans/Vans"
import VanDetail, {loader as vanDetailLoader} from "./pages/Vans/VanDetail"
import Login, {loader as loginLoader, action as loginAction} from "./pages/Login"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, {loader as hostVansLoader} from "./pages/Host/HostVans"
import HostVanDetail, {loader as hostVanDetailLoader} from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Error from "./components/Error"
import {requireAuth} from "./utils";

import "./server"

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<Layout/>}>
		<Route index element={<Home/>}/>
		<Route path="about" element={<About/>}/>
		<Route path="vans" element={<Vans/>} loader={vansLoader} errorElement={<Error/>}/>
		<Route path="vans/:id" element={<VanDetail/>} loader={vanDetailLoader} errorElement={<Error/>}/>
		<Route
			path="login"
			element={<Login/>}
			loader={loginLoader}
			action={loginAction}
		/>

		<Route path="host" element={<HostLayout/>}>
			<Route index element={<Dashboard/>} loader={async ({request}) => await requireAuth(request)}/>
			<Route path="income" element={<Income/>} loader={async ({request}) => await requireAuth(request)}/>
			<Route path="reviews" element={<Reviews/>} loader={async ({request}) => await requireAuth(request)}/>
			<Route path="vans" element={<HostVans/>} loader={hostVansLoader} errorElement={<Error/>}/>
			<Route path="vans/:id" element={<HostVanDetail/>} loader={hostVanDetailLoader} errorElement={<Error/>}>
				<Route index element={<HostVanInfo/>}/>
				<Route path="pricing" element={<HostVanPricing/>}/>
				<Route path="photos" element={<HostVanPhotos/>}/>
			</Route>
		</Route>

		<Route path="*" element={<NotFound/>}/>
	</Route>
));

function App() {
	return (
		<RouterProvider router={router}/>
	)
}

ReactDOM
	.createRoot(document.getElementById('root'))
	.render(<App/>);