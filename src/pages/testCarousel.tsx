import {motion, useScroll, animate, useTransform, useMotionValue, useMotionValueEvent} from "framer-motion"
import {useRef} from "react"

export default function ScrollLinked() {
	const ref = useRef(null)
	const {scrollXProgress} = useScroll({container: ref})
	const maskImage = useScrollOverflowMask(scrollXProgress)

	return (
		<div id="example">
			<motion.ul
				ref={ref}
				style={{maskImage}}>
				<li style={{background: "#ff0088"}}></li>
				<li style={{background: "#dd00ee"}}></li>
				<li style={{background: "#9911ff"}}></li>
				<li style={{background: "#0d63f8"}}></li>
				<li style={{background: "#0cdcf7"}}></li>
				<li style={{background: "#8df0cc"}}></li>
			</motion.ul>
			<StyleSheet />
		</div>
	)
}

const left = `0%`
const right = `100%`
const leftInset = `20%`
const rightInset = `80%`
const transparent = `#0000`
const opaque = `#000`
function useScrollOverflowMask(scrollXProgress) {
	const maskImage = useMotionValue(`linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`)

	useMotionValueEvent(scrollXProgress, "change", (value) => {
		if (value === 0) {
			animate(maskImage, `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`)
		} else if (value === 1) {
			animate(maskImage, `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`)
		} else if (scrollXProgress.getPrevious() === 0 || scrollXProgress.getPrevious() === 1) {
			animate(maskImage, `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`)
		}
	})

	return maskImage
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
	return (
		<style>{`
            #example {
              width: 100vw;
              max-width: 400px;
              position: relative;
            }
          

            #example ul {
                display: flex;
                list-style: none;
                height: 220px;
                overflow-x: scroll;
                padding: 20px 0;
                flex: 0 0 600px;
                margin: 0 auto;
                gap: 20px;
            }

          

            #example li {
                flex: 0 0 200px;
                background: var(--accent);
            }

    `}</style>
	)
}
