import TransactionEntry from "./transactionEntry"
import Icons from "./icons"
interface TransactionProps {
	transactions: any
}

export default function Transactions({transactions}: TransactionProps) {
	return (
		<div className="lg:h-4/6 h-3/6 w-[700px] p-4 shadow-2xl gap-2 flex-col flex  rounded-md bg-white ">
			<div className="text-slate-700 border-b-1  border-b-slate-800 font-semibold text-3xl pb-2">Your Transactions</div>
			<div className=" overflow-y-auto">
				{transactions[2].map((transaction) => {
					return (
						<TransactionEntry
							indexId={transaction}
							merchantName={transaction.merchant_name}
							icon={
								<Icons
									category={transactions[1]}
									color={transactions[0]}
								/>
							}
							categoryValue={transaction.amount}
							date={transaction.date + " " + "4:25pm"}
							referenceId={transaction.ref_id}
							cardUsed={transaction.card_used}></TransactionEntry>
					)
				})}
			</div>
		</div>
	)
}
