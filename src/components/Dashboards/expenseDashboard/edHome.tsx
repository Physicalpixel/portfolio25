import {data} from "../../../data/expenditure_income"
import {useState, useEffect} from "react"
import ReactECharts from "echarts-for-react"
import {useLocation} from "react-router-dom"
import {GrCafeteria, GrNext, GrPrevious} from "react-icons/gr"

import {FaHandHoldingDollar, FaSackDollar, FaMoneyBillTrendUp, FaHeart} from "react-icons/fa6"
import {X} from "tabler-icons-react"
import {timeFormat} from "d3-time-format"
import Icons from "./icons"
import Transactions from "./transactions"
import {spentGaugeOption} from "./echartChartOptions"
import HomeTile from "./homeTile"
import Tile from "./tile"
import ChartTile from "./chartTile"
import HeatmapNivo from "./heatmapNivo"
import sampleData from "../../../data/sampleData"

interface EDHome {
	merchant_name: any
	amount: any
}

const filterByDate = (data, startDate, endDate) => {
	const uniqueCategories = [...new Set(data.map((d) => d.category))]
	console.log(uniqueCategories)
	const start = new Date(startDate)
	const end = new Date(endDate)
	return data.filter(({date: recordDate}) => {
		const currentDate = new Date(recordDate)
		return currentDate >= start && currentDate <= end
	})
}
// if (totalValue <= goalValue) {
// 	pointerColor = "#818cf8" // green
// } else if (totalValue <= goalValue + goalValue * 0.25) {
// 	pointerColor = "#fbbf24" // orange
// } else {
// 	pointerColor = "#f87171" // red
// }

const filterAndSumByDate = (data, year) => {
	const result = []
	const sumByDate = {}

	data.forEach(({date, amount, credit_debit}) => {
		if (credit_debit === "debit" && date.startsWith(year)) {
			sumByDate[date] = (sumByDate[date] || 0) + amount
		}
	})

	for (const [date, sum] of Object.entries(sumByDate)) {
		result.push({value: sum, day: date})
	}

	return result
}

const cashFlowIO = (data, debit_credit) => {
	return data.reduce((total, {amount, credit_debit}) => {
		if (credit_debit == debit_credit) {
			return total + amount
		}
		return total
	}, 0)
}

const findTopMerchant = (data) => {
	const merchantTotals = data.reduce((acc, {merchant_name, amount, credit_debit, category}) => {
		if (credit_debit !== "credit" && category !== "Mortgage") {
			acc[merchant_name] = (acc[merchant_name] || 0) + amount
		}
		return acc
	}, {})

	return Object.entries(merchantTotals).reduce((max, [merchant, total]) => (total > max.amount ? {merchant, amount: total} : max), {merchant: null, amount: 0})
}

