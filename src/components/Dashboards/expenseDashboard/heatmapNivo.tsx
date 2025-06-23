import {ResponsiveCalendar} from "@nivo/calendar"

const HeatmapNivo = ({data, fromDate, toDate}) => {
	return (
		<div className="w-full h-80 bg-white p-6 shadow-md lg:rounded-none rounded-xl">
			<div className="font-semibold">Monthly Spending Pattern</div>
			<div className="h-5/6">
				<ResponsiveCalendar
					data={data}
					from={fromDate}
					to={toDate}
					emptyColor="#eeeeee"
					colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
					margin={{top: 0, right: 0, bottom: 0, left: 20}}
					monthBorderColor="none"
					monthSpacing={10}
					dayBorderWidth={2}
					dayBorderColor="#ffffff"
					legends={[
						{
							anchor: "bottom-right",
							direction: "row",
							translateY: 36,
							itemCount: 4,
							itemWidth: 42,
							itemHeight: 36,
							itemsSpacing: 14,
							itemDirection: "right-to-left",
						},
					]}
					theme={{
						text: {
							fontSize: 12,
							fill: "#333333",
						},
						tooltip: {
							container: {
								background: "#ffffff",
								color: "#333333",
								fontSize: "12px",
								borderRadius: "4px",
								boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
								padding: "8px 12px",
							},
						},
					}}
					tooltip={({day, value, color}) => (
						<div className="bg-white flex flex-col rounded shadow-lg whitespace-nowrap p-2 ">
							<div className="font-semibold flex  text-gray-800">{day}</div>
							<div className="text-gray-600 ">Spent ${value}</div>
						</div>
					)}
				/>
			</div>
		</div>
	)
}

export default HeatmapNivo
