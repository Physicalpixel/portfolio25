interface TileProps {
	title: string
	value: string | number
	icon: React.ReactNode
	siteThemeColor: string
}

export default function Tile({title, value, icon, siteThemeColor}: TileProps) {
	return (
		<div
			className="flex p-6 lg:rounded-none rounded-xl  h-full items-center justify-between text-slate-800 shadow-md"
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
				className=""
				style={{
					color: `${siteThemeColor}`,
				}}>
				{icon}
			</div>
		</div>
	)
}
