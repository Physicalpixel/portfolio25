import {useState} from "react"

export default function TransactionEntry({icon, categoryValue, merchantName, date, cardUsed, referenceId, indexId}: any) {
	const [expandTransaction, setExpandTransaction] = useState<number[]>([])
	const toggleTransaction = (index: number) => {
		setExpandTransaction((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
	}

	return (
		<div className="flex flex-col p-2 w-full text-slate-800 cursor-pointer ">
			<div
				key={indexId}
				className="pt-5 pb-5 pr-2 flex  flex-col gap-2 border-b border-gray-300 last:border-none">
				<div
					onClick={() => toggleTransaction(indexId)}
					className="flex items-center justify-between w-full ">
					<div className="flex gap-2 h-full items-center">
						<div>{icon}</div>
						<div>{merchantName}</div>
					</div>
					<div className="font-semibold"> $ -{categoryValue}</div>
				</div>
				{expandTransaction.includes(indexId) && (
					<div className="flex gap-3 bg-indigo-100 p-4 rounded-md justify-between font-semibold">
						<div className="flex flex-col  items-start">
							<div className="font-semibold">Date</div>
							<div className="font-normal">{date}</div>
						</div>
						<div className="flex flex-col items-start">
							<div className="font-semibold">Card Used</div>
							<div className="font-normal">{cardUsed}</div>
						</div>
						<div className="flex flex-col items-start">
							<div className="font-semibold">Reference ID</div>
							<div className="font-normal">{referenceId}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
