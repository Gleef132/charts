import React, { FC } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { useAppSelector } from 'hooks/redux';
ChartJS.register(
	Title, Tooltip, LineElement, BarElement,
	CategoryScale, LinearScale, PointElement, Filler
)

const LineChart: FC = () => {

	const { theme } = useAppSelector(state => state.themeReducer)
	const { dataValue, data: chartData, typeChart: type } = useAppSelector(state => state.chartReducer)
	const firstBorderColor = theme === 'dark' ? '#38e8a4' : '#3552e6';
	const secondaryBorderColor = theme === 'dark' ? '#38A6E8' : '#DE1E1E';
	const firstBackgroundColor = theme === 'dark' ? "rgba(56, 232, 164, .4)" : 'rgba(53, 82, 230,.4)';
	const secondaryBackgroundColor = theme === 'dark' ? "rgba(56, 166, 232, .4)" : 'rgba(222, 30, 30,.4)';
	const colorTicks = theme === 'dark' ? '#fff' : '#000';
	const colorGrid = theme === 'dark' ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.3)';
	const backgroundCanvas = theme === 'dark' ? '#000' : '#fff';
	const barChartCondition = type === 'bar' ? true : false;

	const data = {
		labels: chartData,
		datasets:
			dataValue.map((item, index) => ({
				data: item as number[],
				borderColor: index === 1 ? secondaryBorderColor : firstBorderColor,
				tension: .3,
				showLine: true,
				pointRadius: 4,
				fill: barChartCondition ? true : dataValue.length === 2 ? false : true,
				pointHoverRadius: 5,
				backgroundColor: index === 1 ? secondaryBackgroundColor : firstBackgroundColor,
			}))
	}

	const options = {
		scales: {
			y: {
				ticks: {
					color: colorTicks
				},
				grid: {
					color: colorGrid
				}
			},
			x: {
				ticks: {
					color: colorTicks,
					font: {
						size: 14
					}
				}
			},
		}
	}
	const plugins = [{
		legend: {
			display: true,
			max: {
				width: 0
			}
		},
		id: 'scaleBackgroundColor',
		beforeDraw: (chart: any) => {
			const { ctx } = chart;
			ctx.save();
			ctx.globalCompositeOperation = 'destination-over';
			ctx.fillStyle = backgroundCanvas;
			ctx.fillRect(0, 0, chart.width, chart.height);
			ctx.restore();
		}
	}]

	return (
		<>
			{
				type === 'line' ?
					<Line data={data} options={options}
						plugins={plugins} />
					: <Bar data={data} options={options} plugins={plugins} />
			}
		</>
	)
}

export default LineChart
