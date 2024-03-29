'use client'
import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Checkbox } from '@nextui-org/checkbox';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
	ChartData,
	Point,
	BubbleDataPoint,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { SEMESTER } from "@/config/semester";
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '@/states/auth';
import { AccountApi } from '../api/account.api';
import { MARK } from '@/config/mark';

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
	},
};

export default function Calculator() {
	const [classes, setClasses] = useState<unknown[]>([]);
	const [data, setData] = useState<ChartData<"line", (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>>({
		labels: SEMESTER.map(item => item.label),
		datasets: [],
	});

	const [semester, setSemester] = useState<string>("1학년 1학기");
	const [semesterForFilter, setSemesterForFilter] = useState<string>("1학년 1학기");
	const [isMajor, setIsMajor] = useState<boolean>(false);
	const [mark, setMark] = useState<string>("4.5");
	const [credit, setCredit] = useState<string>("");
	const [name, setName] = useState<string>("");

	const [auth, setAuth] = useRecoilState(authState);

	const loadCalculatorFromAccount = async () => {
		const account = await AccountApi.getAccount(auth.token);
		if (account.savedCalculatorTimetable != null) {
			const timeTable = JSON.parse(account.savedCalculatorTimetable).data;
			setClasses(timeTable);
			updateData(timeTable);
		} else {
			const savedTimeTable = localStorage.getItem('calculatorTimeTable');
			if (savedTimeTable != null) {
				AccountApi.uploadCalculator(auth.token, savedTimeTable);
			}
		}
	}
	
  useEffect(() => {
		if (auth.isLoggedIn) {
			loadCalculatorFromAccount();
		} else {
			const savedTimeTable = localStorage.getItem('calculatorTimeTable');
			if (savedTimeTable != null) {
				setClasses(JSON.parse(savedTimeTable).data);
				updateData(JSON.parse(savedTimeTable).data);
			}
		}
	}, []);
	
	const updateData = (newClasses) => {
		localStorage.setItem('calculatorTimeTable', JSON.stringify({data: newClasses}));
		const classData = newClasses ? newClasses : classes;
		setData({
			labels: SEMESTER.map(item => item.label),
			datasets: [
				{
					label: '전체',
					data: SEMESTER.map(
						item => classData.filter(classItem => classItem.semester == item.key)
							.filter(classItem => classItem.mark >= 0)
							.map(classItem => classItem.mark)
							.reduce((average, mark, index, array) => {
								return average + mark / array.length;
							}, 0)
					),
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				},
				{
					label: '교양',
					data: SEMESTER.map(
						item => classData.filter(classItem => classItem.semester == item.key && !classItem.isMajor)
							.filter(classItem => classItem.mark >= 0)
							.map(classItem => classItem.mark)
							.reduce((average, mark, index, array) => {
								return average + mark / array.length;
							}, 0)
					),
					borderColor: 'rgb(53, 162, 235)',
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
				},
				{
					label: '전공',
					data: SEMESTER.map(
						item => classData.filter(classItem => classItem.semester == item.key && classItem.isMajor)
							.filter(classItem => classItem.mark >= 0)
							.map(classItem => classItem.mark)
							.reduce((average, mark, index, array) => {
								return average + mark / array.length;
							}, 0)
					),
					borderColor: 'rgb(43, 82, 135)',
					backgroundColor: 'rgba(43, 82, 135, 0.5)',
				},
			],
		});
	}

	const onAddButtonClick = async () => {
		if (!name || !credit || !mark) {
			alert('강의명, 학점, 평점을 입력해주세요.');
			return;
		}
		setClasses([
			...classes,
			{
				id: new Date().getTime(),
				name,
				credit,
				mark,
				isMajor,
				semester,
			}
		]);
		updateData([
			...classes,
			{
				id: new Date().getTime(),
				name,
				credit,
				mark,
				isMajor,
				semester,
			}
		]);
		await AccountApi.uploadCalculator(auth.token, JSON.stringify({data: [
			...classes,
			{
				id: new Date().getTime(),
				name,
				credit,
				mark,
				isMajor,
				semester,
			}
		]}));
	}

	const onRemoveButtonClick = (id: number) => {
		setClasses(classes.filter(item => item.id != id));
		updateData(classes.filter(item => item.id != id));
	}

	const onKeyDown = (e) => {
		if (e.key == 'Enter') {
			onAddButtonClick();
		}
	}

	return (
		<>
			<Line
				data={data}
				options={options}
				height={300}
				className="max-h-[500px]"
			/>
			<Card className="flex items-center justify-center mt-4 p-4 w-full">
				<div className="grid grid-cols-3 gap-2 w-full p-2">
						<span className="text-md text-center font-bold">총 평점</span>
						<span className="text-md text-center font-bold">전공 평점</span>
						<span className="text-md text-center font-bold">학점</span>
						<span className="text-md text-center font-bold">{
							classes
							.filter(classItem => classItem.mark >= 0)
							.map(classItem => classItem.mark)
							.reduce((average, mark, index, array) => average + mark / array.length, 0)
							.toFixed(2)
						}학점</span>
						<span className="text-md text-center font-bold">{
							classes
							.filter(classItem => classItem.mark >= 0)
							.filter(classItem => classItem.isMajor)
							.map(classItem => classItem.mark)
							.reduce((average, mark, index, array) => average + mark / array.length, 0)
							.toFixed(2)
						}학점</span>
						<span className="text-md text-center font-bold">{
							classes.map(classItem => classItem.credit)
							.reduce((average, credit) => average + parseInt(credit), 0)
							}학점</span>
				</div>
			</Card>
			<Card className="flex items-center justify-center mt-4 p-4 w-full" onKeyDown={onKeyDown}>
				<div className="flex flex-wrap flex-row items-center justify-center mb-2 gap-2">
					<Dropdown>
						<DropdownTrigger className="mr-2">
							<Button 
								variant="bordered" 
							>
								{ semester ? semester : "학기 선택" }
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={SEMESTER} selectionMode="single" onSelectionChange={keys => setSemester(Array.from(keys).join(", ").replaceAll("_", " "))}>
							{(item: {key: string, label: string}) => (
								<DropdownItem
									key={item.key}
								>
									{item.label}
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
					<Dropdown>
						<DropdownTrigger className="mr-2">
							<Button 
								variant="bordered" 
							>
								{ mark ? MARK.find(item => item.key == mark)?.label : "성적 선택" }
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={MARK} selectionMode="single" onSelectionChange={keys => setMark(Array.from(keys).join(", ").replaceAll("_", " "))}>
							{(item: {key: string, label: string}) => (
								<DropdownItem
									key={item.key}
								>
									{item.label}
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
					<Checkbox className="w-30" isSelected={isMajor} onValueChange={setIsMajor}>전공</Checkbox>
					<Input type="number" placeholder="학점 ex) 3" variant="bordered" onChange={(e) => setCredit(e.target.value)}/>
					<Input type="title" placeholder="강의명" variant="bordered" onChange={(e) => setName(e.target.value)}/>
				<Button variant="shadow" color="primary" className="w-full" onClick={onAddButtonClick}>
					강의 추가
				</Button>
				</div>
			</Card>
			<Card className="flex items-center justify-center mt-4 p-4 w-full">
					<h1 className="text-center font-bold">추가한 강의 목록</h1>
					<Dropdown>
						<DropdownTrigger className="mt-2">
							<Button 
								variant="bordered" 
							>
								{ semesterForFilter ? semesterForFilter : "" }
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={SEMESTER} selectionMode="single" onSelectionChange={keys => setSemesterForFilter(Array.from(keys).join(", ").replaceAll("_", " "))}>
							{(item: {key: string, label: string}) => (
								<DropdownItem
									key={item.key}
								>
									{item.label}
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
				{
					classes
						.filter(classItem => classItem.semester == semesterForFilter)
						.map(classItem => (
						<Card className="grid grid-cols-3 gap-2 w-full m-2 p-2 items-center" key={ classItem.id }>
							<span className="text-sm text-center">학기</span>
							<span className="text-sm text-center">강의명</span>
							<span className="text-sm text-center">성적</span>
							<span className="text-sm text-center">{ classItem.semester }</span>
							<span className="text-sm text-center">{ classItem.name }</span>
							<span className="text-sm text-center">{ MARK.find(item => item.key == classItem.mark)?.label }</span>
							<span className="text-sm text-center">학점</span>
							<span className="text-sm text-center"></span>
							<span className="text-sm text-center"></span>
							<span className="text-sm text-center">{ classItem.credit }학점</span>
							<span className="text-sm text-center">{ classItem.isMajor ? '전공' : '교양' }</span>
							<Button variant="shadow" color="primary" onClick={() => onRemoveButtonClick(classItem.id)}>
								삭제
							</Button>
					</Card>
					))
				}
			</Card>
		</>
	);
}
