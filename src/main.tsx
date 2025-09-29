import React from "react"
import ReactDOM from "react-dom/client"
import {HashRouter, Routes, Route} from "react-router-dom"
import ExpenseDashboard from "./pages/expenseDashboard"
import Index from "./pages/index"
import LwmHome from "./pages/lwmHome"
import RechartsDemo from "./pages/rechartsDemo"
import PerfCompare from "./pages/perfCompare"
import StickyStackingLayout from "./pages/framerTest"
import Crud from "./pages/crud"
import "./index.css" // if you're using Tailwind

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<HashRouter basename="/">
			<Routes>
				<Route
					path="/"
					element={<Index />}
				/>
				<Route
					path="/lwmHome"
					element={<LwmHome />}
				/>
				<Route
					path="/expenseDashboard"
					element={<ExpenseDashboard />}
				/>
				<Route
					path="/rechartsDemo"
					element={<RechartsDemo />}
				/>
				<Route
					path="/perfCompare"
					element={<PerfCompare />}
				/>
				<Route
					path="/framerTest"
					element={<StickyStackingLayout />}
				/>
				<Route
					path="/crud"
					element={<Crud />}
				/>
			</Routes>
		</HashRouter>
	</React.StrictMode>
)
