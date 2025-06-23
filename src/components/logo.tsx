export default function Logo({size = "w-24 h-24", lightColor = "#93c5fd", darkColor = "#2563eb", className = ""}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			className={`${size} ${className}`}>
			<style>
				{`.cls-1 {
            fill: ${lightColor};
          }
          .cls-2 {
            fill: ${darkColor};
          }`}
			</style>
			<g>
				<rect
					className="cls-1"
					x="20.031"
					y="11.844"
					width="20.031"
					height="20.031"
				/>
				<rect
					className="cls-1"
					x="20.031"
					y="51.906"
					width="20.031"
					height="20.031"
				/>
				<rect
					className="cls-1"
					x="60.094"
					y="11.844"
					width="20.031"
					height="20.031"
				/>
				<rect
					className="cls-1"
					x="60.094"
					y="51.906"
					width="20.031"
					height="20.031"
				/>
				<rect
					className="cls-1"
					x="40.063"
					y="31.875"
					width="20.031"
					height="20.031"
				/>
			</g>
			<g>
				<rect
					className="cls-2"
					x="40.063"
					y="71.938"
					width="20.031"
					height="20.031"
				/>
				<rect
					className="cls-2"
					x="0"
					y="31.875"
					width="20.031"
					height="20.031"
				/>
				<rect
					className="cls-2"
					x="80.125"
					y="31.875"
					width="20.031"
					height="20.031"
				/>
			</g>
		</svg>
	)
}
