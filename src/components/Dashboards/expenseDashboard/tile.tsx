interface TileProps {
	title: string
	value: string | number
	icon: React.ReactNode
	siteThemeColor: string
}

export default function Tile({title, value, icon, siteThemeColor}: TileProps) {
	return (
		<div className="flex-1 h-32">
			<div
				className={"flex p-6 h-full items-center justify-between text-white shadow-md"}
				style={{
					backgroundColor: `${siteThemeColor}`,
				}}>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-semibold ">{title}</span>
					</div>
					<span className="font-normal opacity-75">{value}</span>
				</div>

				<div
					className="w-12 h-12 opacity-50 bg-indigo-200  "
					style={{
						color: `${siteThemeColor}`,
					}}>
					{icon}
				</div>
			</div>
		</div>
	)
}
