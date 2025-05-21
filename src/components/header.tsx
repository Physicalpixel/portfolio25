import {FaLinkedin, FaGithub} from "react-icons/fa"
import {scrollIntoView} from "framer-motion"

export default function Header({bgColor}) {
	function handleClick(ref) {
		ref.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		})
	}

	return (
		<div
			id="header"
			className={`flex ${bgColor}  items-center justify-center text-white h-24`}>
			<div className="flex w-[1080px] justify-between text-xl font-normal">
				<a
					className=" text-xl font-bold"
					href="/">
					PhysicalPixel
				</a>
				<div className="flex gap-8">
					<div
						id="headerOptions"
						className=" flex gap-4">
						{/* <div onClick={handleClick(aboutRef)}>About</div>
						<div onClick={handleClick(portfolioRef)}>Portfolio</div>
						<div onClick={handleClick(contactRef)}>Contact</div> */}
					</div>
					<div
						id="linkedin"
						className=" flex gap-4">
						<a
							href="https://www.linkedin.com/in/preethikaran91/"
							target="_blank">
							<FaLinkedin className="text-3xl" />
						</a>
					</div>
					<div
						id="github"
						className=" flex gap-4">
						<a
							href="https://github.com/Physicalpixel"
							target="_blank">
							<FaGithub className="text-3xl" />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
