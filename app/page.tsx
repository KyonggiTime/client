'use client'
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { CAMPUS } from "@/config/campus";
import { GRADE } from "@/config/grade";
import { LectureApi } from "./api/lecture.api";
import { useEffect, useState } from "react";
import { hasDuplicates, splitTime } from "@/util/util";
import { Lecture } from "@/components/lecture.component";
import { LargeLecture } from "@/components/large-lecture.component";

export default function Home() {
	const [lectures, setLectures] = useState<Record<string, string>[]>([]);
	const [query, setQuery] = useState<string>("");
	const [campus, setCampus] = useState<string>("");
	const [grade, setGrade] = useState<string>("");
	const [professor, setProfessor] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [timezone, setTimezone] = useState<string>("");
	const [major, setMajor] = useState<string>("");
	const [width, setWidth] = useState<number>(1000);

	const handleWindowSizeChange = () => {
			setWidth(window.innerWidth);
	}
	useEffect(() => {
			setWidth(window.innerWidth);
			window.addEventListener('resize', handleWindowSizeChange);
			return () => {
					window.removeEventListener('resize', handleWindowSizeChange);
			}
	}, []);
	const [timeTable, setTimeTable] = useState<Record<string, unknown[]>>({
    '월': [],
    '화': [],
    '수': [],
    '목': [],
    '금': [],
		lectures: []
  });

  useEffect(() => {
    const savedTimeTable = localStorage.getItem('timeTable');
		if (savedTimeTable != null) {
			setTimeTable(JSON.parse(savedTimeTable));
		}
  }, []);

	const onSearchButtonClicked = async () => {
		const lecturesFromApi = await LectureApi.loadLectures({campusName: campus, grade, professor, name, major, group: timezone, query: query.replaceAll(' ', '')});
		setLectures(lecturesFromApi);
	}

	const onAddLectureButtonClicked = async (lecture: unknown) => {
		let lectures;
		if (timeTable.lectures.some(item => item.id == lecture.id)) {
			lectures = timeTable.lectures.filter(item => item.id != lecture.id);
		} else {
			lectures = timeTable.lectures.concat(lecture);
		}
		const newTimeTable: Record<string, string[]> = {
			'월': [],
			'화': [],
			'수': [],
			'목': [],
			'금': [],
		};
		for (const item of lectures) {
			const newData = splitTime(item.time);
			for (const day in newData) {
					newTimeTable[day] = newTimeTable[day].concat(newData[day].map(time => ({time, lecture: item}) ) );
					if (hasDuplicates(newTimeTable[day].map(item => item.time))) {
						alert("시간이 겹치는 강의가 존재합니다.");
						return;
					}
			}
		}
		setTimeTable({
			...newTimeTable,
			lectures,
		});
		localStorage.setItem('timeTable', JSON.stringify({
			...newTimeTable,
			lectures,
		}));
	}

	const onKeyDown = (e) => {
		if (e.key == 'Enter') {
			onSearchButtonClicked();
		}
	}

	return (
		<>
		<Card className="flex-col items-center justify-center p-4 w-full">
			<h1 className="text-center">시간표</h1>
			<div className="w-full max-w-[1000px]">
				<div className="grid grid-cols-5 text-center">
						<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">월</span>
						<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">화</span>
						<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">수</span>
						<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">목</span>
						<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">금</span>
				</div>
				{
					[1,2,3,4,5,6,7,8,9,10].map((item) => (
						<div className="grid grid-cols-5 text-center" key={item}>
								{ timeTable['월'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['월'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-gray-100 border border-gray-300 shadow-2xl rounded-xl"></div>) }
								{ timeTable['화'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['화'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-gray-100 border border-gray-300 shadow-2xl rounded-xl"></div>) }
								{ timeTable['수'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['수'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-gray-100 border border-gray-300 shadow-2xl rounded-xl"></div>) }
								{ timeTable['목'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['목'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-gray-100 border border-gray-300 shadow-2xl rounded-xl"></div>) }
								{ timeTable['금'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['금'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-gray-100 border border-gray-300 shadow-2xl rounded-xl"></div>) }
						</div>
					))
				}
			</div>
		</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 w-full">
				<h1 className="text-center">시간표에 배치되지 않은 강의</h1>
					{
						timeTable.lectures
							.filter(lecture => lecture.time == "")
							.map(lecture => (
									<h2 className="text-sm">{lecture.name}</h2>
							))	
					}
			</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-center">경기타임 개발자 감사인사 및 버그 제보 글</h1>
			<h1 className="text-center">주소: <a href="https://everytime.kr/385881/v/331188454">https://everytime.kr/385881/v/331188454</a></h1>
		</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 gap-4 w-full">
				<h1 className="text-center">추가한 강의 목록</h1>
				{
					timeTable.lectures.map(lecture => (
							width <= 800 ? 
								<LargeLecture
								lecture={lecture}
								onClick={() => onAddLectureButtonClicked(lecture)}
								buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
								key={lecture.id}
								initMaximized={false} />
							:
								<Lecture
								lecture={lecture}
								onClick={() => onAddLectureButtonClicked(lecture)}
								buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
								key={lecture.id} />
					))
				}
			</Card>

			<Card className="flex-col flex items-center justify-center mt-2 p-4 w-full">
				<div className="flex flex-wrap content-center w-full" onKeyDown={onKeyDown}>
					<Input type="title" placeholder="검색어 입력 (강의명, 교수명 등)" className="m-2 w-full" variant="bordered" onChange={(e) => setQuery(e.target.value)}/>
						<Accordion>
							<AccordionItem aria-label="상세 조건" title="상세 조건">
							<Dropdown>
								<DropdownTrigger className="m-2">
									<Button 
										variant="bordered" 
									>
										{ campus + "캠퍼스" || "캠퍼스 선택" }
									</Button>
								</DropdownTrigger>
								<DropdownMenu items={CAMPUS} selectionMode="single" onSelectionChange={keys => setCampus(Array.from(keys).join(", ").replaceAll("_", " "))}>
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
								<DropdownTrigger className="m-2">
									<Button 
										variant="bordered" 
									>
										{ grade + "학년" || "학년 선택" }
									</Button>
								</DropdownTrigger>
								<DropdownMenu items={GRADE} selectionMode="single" onSelectionChange={keys => setGrade(Array.from(keys).join(", ").replaceAll("_", " "))}>
									{(item: {key: string, label: string}) => (
										<DropdownItem
											key={item.key}
										>
											{item.label}
										</DropdownItem>
									)}
								</DropdownMenu>
							</Dropdown>
							<Input type="title" placeholder="과목명" className="m-2 w-30" variant="bordered" onChange={(e) => setName(e.target.value)}/>
							<Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" onChange={(e) => setProfessor(e.target.value)}/>
							<Input type="title" placeholder="학과명" className="m-2 w-30" variant="bordered" onChange={(e) => setMajor(e.target.value)}/>
							<Input type="title" placeholder="시간대구분명" className="m-2 w-30" variant="bordered" onChange={(e) => setTimezone(e.target.value)}/>
						</AccordionItem>
					</Accordion>
				</div>
				<Button variant="shadow" color="primary" className="m-2 w-full" onClick={onSearchButtonClicked}>
					검색
				</Button>
			</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 gap-4 w-full">
				<h2 className="text-red-500">주의: 잘못 기입된 강의가 존재할 수 있습니다. 시간표를 다 만드시고 나서 꼭 수강신청 사이트에서 확인해주세요!!</h2>
				{
						lectures.map(lecture => (
								width <= 800 ? 
									<LargeLecture
									lecture={lecture}
									onClick={() => onAddLectureButtonClicked(lecture)}
									buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
									key={lecture.id}
									initMaximized={true} />
								:
									<Lecture
									lecture={lecture}
									onClick={() => onAddLectureButtonClicked(lecture)}
									buttonText={timeTable.lectures.some(item => item.id == lecture.id) ? "제거" : "추가"}
									key={lecture.id} />
						))
				}
			</Card>
		</>
	);
}
