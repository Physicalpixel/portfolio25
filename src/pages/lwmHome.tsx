import {ChevronDown} from "tabler-icons-react"
import "../styles/lwm.css"
import Header from "../components/header"

const siteThemeColorTailwind = "bg-black"
const siteThemeColorHex = "black"
const gridItems = [
	{
		className: "bg-cover bg-center col-span-2 row-span-2",
		url: "./images/workoutCollage1.png", // area 1
	},
	{
		className: "bg-cover bg-center row-start-3 col-span-3 row-span-3",
		url: "./images/workoutCollage2.png", // area 2
	},
	{
		className: "bg-cover bg-center col-start-3 col-span-1 row-span-2",
		url: "./images/workoutCollage3.png", // area3
	},
	{
		className: "bg-cover bg-center col-span-2 row-span-3",
		url: "./images/workoutCollage4.png", // area5
	},
	{
		className: "bg-cover bg-center col-start-4 row-start-1 col-span-2 row-span-1",
		url: "./images/workoutCollage5.png", // area6
	},
	{
		className: "bg-cover bg-center col-span-2 row-span-1",
		url: "./images/workoutCollage5.png", // area7
	},
]
export default function LwmHome() {
	return (
		<div className={`pr-40 pl-40 h-screen tracking-[0.02em] ${siteThemeColorTailwind}`}>
			<div className="bg-[url('/images/workoutHome.jpg')] bg-cover bg-center z-10 h-full overflow-y-auto scrollbar-hidden">
				{/* <div className="absolute inset-0 bg-black opacity-70"></div>  */}
				{Array.from({length: 1}).map((_, i) => (
					<div
						key={i}
						className="w-full h-full items-center flex flex-col  justify-between font-semibold  text-white text-8xl opacity-10 ]">
						<div className="pt-10">Work in Progress...</div>
						<ChevronDown
							strokeWidth={1.2}
							className="w-52 h-52 animate-[bounce_1.3s_infinite]"
						/>
					</div>
				))}
				<div className="h-full w-full text-white text-4xl bg-neutral-950 flex flex-col items-center text-opacity-20  justify-center pl-[70px] pr-[70px]">
					<div className="fixed top-0 w-full z-[99]">
						<Header bgColor={""}></Header>
					</div>
					<div className="flex gap-10 ">
						<div className="text-8xl text-bold">About</div>
						<div className="text-xl w-1/2">Hey! I’m Jane, your workout buddy and hype coach. I help people get stronger, move better, and actually enjoy training. No crazy diets, no scary gym vibes—just real progress at your pace. Whether you're lifting for the first time or chasing new goals, I got you. Let’s sweat, laugh, and build that badass version of you together.</div>
					</div>
				</div>
				<div className="h-full text-8xl bg-neutral-900 grid grid-cols-5 grid-rows-5 gap-4 grid-auto-flow-row  ">
					{gridItems.map((item, i) => (
						<div
							key={i}
							className={`${item.className} bg-cover bg-center`}
							style={{backgroundImage: `url(${item.url})`}}
						/>
					))}
				</div>
				<div className="h-full text-white text-8xl bg-neutral-800 flex items-center text-opacity-20  justify-center ">Testimonials</div>
				<div className="h-full text-white text-8xl bg-neutral-700 flex items-center text-opacity-20  justify-center ">Contact</div>
			</div>
		</div>
	)
}
