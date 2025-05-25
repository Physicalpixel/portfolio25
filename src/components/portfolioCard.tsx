interface PortfolioCardProps {
	content: any
	title: string
	desc: string
	active: boolean
}
export default function PortfolioCard({content, title, desc, active}: PortfolioCardProps) {
	return (
		<div className={`h-80 w-[250px]  border-[#333333] bg-[#202020]  border ${active && "shadow-md hover:shadow-xl"}`}>
			<div className="  h-52 bg-slate-100">{content}</div>
			<div className=" p-3">
				<div className="title font-semibold">{title}</div>
				<div className="desc">{desc}</div>
			</div>
		</div>
	)
}
