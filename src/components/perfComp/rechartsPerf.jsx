import React, {useState, useMemo} from "react"
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts"

const RechartsPerformanceDemo = () => {
	const [dataSize, setDataSize] = useState(1000)
	const [renderTime, setRenderTime] = useState(0)

	// Generate data with specified size
	const data = useMemo(() => {
		const startTime = performance.now()

		const result = []
		let y = 100

		for (let i = 0; i < dataSize; i++) {
			y += Math.round(Math.random() * 20 - 10) // Random walk
			result.push({
				x: i,
				y: y,
				timestamp: new Date(2024, 0, 1, 0, 0, i).toISOString(),
			})
		}

		const endTime = performance.now()
		setRenderTime(endTime - startTime)

		return result
	}, [dataSize])

	const handleSizeChange = (size) => {
		setDataSize(size)
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Recharts Performance Demo</h1>

				{/* Controls */}
				<div className="bg-white p-4 rounded-lg shadow-md mb-6">
					<h2 className="text-lg font-semibold mb-4">Dataset Size Controls</h2>
					<div className="flex flex-wrap gap-2 mb-4">
						{[500, 1000, 2000, 3000, 5000, 8000, 10000, 50000, 100000].map((size) => (
							<button
								key={size}
								onClick={() => handleSizeChange(size)}
								className={`px-4 py-2 rounded transition-colors ${dataSize === size ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}>
								{size.toLocaleString()} points
							</button>
						))}
					</div>

					{/* Performance Stats */}
					<div className="bg-gray-100 p-3 rounded">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
							<div>
								<span className="font-semibold">Data Points:</span> {dataSize.toLocaleString()}
							</div>
							<div>
								<span className="font-semibold">Data Gen Time:</span> {renderTime.toFixed(2)}ms
							</div>
							<div>
								<span className="font-semibold">Memory Usage:</span> ~{((dataSize * 48) / 1024 / 1024).toFixed(1)}MB
							</div>
							<div className={`font-semibold ${dataSize <= 2000 ? "text-green-600" : dataSize <= 5000 ? "text-yellow-600" : dataSize <= 10000 ? "text-orange-600" : dataSize <= 50000 ? "text-red-600" : "text-red-800 animate-pulse"}`}>Performance: {dataSize <= 2000 ? "Good" : dataSize <= 5000 ? "Slow" : dataSize <= 10000 ? "Very Slow" : dataSize <= 50000 ? "Extreme Risk" : "Browser Killer"}</div>
						</div>
					</div>
				</div>

				{/* Performance Warning */}
				{dataSize >= 100000 && (
					<div className="bg-red-200 border-2 border-red-600 text-red-800 px-4 py-3 rounded mb-6 animate-pulse">
						<strong>🚨 CRITICAL WARNING:</strong> {dataSize.toLocaleString()} points WILL crash most browsers! This is only for testing limits. Use Canvas/WebGL libraries for production.
					</div>
				)}

				{dataSize >= 50000 && dataSize < 100000 && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
						<strong>⚠️ EXTREME WARNING:</strong> {dataSize.toLocaleString()} points will likely crash your browser tab! This is for demonstration only. Consider using Canvas-based libraries instead.
					</div>
				)}

				{dataSize > 10000 && dataSize < 50000 && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
						<strong>Warning:</strong> Recharts performance degrades significantly with {dataSize.toLocaleString()} points. Chart may become unresponsive or cause render blocking.
					</div>
				)}

				{dataSize > 5000 && dataSize <= 10000 && (
					<div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded mb-6">
						<strong>Caution:</strong> {dataSize.toLocaleString()} points may cause noticeable performance issues. Interactions may become slow or laggy.
					</div>
				)}

				{dataSize > 2000 && dataSize <= 5000 && (
					<div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
						<strong>Notice:</strong> You may experience slower rendering and interactions with {dataSize.toLocaleString()} points.
					</div>
				)}

				{/* Chart Container */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4">Line Chart - {dataSize.toLocaleString()} Data Points</h2>

					<div style={{width: "100%", height: "400px"}}>
						<ResponsiveContainer>
							<LineChart data={data}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="x"
									domain={["dataMin", "dataMax"]}
									type="number"
								/>
								<YAxis />
								<Tooltip
									formatter={(value, name) => [value, "Value"]}
									labelFormatter={(label) => `Point ${label}`}
								/>
								<Line
									type="monotone"
									dataKey="y"
									stroke="#8884d8"
									strokeWidth={1}
									dot={false} // Disable dots for better performance
									isAnimationActive={false} // Disable animation for better performance
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Performance Tips */}
				<div className="bg-white p-6 rounded-lg shadow-md mt-6">
					<h3 className="text-lg font-semibold mb-3">Performance Optimization Tips for Recharts:</h3>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>
							Set <code className="bg-gray-100 px-1 rounded">dot={`{false}`}</code> to disable individual point rendering
						</li>
						<li>
							Set <code className="bg-gray-100 px-1 rounded">isAnimationActive={`{false}`}</code> to disable animations
						</li>
						<li>Use data decimation - show every nth point instead of all points</li>
						<li>Implement data windowing/virtualization for time series</li>
						<li>Consider switching to Canvas-based libraries (CanvasJS, ECharts) for &gt;5K points</li>
						<li>
							Use <code className="bg-gray-100 px-1 rounded">React.memo</code> to prevent unnecessary re-renders
						</li>
					</ul>
				</div>

				{/* Alternative Suggestions */}
				<div className="bg-blue-50 p-6 rounded-lg shadow-md mt-6">
					<h3 className="text-lg font-semibold mb-3 text-blue-800">Better Alternatives for Large Datasets:</h3>
					<div className="grid md:grid-cols-2 gap-4 text-blue-700">
						<div>
							<h4 className="font-semibold">Canvas-Based:</h4>
							<ul className="list-disc list-inside ml-4">
								<li>ECharts (1M+ points)</li>
								<li>CanvasJS (100K+ points)</li>
								<li>Chart.js (50K+ points)</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold">WebGL-Based:</h4>
							<ul className="list-disc list-inside ml-4">
								<li>Highcharts + Boost (1M+ points)</li>
								<li>Plotly.js (500K+ points)</li>
								<li>Observable Plot (500K+ points)</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RechartsPerformanceDemo
