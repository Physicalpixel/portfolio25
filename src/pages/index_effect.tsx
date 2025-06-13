import React, {useRef} from "react"
import {motion, useScroll, useTransform} from "framer-motion"

const StickyStackingLayout = () => {
	const containerRef = useRef(null)

	const sections = [
		{
			id: 1,
			title: "Tile 1",
			gradient: "from-purple-600 via-blue-600 to-cyan-500",
			textColor: "text-white",
		},
		{
			id: 2,
			title: "Tile 2",
			gradient: "from-pink-500 via-red-500 to-orange-500",
			textColor: "text-white",
		},
		{
			id: 3,
			title: "Tile 3",
			gradient: "from-green-500 via-teal-500 to-blue-500",
			textColor: "text-white",
		},
	]

	return (
		<div className="bg-black text-white">
			{/* Introduction Section */}
			<section className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
				<motion.div
					className="text-center z-10"
					initial={{opacity: 0, y: 50}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 1}}>
					<motion.h1
						className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
						animate={{
							backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "linear",
						}}>
						LAYERS
					</motion.h1>
					<p className="text-xl text-gray-300 mb-8">Scroll to reveal the hidden depths</p>
					<motion.div
						className="w-6 h-10 border-2 border-white rounded-full mx-auto"
						animate={{y: [0, 10, 0]}}
						transition={{duration: 2, repeat: Infinity}}>
						<motion.div
							className="w-1 h-3 bg-white rounded-full mx-auto mt-2"
							animate={{y: [0, 16, 0]}}
							transition={{duration: 2, repeat: Infinity}}
						/>
					</motion.div>
				</motion.div>
			</section>

			{/* Sticky Stacking Sections */}
			<div ref={containerRef}>
				{sections.map((section, index) => {
					const sectionRef = useRef(null)
					const {scrollYProgress} = useScroll({
						target: sectionRef,
						offset: ["start center", "end center"],
					})

					// Each section gets its own scroll-based animations - more precise timing
					const currentSectionProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

					// Scale: starts small, becomes biggest when visible, then zooms out quickly
					const scale = useTransform(currentSectionProgress, [0, 0.3, 0.5, 1], [0.8, 1.05, 1.05, 0.4])

					// Opacity: fades in, stays visible briefly, then fades out
					const opacity = useTransform(currentSectionProgress, [0, 0.2, 0.5, 1], [0, 1, 1, 0])

					// Rotation for extra dramatic effect - only during shrink
					const rotateX = useTransform(currentSectionProgress, [0.5, 1], [0, -15])

					// Force position to stay fixed until shrink phase
					const position = useTransform(currentSectionProgress, [0, 0.5, 1], ["sticky", "sticky", "relative"])

					return (
						<div
							key={section.id}
							ref={sectionRef}
							className="h-[120vh] relative">
							<motion.div
								className={`flex items-center justify-center bg-gradient-to-br ${section.gradient} relative overflow-hidden mx-8 my-4 rounded-3xl sticky-tile`}
								style={{
									scale,
									opacity,
									rotateX,
									zIndex: sections.length - index,
									maxWidth: "80vw",
									margin: "0 auto",
									height: "80vh",
									position: "sticky",
									top: "10vh",
								}}>
								{/* Content */}
								<motion.div
									className="text-center z-10 max-w-2xl mx-auto px-8"
									initial={{opacity: 0, y: 100}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									transition={{duration: 0.8, delay: 0.2}}>
									<motion.h2
										className={`text-6xl md:text-8xl font-bold ${section.textColor}`}
										initial={{opacity: 0, scale: 0.8}}
										whileInView={{opacity: 1, scale: 1}}
										viewport={{once: true}}
										transition={{duration: 0.6, delay: 0.3}}>
										{section.title}
									</motion.h2>
								</motion.div>
							</motion.div>
						</div>
					)
				})}
			</div>

			{/* Final Section */}
			<section className="h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 relative">
				<motion.div
					className="text-center"
					initial={{opacity: 0, scale: 0.8}}
					whileInView={{opacity: 1, scale: 1}}
					viewport={{once: true}}
					transition={{duration: 1}}>
					<h2 className="text-5xl font-bold mb-6 text-white">Journey Complete</h2>
					<p className="text-xl text-gray-300">You've uncovered all the layers</p>
					<motion.button
						className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold"
						whileHover={{scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"}}
						whileTap={{scale: 0.95}}
						onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
						Start Again
					</motion.button>
				</motion.div>
			</section>
		</div>
	)
}

export default StickyStackingLayout
