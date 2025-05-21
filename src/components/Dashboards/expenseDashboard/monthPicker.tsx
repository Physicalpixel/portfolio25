import {useState} from "react"
import {useSearchParams} from "react-router-dom"
import * as d3 from "d3"

import {ChevronRight, ChevronLeft, Calendar} from "tabler-icons-react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

export default function MonthPicker({siteThemeColor, onChange}) {
	const [searchParams, setSearchParams] = useSearchParams()
	const formatDate = d3.timeFormat("%Y-%m-%d")
	const [month, setMonth] = useState(new Date().getMonth())
	const [year, setYear] = useState(currentYear)
	const [open, setOpen] = useState(false)
	const today = new Date()
	const [range, setRange] = useState([
		{
			startDate: new Date(today.getFullYear(), today.getMonth(), 1), // first day of current month
			endDate: today, // today
			key: "selection",
		},
	])

	const handleMonthClick = (index) => {
		const newMonth = index
		setMonth(newMonth)
		onChange(newMonth + 1, year)
	}

	const handleYearChange = (direction) => {
		const newYear = year + direction
		setYear(newYear)
		onChange(month + 1, newYear)
	}

	const handleSubmit = () => {
		const firstDay = new Date(year, month, 1)
		const lastDay = year === currentYear && month === currentMonth ? today : new Date(year, month + 1, 0)
		setRange([
			{
				startDate: firstDay,
				endDate: lastDay,
				key: "selection",
			},
		])
		setOpen(false)
		onChange(month + 1, year)
		const newStartDate = formatDate(firstDay)
		const newEndDate = formatDate(lastDay)
		const newParams = new URLSearchParams(searchParams)
		newParams.set("startDate", newStartDate)
		newParams.set("endDate", newEndDate)
		setSearchParams(newParams)
		console.log("this is coming from monthPicker", range)
	}

	return (
		<div className="flex items-center gap-4 shadow-md">
			<div
				className=" text-center w-52 justify-between cursor-pointer flex gap-10 p-2 bg-white"
				onClick={() => setOpen(!open)}>
				<div>
					{months[month]}, {year}
				</div>
				<Calendar
					style={{
						color: `${siteThemeColor}`,
					}}></Calendar>
			</div>
			{open && (
				<div className="absolute z-10  top-[6.5%] bg-white shadow-md  flex flex-col items-center p-4 ">
					<div className="flex items-center gap-2 justify-between w-full">
						<ChevronLeft
							onClick={() => handleYearChange(-1)}
							className=" cursor-pointer "></ChevronLeft>
						<input
							value={year}
							onChange={(e) => setYear(Number(e.target.value))}
							className="w-20 bg-white cursor-text -md text-center "
						/>
						<ChevronRight
							onClick={() => handleYearChange(1)}
							className=" cursor-pointer "></ChevronRight>
					</div>
					<div className="grid grid-cols-3 gap-3 mt-4">
						{months.map((m, i) => {
							const isFuture = year > today.getFullYear() || (year === today.getFullYear() && i > today.getMonth())

							return (
								<div
									key={m}
									className={`p-2  text-center cursor-pointer ${i === month ? "bg-indigo-400 text-white" : "bg-none text-black"} ${isFuture ? "pointer-events-none opacity-40" : ""}`}
									onClick={() => !isFuture && handleMonthClick(i)}>
									{m}
								</div>
							)
						})}
					</div>
					<button
						onClick={handleSubmit}
						className=" pt-1 pb-1 px-2 py-2  bg-indigo-400 text-white">
						OK
					</button>
				</div>
			)}

			{/* Submit Button */}
		</div>
	)
}
