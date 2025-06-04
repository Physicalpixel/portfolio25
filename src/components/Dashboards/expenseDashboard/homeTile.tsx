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
		<div className=" bg-indigo-400 text-white w-96 h-[400px] flex flex-col gap-11  items-center  shadow-md">
			{totalMoney !== null ? (
				<>
					<div className="flex flex-col items-center w-full">
						<div className="flex pl-6 h-32 items-center flex-row  gap-4 w-full  text-white">
							<div className="flex flex-col items-start">
								<span className="text-2xl font-semibold ">Total Spent</span>
								<span className="font-normal opacity-75">{month}, 2025</span>
							</div>
							<div className="opacity-100">
								{/* green - #4ade80 rose - #f87171 yellow- #facc15 slate-100 - #f1f5f9 */}
								{status === "happy" ? (
									<TbMoodHappyFilled
										size={210}
										color={"#4ade80"}></TbMoodHappyFilled>
								) : status === "sad" ? (
									<TbMoodSadFilled
										size={210}
										color={"#f87171"}></TbMoodSadFilled>
								) : status === "confused" ? (
									<TbMoodEmptyFilled
										size={210}
										color={"#fbbf24"}></TbMoodEmptyFilled>
								) : (
									<TbMoodHappyFilled
										size={210}
										color={"#4ade80"}></TbMoodHappyFilled>
								)}
							</div>
						</div>
					</div>
					<div>
						<div className="text-7xl pt-8 font-normal  text-center ">${totalMoney}</div>
						<div className="text-md text-wrap text-center  whitespace-pre-line">{comment}</div>
					</div>
				</>
			) : (
				<div>hello</div>
			)}
		</div>
	)
}
