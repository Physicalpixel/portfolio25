import {FaLinkedin, FaGithub} from "react-icons/fa"
import {SlMenu} from "react-icons/sl"
import {CgClose} from "react-icons/cg"
import {useState} from "react"
import Logo from "./logo"
import {useNavigate, useLocation} from "react-router-dom"
import {useEffect} from "react"
export default function Header({bgColor, handleClick, refs, textColor}) {
	const [menuVisible, setMenuVisible] = useState(false)
	function handleMenu() {
		setMenuVisible(() => !menuVisible)
		console.log(menuVisible)
	}
	const navigate = useNavigate()
	const location = useLocation()

	const onNavClick = (refKey) => {
		if (location.pathname === "/") {
			handleClick(refs[refKey])
		} else {
			navigate("/", {state: {scrollTo: refKey}})
		}
	}

	// change the color of the bg only when I scrolldown else keep it to none
	const [bgColortrue, setBgColorTrue] = useState("transparent")

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			const docHeight = document.body.scrollHeight - window.innerHeight
			const scrollPercent = (scrollY / docHeight) * 100
			if (scrollPercent > 20) {
				setBgColorTrue(bgColor)
			} else {
				setBgColorTrue("transparent")
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<div
			id="header"
			className={`flex ${bgColortrue} px-4 items-center justify-center ${textColor} h-24`}>
			<div className="flex w-[1280px] justify-between text-xl font-normal">
				<a
					className=" text-xl  font-semibold"
					href="/">
					<div className="gap-3 flex items-center font-montserrat justify-center ">
						<Logo
							size="w-9 h-9"
							lightColor="#93c5fd"
							darkColor="#3b82f6"
						/>
						PhysicalPixel
					</div>
				</a>
				<div className="hidden sm:flex gap-12">
					<div
						id="headerOptions"
						className=" flex gap-8">
						<div
							className="cursor-pointer"
							onClick={() => onNavClick("aboutRef")}>
							about
						</div>
						<div
							className="cursor-pointer"
							onClick={() => onNavClick("portfolioRef")}>
							portfolio
						</div>
						<div
							className="cursor-pointer"
							onClick={() => onNavClick("contactRef")}>
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
					{!menuVisible && <SlMenu className="text-3xl" />}
					<div className={`left-0 top-0 z-[99999] absolute flex flex-col gap-10 items-center justify-center text-3xl font-montserrat w-full h-screen bg-black text-white transition-opacity duration-500 ${menuVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
						<div
							className="border-b h-8 cursor-pointer border-opacity-15 border-b-white"
							onClick={() => onNavClick("aboutRef")}>
							about
						</div>
						<div
							className="border-b h-8 cursor-pointer border-opacity-15 border-b-white"
							onClick={() => onNavClick("portfolioRef")}>
							portfolio
						</div>
						<div
							className="border-b h-8 cursor-pointer border-opacity-15 border-b-white"
							onClick={() => onNavClick("contactRef")}>
							contact
						</div>
						<div className="border-b h-8 cursor-pointer border-opacity-15 border-b-white justify-between flex gap-4">
							<a
								href="https://www.linkedin.com/in/preethikaran91/"
								target="_blank">
								<FaLinkedin className="text-3xl" />
							</a>
							<a
								href="https://github.com/Physicalpixel"
								target="_blank">
								<FaGithub className="text-3xl" />
							</a>
						</div>
						{menuVisible && <CgClose className="text-3xl"></CgClose>}
					</div>
				</div>
			</div>
		</div>
	)
}