export default function EDHome() {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const location = useLocation() // Get updated URL dynamically
	const formatDate = timeFormat("%Y-%m-%d")
	const dateTextFormat = timeFormat("%b %d, %Y")

	const [dateRange, setDateRange] = useState({
		startDate: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
		endDate: formatDate(new Date()),
	})
	const siteThemeColorTailwind = "bg-indigo-400"
	const siteThemeColorHex = "#FFFFFF" //hex for indigo-500
	const siteThemeColorHexforSmIcons = "#c084fc"
	const [filteredData, setFilteredData] = useState([])

	const [activeTab, setActiveTab] = useState([])

	useEffect(() => {
		const url = new URL(window.location.origin + location.search)
		const startDate = url.searchParams.get("startDate") || dateRange.startDate
		const endDate = url.searchParams.get("endDate") || dateRange.endDate
		setDateRange({startDate, endDate})
	}, [location.search]) // Re-run when the URL changes

	useEffect(() => {
		setFilteredData(filterByDate(data, dateRange.startDate, dateRange.endDate))
	}, [dateRange]) // Re-run when dateRange updates
	const startDateforTypicalSpending = new Date(dateRange.startDate)
	const pastSixMonthsData = filterByDate(data, startDateforTypicalSpending.setMonth(startDateforTypicalSpending.getMonth() - 6), dateRange.endDate)
	const avgMoneySpentLastSixMonths = cashFlowIO(pastSixMonthsData, "debit") / 6
	const avgMoneyReceivedLastSixMonths = cashFlowIO(pastSixMonthsData, "credit") / 6
	const totalMoneySpent = cashFlowIO(filteredData, "debit")
	const totalMoneyReceived = cashFlowIO(filteredData, "credit")
	const totalBalance = totalMoneyReceived - totalMoneySpent

	const topMerchant = findTopMerchant(filteredData)

	const findMaxDebitAmount = (data) => {
		return data
			.filter(({credit_debit}) => credit_debit === "debit") // Filter only debit transactions
			.reduce((max, {amount}) => Math.max(max, amount), 0) // Find max amount
	}
	const findMinDebitAmount = (data) => {
		return data
			.filter(({credit_debit}) => credit_debit === "debit") // Filter only debit transactions
			.reduce((min, {amount}) => Math.min(min, amount), 0) // Find max amount
	}

	const minDebitAmount = findMinDebitAmount(filteredData)
	const maxDebitAmount = findMaxDebitAmount(filteredData)
	console.log(filterAndSumByDate(filteredData, dateRange.endDate.split("-")[0]))
	const optionsExpenseHeatmap = {
		visualMap: {
			min: minDebitAmount,
			max: maxDebitAmount,
			calculable: true,
			orient: "horizontal",
			left: "center", //this is the position of the  slider legend
			bottom: "-0%",
			inRange: {
				color: isDarkMode ? ["#314158", `${siteThemeColorHex}`] : ["white", `${siteThemeColorHex}`], //this is the color of the slider legend
			},
			itemHeight: 840,
			itemWidth: 15,
		},

		tooltip: {
			position: "top",
			formatter: function (p: any) {
				return p.data[0] + " : " + "$" + p.data[1]
			},
		},
		calendar: [
			{
				orient: "horizontal",
				range: dateRange.endDate.split("-")[0],
				cellSize: ["auto", "25"],
				itemStyle: {
					borderWidth: 0, // Keeps the border
					borderColor: "rgba(0,0,0,0.1)",
					shadowBlur: 1, // Adjusts the intensity of the shadow
					shadowColor: "rgba(0,0,0, 0.1)", // Correct shadow color
					shadowOffsetX: 0, // Adjusts horizontal shadow position (0 keeps it centered)
					shadowOffsetY: 0, // Adjusts vertical shadow position (0 keeps it centered)
				},

				splitLine: {
					show: false,
				},
				yearLabel: {show: false},
			},
		],

		series: [
			{
				type: "scatter",
				symbol: "roundRect",
				symbolSize: 20,
				coordinateSystem: "calendar",
				label: {
					show: false,
					formatter: function (params: any) {
						return new Date(params.data[0]).getDate()
					},
					position: "inside",
					color: "white",
					fontSize: 8,
					opacity: 0.4,
				},
				calendarIndex: 0,
				data: filterAndSumByDate(filteredData, dateRange.endDate.split("-")[0]),
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
			},
		],
	}

	const date = new Date(dateRange.endDate)
	const monthName = date.toLocaleString("default", {month: "long"})

	const categoriesList = [
		{desc: "Mortgage", category: "Mortgage", value: 0},
		{desc: "Utility", category: "Utility", value: 0},
		{desc: "Cash Withdrawal", category: "Cash Withdrawal", value: 0},
		{desc: "Insurance", category: "Insurance", value: 0},
		{desc: "Medical Expenses", category: "Medical", value: 0},
		{desc: "Shopping", category: "Shopping", value: 0},
		{desc: "Travel", category: "Cab", value: 0},
		{desc: "Grocery", category: "Grocery", value: 0},
		{desc: "Eating Outside", category: "Food", value: 0},
		{desc: "Wellness", category: "Wellness", value: 0},
		{desc: "Salary", category: "Salary", value: 0},
	]

	filteredData.forEach((entry) => {
		const categoryIndex = categoriesList.findIndex((cat) => cat.category === entry.category)
		if (categoryIndex !== -1) {
			categoriesList[categoryIndex].value += entry.amount
		}
	})

	const [emojiStatus, setEmojiStatus] = useState("confused") // or any default

	useEffect(() => {
		if (totalMoneySpent <= avgMoneySpentLastSixMonths) {
			setEmojiStatus("happy")
		} else if (totalMoneySpent > avgMoneySpentLastSixMonths + avgMoneySpentLastSixMonths * 0.25) {
			setEmojiStatus("sad")
		} else {
			setEmojiStatus("confused")
		}
	}, [totalMoneySpent, avgMoneySpentLastSixMonths])

	const ifOverSpending = (totalMoneySpent - avgMoneySpentLastSixMonths).toFixed(2)
	var totalSpentComment = ""
	if (totalMoneySpent <= avgMoneySpentLastSixMonths) {
		totalSpentComment = "At par with typical spending"
	} else if (totalMoneySpent > avgMoneySpentLastSixMonths) {
		totalSpentComment = `$${ifOverSpending} over typical spending`
	}
	return (
		<div className="h-full w-full relative flex flex-col gap-4 items-center">
			{activeTab.length !== 0 && (
				<div className="absolute z-50 w-full item-center  h-full justify-center flex flex-row bg-white/80 p-4 ">
					<Transactions transactions={activeTab}></Transactions>
					<div
						onClick={() => {
							setActiveTab([])
						}}
						className="p-1 w-10 h-10 cursor-pointer">
						<X
							strokeWidth={4}
							size={30}
							className="text-slate-800 text-xl bg-red-200 rounded-md p-1"></X>
					</div>
				</div>
			)}

			<div className="grid md:grid-cols-2 grid-cols-1 grid-rows-3 gap-4 w-full">
				<div className="rounded-lg row-span-3">
					<HomeTile
						status={emojiStatus}
						month={monthName}
						totalMoney={totalMoneySpent}
						siteThemeColor={siteThemeColorHex}
						comment={totalSpentComment}
						chart={""}
					/>
				</div>
				<div className=" rounded-lg h-32">
					<Tile
						siteThemeColor={siteThemeColorHex}
						title={"Total Received"}
						value={totalMoneyReceived}
						icon={<FaHandHoldingDollar className="text-5xl bg-indigo-100 text-indigo-400 p-2" />}
					/>
				</div>
				<div className=" rounded-lg h-32">
					<Tile
						siteThemeColor={siteThemeColorHex}
						title={"Total Balance"}
						value={totalBalance}
						icon={<FaSackDollar className="text-5xl bg-blue-100 text-blue-400 p-2" />}
					/>
				</div>
				<div className=" rounded-lg h-32">
					<Tile
						siteThemeColor={siteThemeColorHex}
						title={"Top Expense"}
						value={topMerchant.merchant}
						icon={<FaMoneyBillTrendUp className=" bg-purple-100 text-purple-400 text-5xl p-2" />}
					/>
				</div>
			</div>
			<div className=" gap-4 flex flex-wrap h-full w-full">
				{categoriesList
					.filter((category) => category.category !== "Salary")
					.sort((a, b) => b.value - a.value) // Remove Salary first
					.map((category) => (
						<div
							onClick={() => {
								const transactions = filteredData.filter((entry) => entry.category === category.category)
								setActiveTab([siteThemeColorHex, category.category, transactions])
							}}
							key={category.category}
							className="relative group  w-[calc((100%-4rem)/5)]  lg:rounded-none rounded-xl flex  p-4 bg-white items-center justify-center cursor-pointer  shadow-md transition-all duration-500 ease-in-out hover:shadow-xl">
							{/* Tooltip */}
							<div
								className="absolute top-full left-1/2 z-10 transform -translate-x-1/2 
               						 bg-red-200 text-slate-800 text-center  p-2 
               							opacity-0 group-hover:opacity-100 text-sm 
               							invisible group-hover:visible 
               							transition-all duration-500 ease-in-out 
               							shadow-xl ">
								{category.desc} {/* Tooltip content */}
								<div
									className="absolute bottom-full left-1/2 transform -translate-x-1/2 
                 								w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent 
                 							 border-b-red-200"></div>
							</div>
							{/* CategoryTile */}
							<div className="flex w-1/5  bg-white text-center flex-col items-center  justify-center">
								<div className="  ">
									{
										<Icons
											category={category.category}
											color={`${siteThemeColorHexforSmIcons}`}
										/>
									}
								</div>
								<div className="font-semibold text-slate-800"> ${category.value}</div>
							</div>
						</div>
					))}
			</div>

			<HeatmapNivo
				data={filterAndSumByDate(filteredData, dateRange.endDate.split("-")[0])}
				fromDate={dateRange.startDate}
				toDate={dateRange.endDate}></HeatmapNivo>
		</div>
	)
}
