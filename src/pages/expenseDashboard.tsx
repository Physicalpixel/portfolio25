import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"
import {timeFormat} from "d3-time-format"
import EDHome from "../components/Dashboards/expenseDashboard/edHome"
import EdAdvancedView from "../components/Dashboards/expenseDashboard/edAdvancedView"
import TechnologiesUsed from "../components/Dashboards/expenseDashboard/technologiesUsed"
import History from "../components/Dashboards/expenseDashboard/history"
import {TbZoomMoney} from "react-icons/tb"

import "../components/Dashboards/expenseDashboard/expenseKpi.css"
import MonthPicker from "../components/Dashboards/expenseDashboard/monthPicker"
import Header from "../components/header"

const filterByDate = (data, startDate, endDate) => {
	const uniqueCategories = [...new Set(data.map((d) => d.category))]
	const start = new Date(startDate)
	const end = new Date(endDate)
	return data.filter(({date: recordDate}) => {
		const currentDate = new Date(recordDate)
		return currentDate >= start && currentDate <= end
	})
}

export default function ExpenseDashboard() {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const location = useLocation() // Get updated URL dynamically
	const formatDate = timeFormat("%Y-%m-%d")
	const [dateRange, setDateRange] = useState({
		startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
		endDate: formatDate(new Date()),
	})

	const siteThemeColorHex = "#6366f1" //hex for indigo-500
	const [activeTab, setActiveTab] = useState("home")
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const url = new URL(window.location.origin + location.search)
		const startDate = url.searchParams.get("startDate") || dateRange.startDate
		const endDate = url.searchParams.get("endDate") || dateRange.endDate
		setDateRange({startDate, endDate})
	}, [location.search]) // Re-run when the URL changes

	return (
		<div className="h-screen overflow-hidden bg-slate-100 p-4">
			<div className="top-0 fixed left-0 w-full z-[99]">
				<Header
					textColor={"text-slate-800"}
					bgColor={"bg-slate-100"}></Header>
			</div>
			<div className="max-w-7xl pt-[100px] mx-auto">
				<div className="mb-8">
					<div className="flex sm:flex-row flex-col sm:justify-between">
						<div>
							<h1 className="text-4xl font-bold text-slate-800 mb-2">ExpenseSight</h1>
							<p className="text-slate-800">Interactive dashboard of daily spending trends by month.</p>
						</div>
						<MonthPicker
							siteThemeColor={siteThemeColorHex}
							onChange={(month, year) => {
								// You can handle the selected month/year here
								console.log(`Selected: ${month}/${year}`)
							}}
						/>
					</div>

					<div className="h-full w-full pt-6 flex flex-col gap-4 items-center">
						<div
							id="section1"
							className="flex  rounded  w-full gap-4 sm:gap-0  flex-col sm:flex-row sm:justify-between">
							<div className="flex gap-6 text-lg ">
								<div
									onClick={() => {
										setActiveTab("home")
									}}
									className="relative text-slate-800 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
									Home
									{activeTab === "home" && (
										<span
											className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-10 rounded-full"
											style={{backgroundColor: siteThemeColorHex}}
										/>
									)}
								</div>
								<div
									onClick={() => {
										setActiveTab("history")
									}}
									className="relative text-slate-800 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
									History
									{activeTab === "history" && (
										<span
											className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-10 rounded-full"
											style={{backgroundColor: siteThemeColorHex}}
										/>
									)}
								</div>

								<div
									onClick={() => {
										setActiveTab("advanced")
									}}
									className="relative text-slate-800 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
									Advanced
									{activeTab === "advanced" && (
										<span
											className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-10 rounded-full"
											style={{backgroundColor: siteThemeColorHex}}
										/>
									)}
								</div>

								<div
									onClick={() => {
										setActiveTab("techno")
									}}
									className="relative text-slate-800 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
									Tech Used
									{activeTab === "techno" && (
										<span
											className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-[2px] w-10 rounded-full"
											style={{backgroundColor: siteThemeColorHex}}
										/>
									)}
								</div>
							</div>
							{/* <button
                     className="bg-red-500 dark:bg-indigo-500 "
                     onClick={() => {
                        setIsDarkMode(!isDarkMode)
                        console.log("got clicked")
                        document.documentElement.classList.toggle("dark")
                     }}>
                     dark mode
                  </button> */}
						</div>
						<div className="w-full pt-4">
							{activeTab === "home" && (
								<div
									className="overflow-y-auto scrollbar-custom"
									style={
										{
											"maxHeight": "calc(100vh - 280px)", // Adjust height if needed
											"--scrollbar-track": "transparent",
											"--scrollbar-thumb": siteThemeColorHex,
											"--scrollbar-thumb-hover": "#888",
										} as React.CSSProperties
									}>
									<EDHome />
								</div>
							)}
							{activeTab === "advanced" && <EdAdvancedView />}
							{activeTab === "techno" && <TechnologiesUsed />}
							{activeTab === "history" && <History />}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
