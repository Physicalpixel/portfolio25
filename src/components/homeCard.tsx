export default function HomeCard({content}) {
	return (
		<div className="h-dvh text-[50px]   text-center py-[300px] flex justify-center sticky top-0">
			<div className="h-[calc(100%*2)] w-4/5 bg-pink-400 shadow-2xl rounded-3xl">{content}</div>
		</div>
	)
}
