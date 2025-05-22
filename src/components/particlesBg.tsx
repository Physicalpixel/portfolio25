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
					number: {value: 500},
					size: {value: 2},
					shape: {type: "square"},
					color: {
						value: [
							"#fca5a5", // red-300
							"#fdba74", // orange-300
							"#fcd34d", // amber-300
							"#fde047", // yellow-300
							"#bef264", // lime-300
							"#86efac", // green-300
							"#6ee7b7", // emerald-300
							"#5eead4", // teal-300
							"#22d3ee", // cyan-300
							"#7dd3fc", // sky-300
							"#93c5fd", // blue-300
							"#a5b4fc", // indigo-300
							"#c4b5fd", // violet-300
							"#d8b4fe", // purple-300
							"#f0abfc", // fuchsia-300
							"#f9a8d4", // pink-300
							"#fda4af", // rose-300
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
