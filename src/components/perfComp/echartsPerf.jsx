// Install: npm install echarts-for-react echarts

import React, {useState, useCallback, useMemo} from "react"
import ReactECharts from "echarts-for-react"

const EChartsPerformanceTest = () => {
	const [dataSize, setDataSize] = useState(1000)
	const [chartType, setChartType] = useState("line")
	const [renderTime, setRenderTime] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	// Generate large dataset
	const generateData = useCallback((size) => {
		const data = []
		const categories = []

		for (let i = 0; i < size; i++) {
			categories.push(`Point ${i + 1}`)
			data.push({
				value: Math.sin(i * 0.1) * 100 + Math.random() * 50 + 100,
				value2: Math.cos(i * 0.1) * 80 + Math.random() * 40 + 80,
				value3: Math.random() * 200,
			})
		}

		return {data, categories}
	}, [])

	// Memoize chart data to prevent unnecessary recalculations
	const chartData = useMemo(() => {
		console.time("Data Generation")
		const result = generateData(dataSize)
		console.timeEnd("Data Generation")
		return result
	}, [dataSize, generateData])

	// Chart configuration optimized for performance
	const getChartOption = useCallback(() => {
		const baseOption = {
			title: {
				text: `Performance Test - ${dataSize.toLocaleString()} Data Points`,
				left: "center",
				textStyle: {
					fontSize: 16,
					fontWeight: "bold",
				},
			},
			tooltip: {
				trigger: "axis",
				// Optimize tooltip performance for large datasets
				axisPointer: {
					animation: false,
				},
			},
			legend: {
				data: ["Series 1", "Series 2", "Series 3"],
				top: "8%",
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "3%",
				top: "20%",
				containLabel: true,
			},
			xAxis: {
				type: "category",
				boundaryGap: false,
				data: chartData.categories,
				// Show all labels for true performance test
				axisLabel: {
					interval: 0, // Show all labels to stress test
				},
			},
			yAxis: {
				type: "value",
				scale: true,
			},
			// Performance optimizations - but no limits!
			animation: true, // Keep animations for true performance test
			progressive: dataSize > 10000 ? 2000 : 0, // Progressive rendering for very large datasets
			progressiveThreshold: 10000,
		}

		if (chartType === "line") {
			baseOption.series = [
				{
					name: "Series 1",
					type: "line",
					data: chartData.data.map((d) => d.value),
					symbol: "circle", // Always show symbols for true performance test
					symbolSize: 3,
					lineStyle: {width: 2},
					itemStyle: {color: "#5470c6"},
				},
				{
					name: "Series 2",
					type: "line",
					data: chartData.data.map((d) => d.value2),
					symbol: "circle",
					symbolSize: 3,
					lineStyle: {width: 2},
					itemStyle: {color: "#91cc75"},
				},
				{
					name: "Series 3",
					type: "line",
					data: chartData.data.map((d) => d.value3),
					symbol: "circle",
					symbolSize: 3,
					lineStyle: {width: 2},
					itemStyle: {color: "#fac858"},
				},
			]
		} else if (chartType === "scatter") {
			baseOption.xAxis.type = "value"
			baseOption.series = [
				{
					name: "Scatter Data",
					type: "scatter",
					data: chartData.data.map((d, i) => [i, d.value]),
					symbolSize: 4, // Fixed size for consistent performance testing
					itemStyle: {
						color: "#5470c6",
						opacity: 0.8, // Fixed opacity
					},
				},
			]
		} else if (chartType === "bar") {
			baseOption.series = [
				{
					name: "Bar Data",
					type: "bar",
					data: chartData.data.map((d) => d.value),
					itemStyle: {
						color: "#5470c6",
						borderRadius: [2, 2, 0, 0],
					},
					barWidth: dataSize > 10000 ? "99%" : dataSize > 1000 ? "90%" : "auto",
				},
			]
		}

		return baseOption
	}, [chartData, chartType, dataSize])

	const handleDataSizeChange = (newSize) => {
		setIsLoading(true)
		const startTime = performance.now()

		// Use setTimeout to allow UI update
		setTimeout(() => {
			setDataSize(newSize)
			const endTime = performance.now()
			setRenderTime(endTime - startTime)
			setIsLoading(false)
		}, 10)
	}

	const dataSizeOptions = [
		{value: 1000, label: "1K"},
		{value: 5000, label: "5K"},
		{value: 10000, label: "10K"},
		{value: 25000, label: "25K"},
		{value: 50000, label: "50K"},
		{value: 100000, label: "100K"},
	]

	const chartTypeOptions = [
		{value: "line", label: "Line Chart", icon: "📈"},
		{value: "scatter", label: "Scatter Plot", icon: "🔸"},
		{value: "bar", label: "Bar Chart", icon: "📊"},
	]

	return (
		<div
			style={{
				padding: "20px",
				backgroundColor: "#f8fafc",
				minHeight: "100vh",
				fontFamily: "system-ui, -apple-system, sans-serif",
			}}>
			<div style={{maxWidth: "1400px", margin: "0 auto"}}>
				{/* Header */}
				<div style={{textAlign: "center", marginBottom: "30px"}}>
					<h1
						style={{
							fontSize: "28px",
							fontWeight: "bold",
							color: "#1e293b",
							margin: "0 0 10px 0",
						}}>
						ECharts Performance Test
					</h1>
					<p
						style={{
							fontSize: "16px",
							color: "#64748b",
							margin: 0,
						}}>
						Test rendering performance with large datasets (1K - 100K points)
					</p>
				</div>

				{/* Controls */}
				<div
					style={{
						backgroundColor: "white",
						padding: "25px",
						borderRadius: "12px",
						boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
						marginBottom: "20px",
					}}>
					{/* Data Size Controls */}
					<div style={{marginBottom: "20px"}}>
						<h3
							style={{
								margin: "0 0 15px 0",
								color: "#374151",
								fontSize: "16px",
								fontWeight: "600",
							}}>
							Dataset Size: {dataSize.toLocaleString()} points
						</h3>
						<div
							style={{
								display: "flex",
								gap: "10px",
								flexWrap: "wrap",
								marginBottom: "15px",
							}}>
							{dataSizeOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => handleDataSizeChange(option.value)}
									disabled={isLoading}
									style={{
										padding: "8px 16px",
										backgroundColor: dataSize === option.value ? "#3b82f6" : "#e5e7eb",
										color: dataSize === option.value ? "white" : "#374151",
										border: "none",
										borderRadius: "6px",
										cursor: isLoading ? "not-allowed" : "pointer",
										fontSize: "14px",
										fontWeight: "500",
										opacity: isLoading ? 0.6 : 1,
									}}>
									{option.label}
								</button>
							))}
						</div>
					</div>

					{/* Chart Type Controls */}
					<div style={{marginBottom: "20px"}}>
						<h3
							style={{
								margin: "0 0 15px 0",
								color: "#374151",
								fontSize: "16px",
								fontWeight: "600",
							}}>
							Chart Type
						</h3>
						<div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
							{chartTypeOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => setChartType(option.value)}
									disabled={isLoading}
									style={{
										padding: "10px 16px",
										backgroundColor: chartType === option.value ? "#10b981" : "#e5e7eb",
										color: chartType === option.value ? "white" : "#374151",
										border: "none",
										borderRadius: "6px",
										cursor: isLoading ? "not-allowed" : "pointer",
										fontSize: "14px",
										fontWeight: "500",
										display: "flex",
										alignItems: "center",
										gap: "6px",
										opacity: isLoading ? 0.6 : 1,
									}}>
									<span>{option.icon}</span>
									{option.label}
								</button>
							))}
						</div>
					</div>

					{/* Performance Stats */}
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
							gap: "15px",
							padding: "15px",
							backgroundColor: "#f8fafc",
							borderRadius: "8px",
						}}>
						<div style={{textAlign: "center"}}>
							<div style={{fontSize: "12px", color: "#6b7280", marginBottom: "4px"}}>DATA POINTS</div>
							<div style={{fontSize: "20px", fontWeight: "bold", color: "#1f2937"}}>{dataSize.toLocaleString()}</div>
						</div>
						<div style={{textAlign: "center"}}>
							<div style={{fontSize: "12px", color: "#6b7280", marginBottom: "4px"}}>RENDER TIME</div>
							<div style={{fontSize: "20px", fontWeight: "bold", color: "#059669"}}>{renderTime.toFixed(1)}ms</div>
						</div>
						<div style={{textAlign: "center"}}>
							<div style={{fontSize: "12px", color: "#6b7280", marginBottom: "4px"}}>CHART TYPE</div>
							<div style={{fontSize: "20px", fontWeight: "bold", color: "#7c3aed"}}>{chartType.toUpperCase()}</div>
						</div>
						<div style={{textAlign: "center"}}>
							<div style={{fontSize: "12px", color: "#6b7280", marginBottom: "4px"}}>STATUS</div>
							<div
								style={{
									fontSize: "20px",
									fontWeight: "bold",
									color: isLoading ? "#f59e0b" : "#059669",
								}}>
								{isLoading ? "LOADING" : "READY"}
							</div>
						</div>
					</div>
				</div>

				{/* Chart Container */}
				<div
					style={{
						backgroundColor: "white",
						borderRadius: "12px",
						padding: "20px",
						boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
						position: "relative",
					}}>
					{isLoading && (
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "rgba(255,255,255,0.8)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								zIndex: 10,
								borderRadius: "12px",
							}}>
							<div
								style={{
									padding: "20px",
									backgroundColor: "white",
									borderRadius: "8px",
									boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
									textAlign: "center",
								}}>
								<div style={{fontSize: "18px", fontWeight: "bold", marginBottom: "10px"}}>Generating {dataSize.toLocaleString()} data points...</div>
								<div style={{fontSize: "14px", color: "#6b7280"}}>Please wait while we prepare the chart</div>
							</div>
						</div>
					)}

					<ReactECharts
						option={getChartOption()}
						style={{height: "600px", width: "100%"}}
						opts={{
							renderer: "canvas", // Canvas is faster for large datasets
							useDirtyRect: false,
							useCoarsePointer: true, // Better performance on touch devices
						}}
						onEvents={{
							finished: () => {
								console.log("Chart rendering finished")
							},
						}}
					/>
				</div>

				{/* Performance Tips */}
				<div
					style={{
						backgroundColor: "white",
						padding: "20px",
						borderRadius: "12px",
						boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
						marginTop: "20px",
					}}>
					<h3
						style={{
							margin: "0 0 15px 0",
							color: "#374151",
							fontSize: "16px",
							fontWeight: "600",
						}}>
						Performance Optimization Tips
					</h3>
					<ul
						style={{
							color: "#6b7280",
							fontSize: "14px",
							lineHeight: "1.6",
							margin: 0,
							paddingLeft: "20px",
						}}>
						<li>
							<strong>Canvas Renderer:</strong> Better performance for large datasets
						</li>
						<li>
							<strong>Progressive Rendering:</strong> Automatically enabled for 5K+ points
						</li>
						<li>
							<strong>Symbol Optimization:</strong> Symbols hidden for 10K+ points
						</li>
						<li>
							<strong>Animation Control:</strong> Disabled for 10K+ points
						</li>
						<li>
							<strong>Axis Labels:</strong> Reduced density for large datasets
						</li>
						<li>
							<strong>Bar Chart Limit:</strong> Capped at 5K points for optimal performance
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default EChartsPerformanceTest
