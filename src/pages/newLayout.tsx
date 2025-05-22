import {motion, useScroll, useTransform, useMotionValueEvent, scrollIntoView} from "framer-motion"
import {useRef, useState} from "react"
import Header from "../components/header"
import ParticlesBG from "../components/particlesBg"
import PortfolioCard from "../components/portfolioCard"

import {Link} from "react-router-dom"

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
	const divRef = useRef(null)
	const [showPopover, setShowPopover] = useState(false)
	const handleCopy = async () => {
		try {
			const text = divRef.current?.innerText
			if (text) {
				await navigator.clipboard.writeText(text)
				setShowPopover(true)
				setTimeout(() => setShowPopover(false), 1000)
			} else {
				alert("Nothing to copy.")
			}
		} catch (err) {
			console.error("Failed to copy:", err)
			alert("Clipboard access failed.")
		}
	}

	const bgColors = ["bg-red-400", "bg-blue-400", "bg-purple-400"]
	const titleContents = ["About", " Portfolio", "Contact"]
	const contents = [
		<div className="w-full h-full flex items-center justify-between ">
			<div className="flex flex-col  w-1/2">
				<div className="text-8xl  font-bold text-center">A little about myself!</div>
				<div className="w-1/2 text-left flex flex-col text-lg justify-center items-center m-auto mt-10 mb-10">
					<p>Hi! I'm a front-end and data visualization developer who thrives at the intersection of design and function. I build clean, responsive, and accessible web interfaces using modern frameworks like React, combined with strong UI/UX principles. This website is a mix of things I have built, explored and my journey as a devloper. If I'm not coding, I'm probably out somewhere with a camera, pretending I know what I'm doing.</p>
				</div>
			</div>
			<div className="flex gap-6 w-1/2 items-center text-white justify-center ">
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to="https://www.pexels.com/@physical-pixel-532642448/">
					<PortfolioCard
						active={true}
						content={
							<img
								src="./images/pexels.png"
								alt=""
								className="w-full h-full  object-cover"
							/>
						}
						title={"Photography Collection"}
						desc={"A collection of my photography on Pexels"}></PortfolioCard>
				</Link>

				<Link
					target="_blank"
					rel="noopener noreferrer"
					to="https://preethikaran91.wixsite.com/portfolio">
					{" "}
					<PortfolioCard
						active={true}
						content={
							<img
								src="./images/newMediaArt.png"
								alt=""
								className="w-full h-full  object-cover"
							/>
						}
						title={"New Media Art Portfolio"}
						desc={"This page documents my new media art exploration"}></PortfolioCard>
				</Link>
			</div>
		</div>,
		<div className="w-full h-full flex items-center justify-between ">
			<div className="flex flex-col w-1/2">
				<div className="text-8xl  text-center font-bold">Portfolio</div>
				<div className="w-1/2 text-left flex flex-col text-lg justify-center items-center m-auto mt-10 mb-10">
					<p>Checkout my work here.</p>
					<p></p>
				</div>
			</div>
			<div className="flex gap-6 w-1/2 items-center text-white justify-center ">
				<Link to="/expenseDashboard">
					<PortfolioCard
						active={true}
						content={
							<img
								src="./images/expense.png"
								alt="Expenditure KPI Dashboard"
								className="w-full h-full  object-cover"
							/>
						}
						title={"Expenditure KPI Dashboard"}
						desc={"KPI of personal expsenses"}></PortfolioCard>
				</Link>
				<Link to="/lwmHome">
					<PortfolioCard
						active={true}
						content={
							<img
								src="./images/workoutHomeLowRes.png"
								alt=""
								className="w-full h-full  object-cover"
							/>
						}
						title={"Lift With Me"}
						desc={"Under Construction!"}></PortfolioCard>
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					to="https://physicalpixel.github.io/Portfolio/">
					<PortfolioCard
						active={true}
						content={
							<img
								src="./images/oldPortfolio.png"
								alt=""
								className="w-full h-full  object-cover"
							/>
						}
						title={"Old Portfolio"}
						desc={"Milestone in my developer journey."}></PortfolioCard>
				</Link>
				{/* <PortfolioCard
					active={false}
					content={
						<div className="flex opacity-20 items-center h-full w-full justify-center text-center p-10 text-2xl font-semibold">Work in Progress</div>
						// <img
						// 	src=""
						// 	alt=""
						// 	className="w-full h-full  object-cover"
						// />
					}
					title={"Coming Soon..."}
					desc={"Under Construction!"}></PortfolioCard> */}
			</div>
		</div>,

		<div className="w-full h-full flex items-center justify-between ">
			<div className="flex flex-col w-1/2">
				<div className="text-8xl  font-bold text-center">Get in touch!</div>
			</div>
			<div className="flex w-1/2 items-center text-lg text-white justify-center ">
				Please feel free to get in touch via email&nbsp;
				<span
					ref={divRef}
					onClick={handleCopy}
					className="text-fuchsia-400 cursor-pointer">
					preethi.karan91@gmail.com
				</span>
				<span></span>&nbsp;or&nbsp;
				<Link
					className="text-blue-400 cursor-pointer"
					to="https://www.linkedin.com/in/preethikaran91/">
					Linkedin
				</Link>
				.
			</div>
			{showPopover && <div className=" absolute left-[50%] bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg">Copied!</div>}
		</div>,
	]

	const cardTimeline = titleContents.map((_, i) => {
		const start = window.innerHeight + i * window.innerHeight
		const end = window.innerHeight + (i + 1) * window.innerHeight
		return [start, end]
	})
	const timeline = [[0, window.innerHeight], ...cardTimeline]
	const animation = timeline.map((contents) => ({
		scale: useTransform(scrollY, contents, [1, 0]),
		opacity: useTransform(scrollY, contents, [1, 0]),
	}))
	const bgColor = "bg-black"
	return (
		<div
			ref={targetRef}
			className={`relative ${bgColor}`}>
			<ParticlesBG></ParticlesBG>
			<div className="fixed top-0 w-full z-[99]">
				<Header bgColor={""}></Header>
			</div>
			<motion.div
				style={{scale: animation[0].scale, opacity: animation[0].opacity}}
				className="h-screen items-center justify-center sticky top-0 flex flex-col px-36 overflow-clip">
				<div className={` text-white text-8xl`}>
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
					className="h-dvh py-32 pb-10 sticky top-0 ">
					<div className={`flex max-w-[90%] h-full text-white mx-auto gap-20  border border-white shadow-xl`}>
						<div className=" h-full w-full">{contents[i]}</div>
					</div>
				</motion.div>
			))}
		</div>
	)
}
