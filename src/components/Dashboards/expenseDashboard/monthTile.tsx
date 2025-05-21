export default function MonthTile({monthName}: {monthName: string}) {
	return (
		<div className="flex-1 h-12 w-1/13">
			<div className="flex items-start justify-between p-4 h-full bg-white  rounded-lg shadow-md">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<span className=" font-normal">{monthName}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
