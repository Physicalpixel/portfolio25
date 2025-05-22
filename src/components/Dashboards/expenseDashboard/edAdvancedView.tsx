import {useState, useEffect} from "react"
import ReactECharts from "echarts-for-react"
import {useLocation} from "react-router-dom"
import ChartTile from "./chartTile"
import {timeFormat} from "d3-time-format"
import {data} from "../../../data/expenditure_income"

interface EDHome {
	merchant_name: any
	amount: any
}

const filterByDate = (data, startDate, endDate) => {
	const start = new Date(startDate)
	const end = new Date(endDate)
	return data.filter(({date: recordDate}) => {
		const currentDate = new Date(recordDate)
		return currentDate >= start && currentDate <= end
	})
}

export default function EdAdvancedView() {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const location = useLocation() // Get updated URL dynamically
	const formatDate = timeFormat("%Y-%m-%d")
	const [dateRange, setDateRange] = useState({
		startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
		endDate: formatDate(new Date()),
	})
	const [filteredData, setFilteredData] = useState([])

	useEffect(() => {
		const url = new URL(window.location.origin + location.search)
		const startDate = url.searchParams.get("startDate") || dateRange.startDate
		const endDate = url.searchParams.get("endDate") || dateRange.endDate
		setDateRange({startDate, endDate})
	}, [location.search]) // Re-run when the URL changes

	useEffect(() => {
		console.log("this is coming from filter use effect", dateRange.endDate)
		setFilteredData(filterByDate(data, dateRange.startDate, dateRange.endDate))
	}, [dateRange]) // Re-run when dateRange updates

	const formattedDataTopMerchants = filteredData.reduce((acc: any, {merchant_name, amount}) => {
		acc[merchant_name] = (acc[merchant_name] || 0) + amount
		return acc
	}, {})

	const formattedDataTopMerchantType = filteredData.reduce((acc: any, {category, amount}) => {
		acc[category] = (acc[category] || 0) + amount
		return acc
	}, {})

	const optionsTopMerchantType = {
		title: {},
		grid: {top: 48, right: 8, bottom: 54, left: 20, containLabel: true},
		yAxis: {
			// axisLabel: {inside: true},
			type: "category",
			data: Object.keys(formattedDataTopMerchantType),
		},
		xAxis: {
			type: "value",
		},
		series: [
			{
				data: Object.values(formattedDataTopMerchantType),
				type: "bar",
				smooth: true,
			},
		],
		tooltip: {
			trigger: "axis",
		},
	}
	const optionsTopMerchants = {
		grid: {top: 48, right: 8, bottom: 54, left: 20, containLabel: true},
		yAxis: {
			// axisLabel: {inside: true},
			type: "category",
			data: Object.keys(formattedDataTopMerchants),
		},
		xAxis: {
			type: "value",
		},
		series: [
			{
				data: Object.values(formattedDataTopMerchants),
				type: "bar",
				smooth: true,
			},
		],
		tooltip: {
			trigger: "axis",
		},
	}

	const optionsIncomeVsSpent = {
		grid: {top: 48, right: 8, bottom: 54, left: 20, containLabel: true},
		yAxis: {
			// axisLabel: {inside: true},
			type: "value",
			data: Object.values(formattedDataTopMerchants),
		},
		xAxis: {
			type: "category",
		},
		series: [
			{
				data: Object.keys(formattedDataTopMerchants),
				type: "line",
				smooth: true,
			},
		],
		tooltip: {
			trigger: "axis",
		},
	}

	return (
		<div className="h-full w-full flex flex-col gap-4 items-center">
			<div
				id="section4"
				className=" w-full flex gap-4">
				<ChartTile
					title={"Top Merchants"}
					chart={<ReactECharts option={optionsTopMerchantType} />}></ChartTile>
				<ChartTile
					title={"Top Merchants"}
					chart={<ReactECharts option={optionsTopMerchants} />}></ChartTile>
				<ChartTile
					title={"Top Merchants"}
					chart={<ReactECharts option={optionsIncomeVsSpent} />}></ChartTile>
			</div>
		</div>
	)
}
