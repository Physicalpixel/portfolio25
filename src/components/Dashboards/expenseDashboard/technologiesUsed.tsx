import React from "react"

export default function TechnologiesUsed() {
	return (
		<div className="flex flex-col gap-2 p-4  rounded-md h-[800px] w-full ">
			<div className=" text-slate-800 text-2xl font-semibold pb-5">List of Technologies Used</div>
			<div className="flex gap-5 flex-col">
				<div className="h-16 w-1/2 bg-slate-200 flex p-3 items-center text-xl">Remix SPA</div>
				<div className="h-16 w-1/2 bg-slate-200 flex p-3 items-center text-xl">Tailwind CSS </div>
				<div className="h-16 w-1/2 bg-slate-200 flex p-3 items-center text-xl">Echarts For-React</div>
				<div className="h-16 w-1/2 bg-slate-200 flex p-3 items-center text-xl">Typescript</div>
				<div className="h-16 w-1/2 bg-slate-200 flex p-3 items-center text-xl"></div>
				<div className="h-16 w-1/2 bg-slate-200 flex p-3 items-center text-xl"></div>
			</div>
		</div>
	)
}
