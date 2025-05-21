import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import Pages from "vite-plugin-pages"

// https://vite.dev/config/
export default defineConfig({
	base: "/",
	optimizeDeps: {
		include: ["@tsparticles/react"],
	},
	plugins: [
		tailwindcss(),
		react(),
		Pages({
			dirs: "src/pages",
			extensions: ["tsx"],
		}),
	],
})
