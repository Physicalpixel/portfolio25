import {TbMoodHappyFilled, TbMoodEmptyFilled, TbMoodSadFilled} from "react-icons/tb"

interface HomeTileProps {
	status: string
	totalMoney: string
	siteThemeColor: string
	chart: React.ReactNode
	comment: string
	month: string
}

export default function HomeTile({status, month, siteThemeColor, comment, chart, totalMoney}: HomeTileProps) {
	return (
		<div className={`bg-white lg:rounded-none rounded-xl h-full text-slate-800 flex md:flex-row p-6 items-center justify-center overflow-hidden border-2 shadow-md ${status === "sad" ? "border-rose-200" : status === "happy" ? "border-green-200" : "border-yellow-200"}`}>
			{totalMoney !== null ? (
				<>
					<div className="flex md:flex-col md:items-start lg:w-1/2 w-full items-center gap-4 md:justify-start justify-between ">
						<div className="flex flex-col  justify-center">
							<span className="text-2xl font-semibold ">Total Spent</span>
							<span className="font-normal opacity-75">{month}, 2025</span>
						</div>
						<div className="md:text-left text-center">
							<div className="md:text-7xl  text-5xl  font-normal">${totalMoney}</div>
							<div className="md:text-md text-sm text-wrap md:pt-0 pt-2 sm:w-auto w-32 whitespace-pre-line">{comment}</div>
						</div>
					</div>

					<div className="md:block hidden lg:pl-0 pl-6 w-1/2">
						{/* green - #4ade80 rose - #f87171 yellow- #facc15 slate-100 - #f1f5f9 */}
						{status === "happy" ? (
							<TbMoodHappyFilled
								size={320}
								color={"#4ade80"}></TbMoodHappyFilled>
						) : status === "sad" ? (
							<TbMoodSadFilled
								size={320}
								color={"#f87171"}></TbMoodSadFilled>
						) : status === "confused" ? (
							<TbMoodEmptyFilled
								size={320}
								color={"#fbbf24"}></TbMoodEmptyFilled>
						) : (
							<TbMoodHappyFilled
								size={320}
								color={"#4ade80"}></TbMoodHappyFilled>
						)}
					</div>
				</>
			) : (
				<div>""</div>
			)}
		</div>
	)
}
