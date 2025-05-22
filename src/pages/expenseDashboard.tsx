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
	const siteThemeColorTailwind = "bg-indigo-400"
	const siteThemeColorHex = "#818cf8" //hex for indigo-500
	const [activeTab, setActiveTab] = useState("home")

	useEffect(() => {
		const url = new URL(window.location.origin + location.search)
		const startDate = url.searchParams.get("startDate") || dateRange.startDate
		const endDate = url.searchParams.get("endDate") || dateRange.endDate
		setDateRange({startDate, endDate})
	}, [location.search]) // Re-run when the URL changes

	return (
		<div className="h-screen overflow-hidden">
			<div className="top-0 left-0 w-full z-99">
				<Header bgColor={siteThemeColorTailwind}></Header>
			</div>
			<div className={`pr-40 pl-40 pt-10  tracking-[0.02em] ${siteThemeColorTailwind} `}>
				<div className="flex w-full relative z-10 h-full p-10 bg-slate-100  rounded-xl shadow-lg ">
					<div className="h-full w-full flex flex-col gap-4 items-center">
						<div
							id="dashboardName"
							className="font-bold flex w-full text-xl "
							style={{
								color: `${siteThemeColorHex}`,
							}}>
							ExpenseSight
						</div>

						<div
							id="section1"
							className="flex w-full justify-between">
							<div className="flex gap-4 text-lg ">
								<div
									onClick={() => {
										setActiveTab("home")
									}}
									className="relative p-2 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
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
									className="relative p-2 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
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
									className="relative p-2 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
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
									className="relative p-2 hover:bg-indigo-100 text-[15px] hover:cursor-pointer">
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
							<MonthPicker
								siteThemeColor={siteThemeColorHex}
								onChange={(month, year) => {
									// You can handle the selected month/year here
									console.log(`Selected: ${month}/${year}`)
								}}
							/>
						</div>
						<div className="w-full">
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
