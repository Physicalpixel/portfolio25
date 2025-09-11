import {useRef, useState, useEffect} from "react"
import Header from "../components/header"
import ParticlesBG from "../components/particlesBg"
import PortfolioCard from "../components/portfolioCard"
import {Link} from "react-router-dom"
import {useLocation} from "react-router-dom"
import {IconChevronRight, IconChevronLeft, IconChevronCompactUp} from "@tabler/icons-react"

export default function Index() {
	const portfolioCardRef = useRef(null)
	const aboutRef = useRef(null)
	const portfolioRef = useRef(null)
	const contactRef = useRef(null)
	const portfolioScrollRef = useRef(null)
	const aboutScrollRef = useRef(null)
	const refs = {aboutRef, portfolioRef, contactRef}
	const contactCopyOnClickRef = useRef(null)
	const [isSmallScreen, setIsSmallScreen] = useState(false)
	const [particlesCount, setParticlesCount] = useState(() => (window.innerWidth < 640 ? 100 : 1000))
	const [particlesRepulseDistance, setParticlesRepulseDistance] = useState(() => (window.innerWidth < 640 ? 100 : 350))
	const [portfolioCardWidth, setPortfolioCardWidth] = useState(0)

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 640px)") // Tailwind's sm breakpoint
		const handler = (e) => setIsSmallScreen(e.matches)

		// Set on mount
		setIsSmallScreen(mediaQuery.matches)

		// Listen for changes
		mediaQuery.addEventListener("change", handler)
		return () => mediaQuery.removeEventListener("change", handler)
	}, [])

	useEffect(() => {
		const updateParticles = () => {
			setParticlesCount(window.innerWidth < 640 ? 100 : 1000)
			setParticlesRepulseDistance(window.innerWidth < 640 ? 100 : 350)
		}
		window.addEventListener("resize", updateParticles)
		return () => window.removeEventListener("resize", updateParticles)
	}, [])

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
	function scrollRight(ref) {
		ref.current.scrollBy({
			left: 250,
			behavior: "smooth",
		})
	}

	function scrollLeft(ref) {
		ref.current.scrollBy({
			left: -250,
			behavior: "smooth",
		})
	}
	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: "smooth"})
	}
	const contents = [
		<div
			ref={aboutRef}
			className="w-full h-full flex lg:flex-row  flex-col items-center lg:justify-between justify-center ">
			<div className="flex flex-col justify-center  lg:pr-16 pr-0 items-center lg::w-1/2 w-full md:p-0 p-3">
				<div className="md:text-8xl text-7xl font-bold pb-3">about</div>
				<div className="text-lg text-justify lg:p-0 p-4">
					<p>
						Hi! I'm a frontend developer crafting responsive, high-performance web interfaces. I create interactive, accessible applications with React, JavaScript/TypeScript, Remix, Tailwind CSS and modern front-end frameworks, compliant with web fundamentals like performance, accessibility, and responsive design. This site is a collection of the projects I've created, experiments I've run, and the path I'm carving as a developer. Off the clock, I swap pixels for pictures, still chasing
						the perfect frame just with a different lens.
					</p>
				</div>
			</div>
			<div className="flex gap-6 lg:w-1/2 w-full items-center text-white justify-center ">
				<div
					onClick={() => scrollLeft(aboutScrollRef)}
					className="cursor-pointer">
					<IconChevronLeft
						className="w-10 h-10"
						strokeWidth={1}></IconChevronLeft>
				</div>
				<div
					ref={aboutScrollRef}
					className="w-[600px] overflow-x-auto scroll-container">
					<div
						ref={portfolioCardRef}
						style={{width: "auto"}}
						className="mt-3 md:mt-0 gap-4 flex ">
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
				</div>
				<div
					onClick={() => scrollRight(aboutScrollRef)}
					className="cursor-pointer">
					<IconChevronRight
						className="w-10 h-10"
						strokeWidth={1}></IconChevronRight>
				</div>
			</div>
		</div>,
		<div
			ref={portfolioRef}
			className="w-full h-full flex lg:flex-row  flex-col items-center lg:justify-between justify-center ">
			<div className="flex flex-col justify-center  lg:pr-16 pr-0 items-center lg::w-1/2 w-full md:p-0 p-3">
				<div className="md:text-8xl text-7xl  font-bold pb-3">portfolio</div>
				<div className="text-lg text-justify lg:p-0 p-4">
					<p>Checkout my work here.</p>
					<p></p>
				</div>
			</div>
			<div className="flex gap-6 lg:w-1/2 w-full items-center text-white justify-center ">
				{/*here the width is 516 because the each portfolio card is 500px and the gap between each card is gap-4 which is 8px and at a time, I want two tiles visible.*/}
				<div
					onClick={() => scrollLeft(portfolioScrollRef)}
					className="cursor-pointer">
					<IconChevronLeft
						className="w-10 h-10"
						strokeWidth={1}></IconChevronLeft>
				</div>
				<div
					ref={portfolioScrollRef}
					className="w-[500px] overflow-x-auto scroll-container">
					<div
						ref={portfolioCardRef}
						style={{width: "auto"}}
						className="mt-3 md:mt-0 gap-4 flex ">
						<Link to="/">
							<PortfolioCard
								active={true}
								content={
									<img
										src="./images/portfolio.png"
										alt="My portfolio website"
										className="w-full h-full object-cover"
									/>
								}
								title={"Physicalpixel.com"}
								desc={"My Portfolio"}></PortfolioCard>
						</Link>
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
					</div>
				</div>
				<div
					onClick={() => scrollRight(portfolioScrollRef)}
					className="cursor-pointer">
					<IconChevronRight
						className="w-10 h-10"
						strokeWidth={1}></IconChevronRight>
				</div>
			</div>
		</div>,

		<div
			ref={contactRef}
			className="w-full h-full flex lg:flex-row  flex-col items-center lg:justify-between justify-center ">
			<div className="flex flex-col justify-center  lg:pr-16 pr-0 items-center lg::w-1/2 w-full md:p-0 p-3">
				<div className="md:text-8xl text-7xl font-bold pb-3">contact</div>
				<div className="text-lg text-justify lg:p-0 p-4">
					<div>
						<p>I’d love to hear from you whether you want to chat, collaborate, give feedback, or just ask a question. Don’t hesitate to reach out. I’m always around and excited to connect!</p>
					</div>
				</div>
			</div>
			<div className="md:w-1/2 w-full text-left flex flex-col text-lg justify-center items-center ">
				Please feel free to get in touch via&nbsp;
				<div className="flex ">
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
			</div>
			{showPopover && <div className=" absolute left-[70%] bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg">Copied!</div>}
		</div>,
	]
	const location = useLocation()
	const scrollToSection = (ref) => {
		if (ref.current) {
			const offset = 10
			const top = ref.current.getBoundingClientRect().top + window.pageYOffset - offset
			window.scrollTo({top, behavior: "smooth"})
		}
	}

	useEffect(() => {
		if (location.state?.scrollTo) {
			const refKey = location.state.scrollTo
			scrollToSection(refs[refKey])
		}
	}, [location.state])
	const cardTimeline = contents.map((_, i) => {
		const start = window.innerHeight + i * window.innerHeight
		const end = window.innerHeight + (i + 1) * window.innerHeight
		return [start, end]
	})
	const timeline = [[0, window.innerHeight], ...cardTimeline]
	const bgColor = "bg-black"

	return (
		<div className={`relative ${bgColor} overflow-x-hidden`}>
			<ParticlesBG
				particlesRepulseDistance={particlesRepulseDistance}
				particlesCount={particlesCount}></ParticlesBG>
			<div className="fixed top-0 w-full z-[9999]">
				<Header
					textColor={"text-white"}
					refs={{aboutRef, portfolioRef, contactRef}}
					handleClick={scrollToSection}
					bgColor={"bg-gradient-to-b from-black to-transparent"}></Header>
			</div>
			<div className="h-screen items-center justify-center flex flex-col text-white">
				<div className="flex flex-col">
					<div className="lg:text-[30px] text-[20px] font-serif font-normal italic flex ">pixel-perfect wizardry in</div>
					<div className="flex items-start justify-center flex-col">
						<div
							className="
						 text-[5em] md:text-[10em] lg:text-[15em] font-bold leading-[0.9]"></div>
						<div
							className="
						text-[5em] md:text-[10em] lg:text-[15em] font-bold leading-[0.9]">
							frontend.
						</div>
					</div>
				</div>
			</div>
			{/* <div className="h-screen items-center justify-center top-0 flex flex-col">
				<div className=" text-white text-3xl lg:text-8xl">
					<div className="font-thin">Hello World!</div>
					<div className="font-thin">I am a</div>
					<div className="font-bold">frontend &</div>
					<div className="font-bold">data visualization</div>
					<div className="font-thin">developer.</div>
				</div>
			</div> */}

			{contents.map((data, i) => (
				<div className="flex max-w-[1280px] h-screen text-white mx-auto p-4">
					<div className=" h-full w-full z-[999]">{contents[i]}</div>
				</div>
			))}
		</div>
	)
}
