export default function TechnologiesUsed() {
	return (
		<div className="flex flex-col gap-2 rounded-md h-[800px] w-full ">
			<div className=" text-slate-800 text-2xl font-semibold pb-5">List of Tools Used</div>
			<div className="flex gap-5 flex-col">
				<div className="h-16 sm:w-1/2 w-full bg-slate-200 flex p-3 items-center text-xl">React Vite</div>
				<div className="h-16 sm:w-1/2 w-full bg-slate-200 flex p-3 items-center text-xl">Tailwind CSS </div>
				<div className="h-16 sm:w-1/2 w-full bg-slate-200 flex p-3 items-center text-xl">Nivo</div>
				<div className="h-16 sm:w-1/2 w-full bg-slate-200 flex p-3 items-center text-xl">Typescript</div>
			</div>
		</div>
	)
}
