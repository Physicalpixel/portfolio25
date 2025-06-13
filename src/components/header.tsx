import {FaLinkedin, FaGithub} from "react-icons/fa"
import {SlMenu} from "react-icons/sl"
import {CgClose} from "react-icons/cg"
import {useState} from "react"
export default function Header({bgColor, handleClick}) {
	const [menuVisible, setMenuVisible] = useState(false)
	function handleMenu() {
		setMenuVisible(() => !menuVisible)
		console.log(menuVisible)
	}
	return (
		<div
			id="header"
			className={`flex ${bgColor} sm:px-0 px-2 items-center justify-center text-white h-24`}>
			<div className="flex w-[1280px] justify-between text-xl font-normal">
				<a
					className=" text-xl font-bold"
					href="/">
					PhysicalPixel
				</a>
				<div className="hidden sm:flex gap-12">
					<div
						id="headerOptions"
						className=" flex gap-8">
						<div
							className="cursor-pointer"
							onClick={() => handleClick(1)}>
							about
						</div>
						<div
							className="cursor-pointer"
							onClick={() => handleClick(2)}>
							portfolio
						</div>
						<div
							className="cursor-pointer"
							onClick={() => handleClick(3)}>
							contact
						</div>
					</div>
					<div className="hidden sm:flex gap-5">
						<div
							id="linkedin"
							className="">
							<a
								href="https://www.linkedin.com/in/preethikaran91/"
								target="_blank">
								<FaLinkedin className="text-3xl" />
							</a>
						</div>
						<div
							id="github"
							className="">
							<a
								href="https://github.com/Physicalpixel"
								target="_blank">
								<FaGithub className="text-3xl" />
							</a>
						</div>
					</div>
				</div>
				<div
					onClick={() => handleMenu()}
					className="sm:hidden">
					{menuVisible && <CgClose className="text-3xl"></CgClose>}
					{!menuVisible && <SlMenu className="text-3xl" />}
					<div className={`p-8 right-0 z-[999] absolute flex flex-col gap-8 bg-black transition-opacity duration-500 ${menuVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
						<div
							className="border-b h-8 cursor-pointer border-opacity-15 border-b-white"
							onClick={() => handleClick(1)}>
							about
						</div>
						<div
							className="border-b h-8 cursor-pointer border-opacity-15 border-b-white"
							onClick={() => handleClick(2)}>
							portfolio
						</div>
						<div
							className="border-b h-8 cursor-pointer border-opacity-15 border-b-white"
							onClick={() => handleClick(3)}>
							contact
						</div>
						<div className="border-b h-8 cursor-pointer border-opacity-15 border-b-white justify-between flex ">
							<a
								href="https://www.linkedin.com/in/preethikaran91/"
								target="_blank">
								<FaLinkedin className="text-2xl" />
							</a>
							<a
								href="https://github.com/Physicalpixel"
								target="_blank">
								<FaGithub className="text-2xl" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
