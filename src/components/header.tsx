import React from "react"
import {FaLinkedin, FaGithub} from "react-icons/fa"

export default function Header({bgColor}) {
	return (
		<div
			id="header"
			className={`flex ${bgColor}  items-center justify-center text-white  h-24`}>
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
						<a href="#about">About</a>
						<a href="#portfolio">Portfolio</a>
						<a href="#contact">Contact</a>
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
