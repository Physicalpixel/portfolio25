import Header from "../components/header"
import PortfolioCard from "../components/portfolioCard"
import {useRef, useState} from "react"
import {Link} from "react-router-dom"

export default function Index() {
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

	return (
		<div className="overflow-y-auto overflow-x-hidden h-screen">
			<div className="absolute top-0 left-0 w-full z-10">
				<Header bgColor={"bg-black"}></Header>
			</div>
			<section
				id="home"
				className="h-screen w-screen bg-black flex flex-col bg-none justify-center ">
				<div className=" text-center flex items-center justify-center  ">
					<div className="flex flex-col items-center">
						<h1 className="text-4xl text-white">Hello World!</h1>
						<h1 className="text-xl text-white"> I am a Frontend and Data Visualization Developer</h1>
					</div>
				</div>
			</section>
			<section id="about">
				<div className="w-full h-screen bg-white">
					<div className="flex-col flex bg-white items-center justify-center w-full h-full">
						<div className="text-8xl text-gray-800 font-bold text-center">A little about myself!</div>
						<div className="w-1/2 text-left flex flex-col justify-center items-center m-auto mt-10 mb-10">
							<p>Hi! I'm a front-end and data visualization developer who thrives at the intersection of design and function. I build clean, responsive, and accessible web interfaces using modern frameworks like React, combined with strong UI/UX principles. This website is a mix of things I have built, explored and my journey as a devloper. If I'm not coding, I'm probably out somewhere with a camera, pretending I know what I'm doing.</p>
							<p></p>
						</div>
						<div className="flex gap-6 items-center justify-center ">
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
					</div>
				</div>
			</section>
			<section id="portfolio">
				<div className="w-full h-screen bg-white">
					<div className="flex-col flex bg-white items-center justify-center w-full h-full">
						<div className="text-8xl text-gray-800 font-bold">Portfolio</div>
						<div className="w-1/2 text-left flex flex-col justify-center items-center m-auto mt-10 mb-10">
							<p>Checkout my work here.</p>
							<p></p>
						</div>
						<div className="flex justify-center pt-4">
							<div className="flex w-[1080px] gap-5 portfolioSection4 justify-between">
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
								<PortfolioCard
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
									desc={"Under Construction!"}></PortfolioCard>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="contact">
				<div className="w-full h-screen bg-white">
					<div className="flex-col flex bg-white items-center justify-center w-full h-full">
						<div className="portfolioTitle text-8xl text-gray-800 font-bold">Get in touch!</div>
						<div className="w-1/2 text-left flex flex-col justify-center items-center m-auto mt-10 mb-10">
							<div className="flex  flex-row justify-center items-center">
								Please feel free to get in touch via email&nbsp;
								<span
									ref={divRef}
									onClick={handleCopy}
									className="text-indigo-400 cursor-pointer">
									preethi.karan91@gmail.com
								</span>
								<span></span>&nbsp;or&nbsp;
								<Link
									className="text-indigo-400 cursor-pointer"
									to="https://www.linkedin.com/in/preethikaran91/">
									Linkedin
								</Link>
								.
							</div>
							{showPopover && <div className=" absolute left-[50%] bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg">Copied!</div>}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
