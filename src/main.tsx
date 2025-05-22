import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {HashRouter} from "react-router-dom"
import "./index.css" // if you're using Tailwind

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<HashRouter basename="/">
			<App />
		</HashRouter>
	</React.StrictMode>
)
