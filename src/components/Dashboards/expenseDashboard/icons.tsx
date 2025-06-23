import {IconHomeMinus, IconBulb, IconCreditCard, IconShield, IconReportMedical, IconGardenCart, IconCar, IconCash, IconShoppingBag, IconCoffee, IconHeartbeat} from "@tabler/icons-react"

interface IconsProps {
	category: string
	color: string
}

export default function Icons({category, color}: IconsProps) {
	let icon
	let iconSize = 35
	let strokeWidth = 1.2
	switch (category) {
		case "Mortgage":
			icon = (
				<IconHomeMinus
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Utility":
			icon = (
				<IconBulb
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Cash Withdrawal":
			icon = (
				<IconCreditCard
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Insurance":
			icon = (
				<IconShield
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Medical":
			icon = (
				<IconReportMedical
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Shopping":
			icon = (
				<IconShoppingBag
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Cab":
			icon = (
				<IconCar
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Grocery":
			icon = (
				<IconGardenCart
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Food":
			icon = (
				<IconCoffee
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Wellness":
			icon = (
				<IconHeartbeat
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		case "Salary":
			icon = (
				<IconCash
					style={{color}}
					strokeWidth={strokeWidth}
					className=" lg:w-8 lg:h-8 w-4 h-4"
				/>
			)
			break
		default:
			icon = <div>Icon Not Available</div> // Fallback for unknown category
	}

	return icon
}
