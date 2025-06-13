import RechartsPerformanceDemo from "../components/perfComp/rechartsPerf"
import EChartsPerformanceTest from "../components/perfComp/echartsPerf"
export default function PerfCompare() {
	return (
		<div className="text-black">
			<RechartsPerformanceDemo></RechartsPerformanceDemo>
			<EChartsPerformanceTest></EChartsPerformanceTest>
		</div>
	)
}
