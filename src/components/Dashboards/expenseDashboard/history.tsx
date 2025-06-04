import {useState, useEffect} from "react"
import ReactECharts from "echarts-for-react"
import {useLocation} from "react-router-dom"
import {GrCafeteria, GrNext, GrPrevious} from "react-icons/gr"
import Tile from "./tile"
import ChartTile from "./chartTile"
import {FaHandHoldingDollar, FaSackDollar, FaMoneyBillTrendUp, FaHeart} from "react-icons/fa6"
import {X} from "tabler-icons-react"
import {timeFormat} from "d3-time-format"
import Transactions from "./transactions"
import Icons from "./icons"
import {spentGaugeOption} from "./echartChartOptions"
import HomeTile from "./homeTile"

import {data} from "../../../data/expenditure_income"

interface historyProps {
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
		result.push([date, sum])
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

export default function History() {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const location = useLocation() // Get updated URL dynamically
	const formatDate = timeFormat("%Y-%m-%d")
	const dateTextFormat = timeFormat("%b %d, %Y")

	const [dateRange, setDateRange] = useState({
		startDate: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
		endDate: formatDate(new Date()),
	})
	const siteThemeColorTailwind = "bg-indigo-400"
	const siteThemeColorHex = "#818cf8" //hex for indigo-500
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

	// if the year = current year, filter data based on the current date  till the january 1 of the current year,
	// if the year selected is less than current year, then filter the data for the entire year

	return (
		<div className="h-screen w-full relative flex flex-col gap-4 items-center  ">
			{/* {activeTab.length !== 0 && (
				<div className="absolute z-50 w-full item-center rounded-md h-full justify-center flex flex-row  bg-opacity-80 p-4 bg-white">
					<Transactions transactions={activeTab}></Transactions>
					<div
						onClick={() => {
							setActiveTab([])
						}}
						className="p-1 w-10 h-10 cursor-pointer">
						<X
							strokeWidth={4}
							size={30}
							className="text-slate-800 text-xl  bg-red-200 rounded-md p-1"></X>
					</div>
				</div>
			)}
			<div className="w-full h-full flex flex-col gap-4 pr-2 ">
				<div
					id="section2"
					className="flex gap-4  w-full">
					<div className="w-full flex gap-4">
						<div
							id="totalSpentEmoji"
							className="flex gap-4">
							<HomeTile
								status={emojiStatus}
								month={monthName}
								totalMoney={totalMoneySpent}
								siteThemeColor={siteThemeColorHex}
								comment={totalSpentComment}
								chart={""}></HomeTile>
							<HomeTile
								status={""}
								month={"July"}
								totalMoney={null}
								siteThemeColor={""}
								comment={""}
								chart={""}></HomeTile>
							<HomeTile
								status={""}
								month={"July"}
								totalMoney={null}
								siteThemeColor={""}
								comment={""}
								chart={""}></HomeTile>
							<HomeTile
								status={""}
								month={"July"}
								totalMoney={null}
								siteThemeColor={""}
								comment={""}
								chart={""}></HomeTile>
						</div>
					</div>
				</div>
			</div> */}

			<div className="font-semibold text-6xl opacity-25 ">Work in Progress...</div>
		</div>
	)
}
