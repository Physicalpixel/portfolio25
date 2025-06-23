import Header from "../components/header"
import {useState, useEffect} from "react"
import {LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie} from "recharts"
import {aiAdoptionData} from "../data/aiAdoptionData"

export default function RechartsDemo() {
	const [selectedIndustry, setSelectedIndustry] = useState("All")
	const [crossfilterIndustry, setCrossfilterIndustry] = useState(null)
	const [crossfilterTechnology, setCrossfilterTechnology] = useState(null)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const industries = ["All", ...new Set(aiAdoptionData.map((d) => d.industry))]
	const colors = {
		Healthcare: "#e91e63",
		Finance: "#2196f3",
		Retail: "#ff9800",
		Manufacturing: "#4caf50",
		Education: "#9c27b0",
		Transportation: "#f44336",
	}

	// Handle crossfilter click for industry
	const handleIndustryCrossfilterClick = (industry) => {
		if (crossfilterIndustry === industry) {
			setCrossfilterIndustry(null)
		} else {
			setCrossfilterIndustry(industry)
			setCrossfilterTechnology(null) // Clear technology filter when industry is selected
		}
	}

	// Handle crossfilter click for technology
	const handleTechnologyCrossfilterClick = (technology) => {
		if (crossfilterTechnology === technology) {
			setCrossfilterTechnology(null)
		} else {
			setCrossfilterTechnology(technology)
			setCrossfilterIndustry(null) // Clear industry filter when technology is selected
		}
	}

	// Clear all filters
	const clearFilters = () => {
		setCrossfilterIndustry(null)
		setCrossfilterTechnology(null)
		setSelectedIndustry("All")
	}

	// Apply filters
	const getFilteredData = () => {
		let filtered = aiAdoptionData

		// Apply technology filter first
		if (crossfilterTechnology) {
			filtered = filtered.filter((d) => d.primaryTechnology === crossfilterTechnology)
		} else if (crossfilterIndustry) {
			// Apply industry crossfilter
			filtered = filtered.filter((d) => d.industry === crossfilterIndustry)
		} else if (selectedIndustry !== "All") {
			// Apply dropdown filter only if no crossfilter
			filtered = filtered.filter((d) => d.industry === selectedIndustry)
		}

		return filtered
	}

	const filteredData = getFilteredData()

	// Prepare data for adoption trend chart
	const adoptionTrendData = filteredData.reduce((acc, curr) => {
		const key = `${curr.year}Q${curr.quarter}`
		if (!acc[key]) {
			acc[key] = {period: key, year: curr.year, quarter: curr.quarter}
		}
		acc[key][curr.industry] = curr.adoptionRate
		return acc
	}, {})

	const trendData = Object.values(adoptionTrendData).sort((a, b) => (a.year !== b.year ? a.year - b.year : a.quarter - b.quarter))

	// Current adoption rates (2024 data)
	const currentAdoption = filteredData
		.filter((d) => d.year === 2024)
		.map((d) => ({
			industry: d.industry,
			adoptionRate: d.adoptionRate,
			investment: d.investmentMillions,
		}))

	// Investment vs Success Rate scatter data
	const scatterData = filteredData.map((d) => ({
		x: d.investmentMillions,
		y: d.successRate,
		industry: d.industry,
		year: d.year,
	}))

	// Technology distribution data
	const techData = filteredData.reduce((acc, curr) => {
		acc[curr.primaryTechnology] = (acc[curr.primaryTechnology] || 0) + 1
		return acc
	}, {})

	const pieData = Object.entries(techData).map(([tech, count]) => ({
		name: tech,
		value: count,
	}))

	// Grouped bar chart data for 2024
	const groupedBarData = filteredData
		.filter((d) => d.year === 2024)
		.map((d) => ({
			industry: d.industry,
			adoption: d.adoptionRate,
			success: d.successRate,
			roi: d.roiAchievement,
			speed: Math.max(0, 100 - d.deploymentTimeMonths * 8),
			skills: Math.max(0, 100 - d.skillGapIndex * 10),
		}))

	return (
		<div className="min-h-screen bg-gray-900 p-6">
			<div className="top-0 fixed left-0 w-full z-[99]">
				<Header
					textColor={"text-white"}
					bgColor={"bg-gray-900"}></Header>
			</div>
			<div className="max-w-7xl pt-[100px] mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">AI Adoption Dashboard</h1>
					<p className="text-gray-300">Industry insights and trends from 2020-2024</p>

					{/* Controls */}
					<div className="mt-4 ">
						{/* Industry Filter Dropdown */}
						<div>
							<label className="text-gray-300 text-sm mr-2">Filter by Industry:</label>
							<select
								value={selectedIndustry}
								onChange={(e) => setSelectedIndustry(e.target.value)}
								className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								disabled={crossfilterIndustry !== null || crossfilterTechnology !== null}>
								{industries.map((industry) => (
									<option
										key={industry}
										value={industry}>
										{industry}
									</option>
								))}
							</select>
						</div>

						{/* Clear Filters Button */}
						{(crossfilterIndustry || crossfilterTechnology || selectedIndustry !== "All") && (
							<button
								onClick={clearFilters}
								className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500">
								Clear Filters
							</button>
						)}

						{/* Active Filter Indicators */}
						{crossfilterIndustry && <div className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Industry: {crossfilterIndustry}</div>}
						{crossfilterTechnology && <div className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">Technology: {crossfilterTechnology}</div>}
					</div>
				</div>

				{/* Key Metrics Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium text-gray-300 mb-2">Avg Adoption Rate</h3>
						<p className="text-3xl font-bold text-blue-400">{filteredData.length > 0 ? Math.round(filteredData.reduce((sum, d) => sum + d.adoptionRate, 0) / filteredData.length) : 0}%</p>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium text-gray-300 mb-2">Total Investment</h3>
						<p className="text-3xl font-bold text-green-400">${Math.round(filteredData.reduce((sum, d) => sum + d.investmentMillions, 0))}M</p>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium text-gray-300 mb-2">Avg Success Rate</h3>
						<p className="text-3xl font-bold text-purple-400">{filteredData.length > 0 ? Math.round(filteredData.reduce((sum, d) => sum + d.successRate, 0) / filteredData.length) : 0}%</p>
					</div>
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium text-gray-300 mb-2">Avg ROI Achievement</h3>
						<p className="text-3xl font-bold text-orange-400">{filteredData.length > 0 ? Math.round(filteredData.reduce((sum, d) => sum + d.roiAchievement, 0) / filteredData.length) : 0}%</p>
					</div>
				</div>

				{/* Charts Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Adoption Trend Over Time */}
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium mb-4 text-gray-200">AI Adoption Trends</h3>
						<ResponsiveContainer
							width="100%"
							height={300}>
							<LineChart data={trendData}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#4b5563"
								/>
								<XAxis
									dataKey="period"
									stroke="#d1d5db"
								/>
								<YAxis stroke="#d1d5db" />
								<Tooltip
									contentStyle={{
										backgroundColor: "#374151",
										border: "none",
										borderRadius: "8px",
										color: "#f3f4f6",
									}}
								/>
								<Legend />
								{Object.keys(colors).map((industry) => (
									<Line
										key={industry}
										type="monotone"
										dataKey={industry}
										stroke={colors[industry]}
										strokeWidth={3}
										dot={{r: 4}}
										onClick={() => handleIndustryCrossfilterClick(industry)}
										style={{cursor: "pointer"}}
									/>
								))}
							</LineChart>
						</ResponsiveContainer>
					</div>

					{/* Current Adoption Rates */}
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium mb-4 text-gray-200">2024 Adoption Rates</h3>
						<ResponsiveContainer
							width="100%"
							height={300}>
							<BarChart data={currentAdoption}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#4b5563"
								/>
								<XAxis
									dataKey="industry"
									angle={-45}
									textAnchor="end"
									height={80}
									stroke="#d1d5db"
								/>
								<YAxis stroke="#d1d5db" />
								<Tooltip
									contentStyle={{
										backgroundColor: "#374151",
										border: "none",
										borderRadius: "8px",
										color: "#f3f4f6",
									}}
								/>
								<Bar
									dataKey="adoptionRate"
									name="Adoption Rate (%)"
									onClick={(data) => handleIndustryCrossfilterClick(data.industry)}
									style={{cursor: "pointer"}}>
									{currentAdoption.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[entry.industry]}
											opacity={crossfilterIndustry && crossfilterIndustry !== entry.industry ? 0.3 : 1}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Investment vs Success Rate */}
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Investment vs Success Rate</h3>
						<ResponsiveContainer
							width="100%"
							height={300}>
							<ScatterChart data={scatterData}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#4b5563"
								/>
								<XAxis
									dataKey="x"
									name="Investment"
									unit="M$"
									stroke="#d1d5db"
									label={{value: "Investment (Millions $)", position: "insideBottom", offset: -10, fill: "#d1d5db"}}
								/>
								<YAxis
									dataKey="y"
									name="Success Rate"
									unit="%"
									stroke="#d1d5db"
									label={{value: "Success Rate (%)", angle: -90, position: "insideLeft", fill: "#d1d5db"}}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "#374151",
										border: "none",
										borderRadius: "8px",
										color: "#f3f4f6",
									}}
									formatter={(value, name) => [name === "x" ? `$${value}M` : `${value}%`, name === "x" ? "Investment" : "Success Rate"]}
									labelFormatter={(label, payload) => (payload?.[0] ? `${payload[0].payload.industry} (${payload[0].payload.year})` : "")}
								/>
								<Scatter
									name="Projects"
									fill="#06b6d4"
									onClick={(data) => handleIndustryCrossfilterClick(data.industry)}
									style={{cursor: "pointer"}}
								/>
							</ScatterChart>
						</ResponsiveContainer>
					</div>

					{/* Technology Distribution */}
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-medium mb-4 text-gray-200">Primary Technology Distribution</h3>
						<ResponsiveContainer
							width="100%"
							height={300}>
							<PieChart>
								<Pie
									data={pieData}
									cx="50%"
									cy="50%"
									outerRadius={80}
									dataKey="value"
									label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
									labelStyle={{fill: "#f3f4f6", fontSize: "12px"}}
									stroke="#1f2937"
									strokeWidth={2}
									onClick={(data, index) => {
										handleTechnologyCrossfilterClick(data.name)
									}}
									style={{cursor: "pointer"}}>
									{pieData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={`hsl(${200 + index * 40}, 65%, 55%)`}
											style={{cursor: "pointer"}}
										/>
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: "#374151",
										border: "none",
										borderRadius: "8px",
										color: "#f3f4f6",
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>

					{/* Industry Performance Grouped Bar Chart */}
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2">
						<h3 className="text-lg font-medium mb-4 text-gray-200">2024 Industry Performance Comparison</h3>
						<ResponsiveContainer
							width="100%"
							height={400}>
							<BarChart
								data={groupedBarData}
								margin={{top: 20, right: 30, left: 20, bottom: 80}}
								barCategoryGap="10%">
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#4b5563"
								/>
								<XAxis
									dataKey="industry"
									stroke="#d1d5db"
									tick={{fill: "#d1d5db", fontSize: 10}}
									angle={-45}
									textAnchor="end"
									height={80}
								/>
								<YAxis
									domain={[0, 100]}
									stroke="#d1d5db"
									tick={{fill: "#d1d5db", fontSize: 11}}
									label={{value: "Score (%)", angle: -90, position: "insideLeft", fill: "#d1d5db"}}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "#374151",
										border: "none",
										borderRadius: "8px",
										color: "#f3f4f6",
									}}
									formatter={(value, name) => [`${Math.round(value)}%`, name]}
								/>
								<Legend />
								<Bar
									dataKey="adoption"
									name="Adoption Rate"
									fill="#3b82f6"
									onClick={(data) => handleIndustryCrossfilterClick(data.industry)}
									style={{cursor: "pointer"}}
								/>
								<Bar
									dataKey="success"
									name="Success Rate"
									fill="#10b981"
									onClick={(data) => handleIndustryCrossfilterClick(data.industry)}
									style={{cursor: "pointer"}}
								/>
								<Bar
									dataKey="roi"
									name="ROI Achievement"
									fill="#f59e0b"
									onClick={(data) => handleIndustryCrossfilterClick(data.industry)}
									style={{cursor: "pointer"}}
								/>
								<Bar
									dataKey="speed"
									name="Deployment Speed"
									fill="#8b5cf6"
									onClick={(data) => handleIndustryCrossfilterClick(data.industry)}
									style={{cursor: "pointer"}}
								/>
								<Bar
									dataKey="skills"
									name="Skills Availability"
									fill="#ef4444"
									onClick={(data) => handleIndustryCrossfilterClick(data.industry)}
									style={{cursor: "pointer"}}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-8 text-center text-gray-400">
					<p>AI Adoption Dashboard • Data spans 2020-2024 • Updated June 2025</p>
				</div>
			</div>
		</div>
	)
}
