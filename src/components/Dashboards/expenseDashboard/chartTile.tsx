import React from "react"

interface ChartTileProps {
	chart: React.ReactNode
	title: string
}

export default function ChartTile({chart, title}: ChartTileProps) {
	return (
		<div className="flex-1 w-full  bg-white  shadow-md h-15/16 p-8  ">
			<div className="text-xl font-semibold  tracking-[0.01em] text-slate-800">{title}</div>
			<div className="flex items-start justify-between w-full h-full ">
				<div className="flex flex-col gap-2 w-full h-full">
					<span className="text-4xl font-bold">{chart}</span>
				</div>
			</div>
		</div>
	)
}
