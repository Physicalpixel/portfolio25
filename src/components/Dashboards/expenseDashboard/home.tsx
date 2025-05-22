import {data} from "../../../data/expenditure_income"
import {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"
import {timeFormat} from "d3-time-format"import EDHome from "./edHome"
import EdAdvancedView from "./edAdvancedView"
import TechnologiesUsed from "./technologiesUsed"
import History from "./history"
import {TbZoomMoney} from "react-icons/tb"

import ".expenseKpi.css"
import MonthPicker from "./monthPicker"
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
		<div
			className={`pr-40 pl-40 pt-10 h-[2000px] tracking-[0.02em] ${siteThemeColorTailwind} `}
			// style={{
			// 	backgroundPositionX: "center",
			// 	backgroundImage: "url('./images/tree_sunlight.jpg')",
			// }}
		>
			<TbZoomMoney className="absolute text-[950px] top-15 left-[-15%] opacity-10  text-indigo-50 z-0" />

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
						<div className="flex gap-4 text-lg dark:text-white">
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
	)
}
