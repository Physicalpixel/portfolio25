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
	const bgColors = ["bg-red-400", "bg-blue-400", "bg-purple-400"]
	const titleContents = ["About", " Portfolio", "Contact"]

	const cardTimeline = titleContents.map((_, i) => {
		const start = window.innerHeight + i * window.innerHeight
		const end = window.innerHeight + (i + 1) * window.innerHeight
		return [start, end]
	})
	const timeline = [[0, window.innerHeight], ...cardTimeline]
	const animation = timeline.map((contents) => ({
		scale: useTransform(scrollY, contents, [1, 0.5]),
		opacity: useTransform(scrollY, contents, [1, 0]),
	}))
	return (
		<div
			ref={targetRef}
			className="relative bg-black">
			<ParticlesBG></ParticlesBG>
			<div className="fixed top-0 w-full z-[99]">
				<Header bgColor={"bg-black"}></Header>
			</div>
			<motion.div
				style={{scale: animation[0].scale, opacity: animation[0].opacity}}
				className="h-[800px] items-center justify-center sticky top-0 flex flex-col px-36 overflow-clip">
				<div className="bg-black text-white text-8xl">
					<div className="font-thin">Hello World!</div>
					<div className="font-thin">I am a</div>
					<div className="font-bold">frontend &</div>
					<div className="font-bold">data visualization</div>
					<div className="font-thin">developer.</div>
				</div>
			</motion.div>

			{titleContents.map((data, i) => (
				<motion.div
					style={{
						scale: animation[i + 1].scale,
						opacity: animation[i + 1].opacity,
					}}
					className="h-dvh py-32 pb-10 sticky  top-0 ">
					<div className={`flex bg-white max-w-[90%] h-full mx-auto px-10 gap-20 rounded-3xl shadow-xl`}>
						<div className="flex-1 grid content-center gap-10">
							<h2 className="text-4xl ">{data}</h2>
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
