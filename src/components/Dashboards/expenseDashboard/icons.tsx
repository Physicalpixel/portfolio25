import {Bulb, HomeMinus, Heartbeat, ShoppingBag, Shield, CreditCard, ReportMedical, GardenCart, Coffee, Car, Cash} from "tabler-icons-react"

interface IconsProps {
	category: string
	color: string
}

export default function Icons({category, color}: IconsProps) {
	let icon
	let iconSize = 35
	let strokeWidth = 1.4
	switch (category) {
		case "Mortgage":
			icon = (
				<HomeMinus
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Utility":
			icon = (
				<Bulb
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Cash Withdrawal":
			icon = (
				<CreditCard
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Insurance":
			icon = (
				<Shield
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Medical":
			icon = (
				<ReportMedical
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Shopping":
			icon = (
				<ShoppingBag
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Cab":
			icon = (
				<Car
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Grocery":
			icon = (
				<GardenCart
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Food":
			icon = (
				<Coffee
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Wellness":
			icon = (
				<Heartbeat
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		case "Salary":
			icon = (
				<Cash
					style={{color}}
					strokeWidth={strokeWidth}
					size={iconSize}
				/>
			)
			break
		default:
			icon = <div>Icon Not Available</div> // Fallback for unknown category
	}

	return icon
}
