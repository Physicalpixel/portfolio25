export const spentGaugeOption = (goalValue, totalValue) => {
	let pointerColor = ""

	if (totalValue <= goalValue) {
		pointerColor = "#818cf8" // green
	} else if (totalValue <= goalValue + goalValue * 0.25) {
		pointerColor = "#fbbf24" // orange
	} else {
		pointerColor = "#f87171" // red
	}
	return {
		series: [
			{
				type: "gauge",
				startAngle: 220,
				endAngle: 320,
				min: 0,
				max: goalValue * 2,
				splitNumber: 12,
				itemStyle: {
					color: pointerColor,
					shadowColor: "none",
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 0,
				},

				progress: {
					show: true,
					roundCap: true,
					width: 7,
				},
				pointer: {
					show: false,
				},
				axisLine: {
					show: true,
					roundCap: true,
					lineStyle: {
						width: 7,
					},
				},
				axisTick: {
					show: false,
					splitNumber: 0,
					lineStyle: {
						width: 2,
						color: "#999",
					},
				},
				splitLine: {
					length: 0,
					lineStyle: {
						width: 3,
						color: "#999",
					},
				},
				axisLabel: {
					distance: 0,
					color: "#999",
					fontSize: 0,
				},
				title: {
					show: false,
				},
				detail: {
					valueAnimation: true,
					show: true,
					offsetCenter: [0, "0%"],
					fontSize: 70,
					fontWeight: "normal",
					formatter: function (value) {
						return "$" + value
					},
					// formatter: "{value}",
				},
				data: [
					{
						value: totalValue,
					},
				],
			},
		],
	}
}
