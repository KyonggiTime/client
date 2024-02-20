'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '학점',
    },
  },
	scales: {
		y: {
			min: 0,
			max: 4.5,
		}
	}
};
const labels = ['1학년 1학기', '1학년 2학기','2학년 1학기', '2학년 2학기','3학년 1학기', '3학년 2학기','4학년 1학기', '4학년 2학기','5학년 1학기', '5학년 2학기'];
const general_education_classes_credits = [2.10,3.10,4.10,3.10,2.10,1.10,2.10];
const major_classes_credits = [4.10,3.20,3.10,4.20,4.10,3.20,3.10];
const data = {
	labels,
	datasets: [
		{
			label: '전체',
			data: general_education_classes_credits.map((item, index) => (item + major_classes_credits[index]) / 2),
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: '교양',
			data: general_education_classes_credits,
			borderColor: 'rgb(53, 162, 235)',
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
		{
			label: '전공',
			data: major_classes_credits,
			borderColor: 'rgb(43, 82, 135)',
			backgroundColor: 'rgba(43, 82, 135, 0.5)',
		},
	],
};

export default function Calculator() {
	return (
		<>
			<h1 className="text-center">곧 구현할 예정입니다!</h1>
			<h1 className="text-center">조금만 기다려주세요!</h1>
			<Line
				data={data}
				options={options}
			/>
		</>
	);
}
