import {motion, useScroll, useTransform, useMotionValueEvent, scrollIntoView} from "framer-motion"
import {useRef} from "react"
import Header from "../components/header"
import HomeCard from "../components/homeCard"
import ParticlesBG from "../components/particlesBg"

export default function NewLayout() {
	const targetRef = useRef(null)
	const blueRef = useRef(null)
	const {scrollY} = useScroll({
		target: targetRef,
		offset: ["start start", "end end"],
	})
	useMotionValueEvent(scrollY, "change", () => {
		console.log(scrollY.get())
	})

	const handleClick = () => {
		blueRef.current?.scrollIntoView({behavior: "smooth"})
	}
	const contents = [<div> About </div>, <div> Portfolio</div>, <div>Contact</div>]
	const titleContents = ["About", " Portfolio", "Contact"]

	const cardTimeline = titleContents.map((_, i) => {
		const start = window.innerHeight + i * window.innerHeight
		const end = window.innerHeight + (i + 1) * window.innerHeight
		return [start, end]
	})
	console.log("this is the card timeline", window.innerHeight, cardTimeline)
	const timeline = [[0, window.innerHeight], ...cardTimeline]
	const animation = timeline.map((contents) => ({
		scale: useTransform(scrollY, contents, [1, 0.8]),
		opacity: useTransform(scrollY, contents, [1, 0]),
	}))
	return (
		<div
			ref={targetRef}
			className="bg-slate-100 relative">
			<div className="fixed top-0 w-full z-[99]">
				<Header bgColor={"bg-black"}></Header>
			</div>
			<motion.div
				style={{scale: animation[0].scale, opacity: animation[0].opacity}}
				className="h-screen z-10 bg-black items-center justify-center sticky top-0 flex px-36 overflow-clip">
				<div className="flex items-center text-2xl text-white w-4/5 flex-col h-max">
					Hello World!<br></br>I am a frontend and data visualization developer.
				</div>
			</motion.div>

			{titleContents.map((data, i) => (
				<motion.div
					style={{
						scale: animation[i + 1].scale,
						opacity: animation[i + 1].opacity,
					}}
					className="h-dvh pt-32 pb-10 sticky z-10 top-0 ">
					<div className="flex bg-white max-w-[90%] h-full mx-auto px-10 gap-20 rounded-3xl shadow-xl">
						<div className="flex-1 grid content-center gap-10">
							<h2 className="text-4xl ">{data}</h2>
							<p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
							<button className="p-2 px-4 border border-black rounded-full mr-auto"> Find out more</button>
						</div>
						<div className="flex-1 h-full py-10">
							<div className="w-full h-full rounded-tr-[200px]"></div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	)
}
