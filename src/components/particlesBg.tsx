import {useEffect, useState} from "react"
import Particles, {initParticlesEngine} from "@tsparticles/react"
import type {Container} from "@tsparticles/engine"
import {loadSlim} from "@tsparticles/slim"
import {loadOpacityUpdater} from "@tsparticles/updater-opacity"

export default function ParticlesBG() {
	const [init, setInit] = useState(false)

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine)
			await loadOpacityUpdater(engine)
		}).then(() => {
			setInit(true)
		})
	}, [])

	const particlesLoaded = async (container?: Container) => {
		console.log("Particles container loaded:", container)
	}

	if (!init) return null

	return (
		<Particles
			id="tsparticles"
			particlesLoaded={particlesLoaded}
			options={{
				fullScreen: {enable: true},
				background: {color: ""},
				particles: {
					number: {value: 100},
					size: {value: 10},
					shape: {type: "square"},
					color: {
						value: [
							"#facc15", // yellow-400
							"#a3e635", // lime-400
							"#4ade80", // green-400
							"#34d399", // emerald-400
							"#2dd4bf", // teal-400
							"#06b6d4", // cyan-400
							"#38bdf8", // sky-400
							"#60a5fa", // blue-400
							"#818cf8", // indigo-400
							"#a78bfa", // violet-400
							"#c084fc", // purple-400
							"#e879f9", // fuchsia-400
							"#f472b6", // pink-400
							"#fb7185", // rose-400
						],
					},
					move: {enable: true, speed: 1},
					opacity: {
						value: {
							min: 0.05,
							max: 0.9,
						},
						animation: {
							enable: true,
							speed: 1.5,
							startValue: "random",
							sync: false,
						},
					},
				},
				interactivity: {
					events: {
						onHover: {enable: true, mode: "repulse"},
					},
					modes: {
						repulse: {distance: 100},
					},
				},
			}}
			className="absolute inset-0 z-0"
		/>
	)
}
