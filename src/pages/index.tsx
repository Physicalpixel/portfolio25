import {useRef, useState, useEffect} from "react"
import Header from "../components/header"
import ParticlesBG from "../components/particlesBg"
import PortfolioCard from "../components/portfolioCard"
import {Link} from "react-router-dom"

export default function Index() {
	const portfolioCardRef = useRef(null)
	const aboutRef = useRef(null)
	const portfolioRef = useRef(null)
	const contactRef = useRef(null)
	const contactCopyOnClickRef = useRef(null)
	const [particlesCount, setParticlesCount] = useState(1000)

	const [portfolioCardWidth, setPortfolioCardWidth] = useState(0)
	useEffect(
		() => {
			if (!portfolioCardRef.current) return

			const children = portfolioCardRef.current.children
			if (children.length === 0) return
			// Get the width of the first child (assume all children same width)
			//here its multiplied by 8 because the gap between each div is 4 which is equal to 8px
			const childWidth = children[0].getBoundingClientRect().width + (children.length - 1) * 8

			// Calculate total width = childWidth * number of children
			const totalWidth = childWidth * children.length

			setPortfolioCardWidth(totalWidth)
		},
		[
			/* You can add dependencies here if children change dynamically */
		]
	)

	const [showPopover, setShowPopover] = useState(false)
	const handleCopy = async () => {
		try {
			// const text = contactCopyOnClickRef.current?.innerText
			const text = "preethi.physicalpixel@gmail.com"
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

	const contents = [
		<div
			ref={aboutRef}
			className="w-full h-full flex md:flex-row flex-col items-center justify-between ">
			<div className="flex flex-col  md:w-1/2 w-full md:p-0 p-4">
				<div className="md:text-8xl text-xl font-bold md:text-center">A little about myself!</div>

				<div className="md:w-1/2 w-full text-left flex flex-col text-lg justify-center items-center m-auto mt-10 mb-10">
					<p>Hi! I'm a front-end and data visualization developer who thrives at the intersection of design and function. I build clean, responsive, and accessible web interfaces using modern frameworks like React, combined with strong UI/UX principles. This website is a mix of things I have built, explored and my journey as a developer. Off the dev clock, I'm probably out somewhere with a camera, pretending to know what I'm doing.</p>
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
								className="w-full h-full object-cover"
							/>
						}
						title={"New Media Art Portfolio"}
						desc={"This page documents my new media art exploration"}></PortfolioCard>
				</Link>
			</div>
		</div>,
		<div
			ref={portfolioRef}
			className="w-full h-full flex md:flex-row flex-col items-center justify-between ">
			<div className="flex flex-col  md:w-1/2 w-full md:p-0 p-4">
				<div className="md:text-8xl text-xl font-bold text-center">Portfolio</div>
				<div className="md:w-1/2 w-full text-center flex flex-col text-lg justify-center items-center m-auto mt-10 mb-10">
					<p>Checkout my work here.</p>
					<p></p>
				</div>
			</div>
			<div className="flex md:w-1/2 w-full items-center text-white justify-center ">
				{/*here the width is 516 because the each portfolio card is 500px and the gap between each card is gap-4 which is 8px and at a time, I want two tiles visible.*/}
				<div className="w-[500px] overflow-x-auto scroll-container">
					<div
						ref={portfolioCardRef}
						style={{width: portfolioCardWidth ? `${portfolioCardWidth}px` : "auto"}}
						className=" mb-3 gap-4 flex ">
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
						<Link to="/rechartsDemo">
							<PortfolioCard
								active={true}
								content={
									<img
										src="./images/rechartsDemo.png"
										alt=""
										className="w-full h-full object-cover"
									/>
								}
								title={"Recharts Demo"}
								desc={"Demo dashboard with sample dataset"}></PortfolioCard>
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
				</div>
			</div>
		</div>,

		<div
			ref={contactRef}
			className="w-full h-full flex md:flex-row flex-col items-center justify-between">
			<div className="flex flex-col  md:w-1/2 w-full md:p-0 p-4">
				<div className="md:text-8xl text-xl font-bold text-center">Get in touch!</div>
				<div className="md:w-1/2 w-full text-left flex flex-col text-lg justify-center items-center m-auto mt-10 mb-10">
					<div>
						<p>I’d love to hear from you whether you want to chat, collaborate, give feedback, or just ask a question. Don’t hesitate to reach out. I’m always around and excited to connect!</p>
					</div>
				</div>
			</div>
			<div className="md:w-1/2 w-full text-left flex flex-col text-lg justify-center items-center m-auto mt-10 mb-10">
				Please feel free to get in touch via&nbsp;
				<span
					ref={contactCopyOnClickRef}
					onClick={handleCopy}
					className="text-fuchsia-400 cursor-pointer">
					email
				</span>
				<span></span>&nbsp;or&nbsp;
				<Link
					target="_blank"
					className="text-blue-400 cursor-pointer"
					to="https://www.linkedin.com/in/preethikaran91/">
					Linkedin
				</Link>
			</div>
			{showPopover && <div className=" absolute left-[70%] bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg">Copied!</div>}
		</div>,
	]

	const scrollToSection = (sectionIndex) => {
		console.log(sectionIndex)
		window.scrollTo({
			top: timeline[sectionIndex][0], // scroll to exact scrollY start of section
			behavior: "smooth",
		})
	}
	const cardTimeline = contents.map((_, i) => {
		const start = window.innerHeight + i * window.innerHeight
		const end = window.innerHeight + (i + 1) * window.innerHeight
		return [start, end]
	})
	const timeline = [[0, window.innerHeight], ...cardTimeline]

	const bgColor = "bg-black"
	return (
		<div className={`relative ${bgColor} overflow-x-hidden`}>
			<ParticlesBG particlesCount={particlesCount}></ParticlesBG>
			<div className="fixed top-0 w-full z-[99]">
				<Header
					handleClick={scrollToSection}
					bgColor={""}></Header>
			</div>
			<div className="h-screen items-center justify-center top-0 flex flex-col">
				<div className=" text-white text-3xl lg:text-8xl">
					<div className="font-thin">Hello World!</div>
					<div className="font-thin">I am a</div>
					<div className="font-bold">frontend &</div>
					<div className="font-bold">data visualization</div>
					<div className="font-thin">developer.</div>
				</div>
			</div>

			{contents.map((data, i) => (
				<div className="h-dvh py-32 pb-10 sticky top-0 ">
					<div className={`flex max-w-[1280px] h-full text-white mx-auto gap-20 bg-gray-800/30 border border-gray-800 border-opacity-75   shadow-xl`}>
						<div className=" h-full w-full ">{contents[i]}</div>
					</div>
				</div>
			))}
		</div>
	)
}
