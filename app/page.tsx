'use client'
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { CAMPUS } from "@/config/campus";
import { GRADE } from "@/config/grade";
import { LectureApi } from "./api/lecture.api";
import { useCallback, useEffect, useState } from "react";
import { hasDuplicates, splitTime } from "@/util/util";
import { Lecture } from "@/components/lecture.component";
import { LargeLecture } from "@/components/large-lecture.component";
import { AccountApi } from "./api/account.api";
import { useRecoilState } from "recoil";
import { authState } from "@/states/auth";

export default function Home() {
	const [lectures, setLectures] = useState<Record<string, string>[]>([]);
	const [query, setQuery] = useState<string>("");
	const [campus, setCampus] = useState<string>("");
	const [grade, setGrade] = useState<string>("");
	const [professor, setProfessor] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [timezone, setTimezone] = useState<string>("");
	const [major, setMajor] = useState<string>("");
	const [lectureNumber, setLectureNumber] = useState<string>("");
	const [width, setWidth] = useState<number>(1000);

	const [campusInSelfForm, setCampusInSelfForm] = useState<string>("");
	const [gradeInSelfForm, setGradeInSelfForm] = useState<string>("");
	const [professorInSelfForm, setProfessorInSelfForm] = useState<string>("");
	const [nameInSelfForm, setNameInSelfForm] = useState<string>("");
	const [categoryInSelfForm, setCategoryInSelfForm] = useState<string>("");
	const [majorInSelfForm, setMajorInSelfForm] = useState<string>("");
	const [lectureNumberInSelfForm, setLectureNumberInSelfForm] = useState<string>("");
	const [creditInSelfForm, setCreditInSelfForm] = useState<string>("");
	const [groupInSelfForm, setGroupInSelfForm] = useState<string>("");
	const [roomInSelfForm, setRoomInSelfForm] = useState<string>("");
	const [timeInSelfForm, setTimeInSelfForm] = useState<string>("");

	const [auth, setAuth] = useRecoilState(authState);

	const [timeTable, setTimeTable] = useState<Record<string, unknown[]>>({
    '월': [],
    '화': [],
    '수': [],
    '목': [],
    '금': [],
		lectures: []
  });

	const handleWindowSizeChange = () => {
			setWidth(window.innerWidth);
	}

	const loadTimetableFromLocalStorage = () => {
		const savedTimeTable = localStorage.getItem('timeTable');
		if (savedTimeTable != null) {
			setTimeTable(JSON.parse(savedTimeTable));
		}
	}

	useEffect(() => {
			setWidth(window.innerWidth);
			window.addEventListener('resize', handleWindowSizeChange);
			return () => {
					window.removeEventListener('resize', handleWindowSizeChange);
			}
	}, []);

	const loadTimetable = async () => {
		if (auth.isLoggedIn) {
			const account = await AccountApi.getAccount(auth.token);
			if (account.savedTimeTable == '') {
				const savedTimeTable = localStorage.getItem('timeTable');
				if (savedTimeTable != null) {
					await AccountApi.uploadTimetable(auth.token, savedTimeTable);
					loadTimetableFromLocalStorage();
					return null;
				}
			}
			return account.savedTimetable;
		} else {
			loadTimetableFromLocalStorage();
			return null;
		}
	};

	useEffect(() => {
    const fetchData = async () => {
			const timetableData = await loadTimetable();
			if (timetableData !== null) {
					setTimeTable(JSON.parse(timetableData));
			}
    };

    fetchData();
	}, []);

	const onSearchButtonClicked = async () => {
		const lecturesFromApi = await LectureApi.loadLectures({campusName: campus, grade, professor, name, major, group: timezone, query: query.replaceAll(' ', ''), lectureNumber});
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
		if (auth.isLoggedIn) {
			await AccountApi.uploadTimetable(auth.token, JSON.stringify({
				...newTimeTable,
				lectures,
			}));
		} else {
			localStorage.setItem('timeTable', JSON.stringify({
				...newTimeTable,
				lectures,
			}));
		}
	}

	const onAddLectureSelfButtonClicked = async () => {
		if (nameInSelfForm == "") {
			alert("강의명을 입력해주세요.");
			return;
		}
		const lecture ={
			id: new Date().getTime(),
			professor: professorInSelfForm,
			name: nameInSelfForm,
			campusName: campusInSelfForm,
			lectureNumber: lectureNumberInSelfForm,
			grade: gradeInSelfForm,
			room: roomInSelfForm,
			time: timeInSelfForm,
			year: 2024,
			semester: 1,
			credit: creditInSelfForm,
			category: categoryInSelfForm,
			group: groupInSelfForm,
			major: majorInSelfForm
	}
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

	const onKeyDownInSelfForm = (e) => {
		if (e.key == 'Enter') {
			onAddLectureSelfButtonClicked();
		}
	}

	return (
		<>
		<Card className="flex-col items-center justify-center mb-2 w-full">
			<h1 className="text-center font-bold text-xs">어플리케이션 설치 방법 (모바일)</h1>
			<h1 className="text-center text-xs">안드로이드: 크롬으로 접속 -&gt; 브라우저 우측 메뉴 -&gt; 앱 설치</h1>
			<h1 className="text-center text-xs">아이폰: 사파리로 접속 -&gt; 공유 아이콘 클릭 -&gt; 홈 화면에 추가</h1>
			<h1 className="text-center font-bold text-xs">구글 로그인으로 시간표를 계정과 동기화해보세요! (현재 작업한 시간표가 모두 사라지니 조심하세요!)</h1>
		</Card>
			<h1 className="text-center text-xl font-bold mb-2">시간표</h1>
			<div className="m-auto max-w-[1000px]">
				<div className="w-full">
					<div className="grid grid-cols-5 text-center">
							<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">월</span>
							<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">화</span>
							<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">수</span>
							<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">목</span>
							<span className="text-sm text-center p-2 bg-[#0070F0] text-white border shadow-xl rounded-xl">금</span>
					</div>
					{
						timeTable.lectures &&
						[1,2,3,4,5,6,7,8,9,10].map((item) => (
							<div className="grid grid-cols-5 text-center" key={item}>
									{ timeTable['월'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['월'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-white border border-gray-300 shadow-2xl rounded-xl"></div>) }
									{ timeTable['화'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['화'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-white border border-gray-300 shadow-2xl rounded-xl"></div>) }
									{ timeTable['수'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['수'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-white border border-gray-300 shadow-2xl rounded-xl"></div>) }
									{ timeTable['목'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['목'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-white border border-gray-300 shadow-2xl rounded-xl"></div>) }
									{ timeTable['금'].some(time => time.time == item) ? (<div className="text-sm text-center p-1 sm:p-2 bg-[#90B8E7] text-white border border-gray-300 shadow-2xl rounded-xl">{timeTable['금'].find(time => time.time == item).lecture.name}</div>) : (<div className="text-sm text-center p-2 bg-white border border-gray-300 shadow-2xl rounded-xl"></div>) }
							</div>
						))
					}
				</div>
			</div>
				{
					timeTable.lectures &&
					timeTable.lectures.filter(lecture => lecture.time == "").length > 0 &&
					(
						<>
							<h1 className="text-center text-sm mt-2 font-bold">시간표에 배치되지 않은 강의</h1>
							{
								timeTable.lectures.filter(lecture => lecture.time == "")
									.map(lecture => (
											<h2 className="text-xs text-center" key={lecture.id}>{lecture.name}</h2>
									))
							}
						</>
					)
				}
			<Card className="flex-col items-center justify-center p-4 mt-2 gap-4 w-full">
				<h1 className="text-center text-md font-bold">추가한 강의</h1>
				{
					timeTable.lectures &&
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
				<h1 className="text-center text-md font-bold">강의 검색 및 추가</h1>
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
							<Input type="number" placeholder="강의번호" className="m-2 w-30" variant="bordered" onChange={(e) => setLectureNumber(e.target.value)}/>
						</AccordionItem>
					</Accordion>
				</div>
				<Button variant="shadow" color="primary" className="m-2 w-full" onClick={onSearchButtonClicked}>
					검색
				</Button>
			</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 gap-4 w-full">
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
			<Card className="flex-col flex items-center justify-center mt-20 p-4 w-full">
				<div className="flex flex-wrap content-center w-full" onKeyDown={onKeyDownInSelfForm}>
						<Accordion>
							<AccordionItem aria-label="강의 직접 입력해서 추가" title="강의 직접 입력해서 추가">
							<Dropdown>
								<DropdownTrigger className="m-2">
									<Button 
										variant="bordered" 
									>
										{ campusInSelfForm + "캠퍼스" || "캠퍼스 선택" }
									</Button>
								</DropdownTrigger>
								<DropdownMenu items={CAMPUS} selectionMode="single" onSelectionChange={keys => setCampusInSelfForm(Array.from(keys).join(", ").replaceAll("_", " "))}>
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
										{ gradeInSelfForm + "학년" || "학년 선택" }
									</Button>
								</DropdownTrigger>
								<DropdownMenu items={GRADE} selectionMode="single" onSelectionChange={keys => setGradeInSelfForm(Array.from(keys).join(", ").replaceAll("_", " "))}>
									{(item: {key: string, label: string}) => (
										<DropdownItem
											key={item.key}
										>
											{item.label}
										</DropdownItem>
									)}
								</DropdownMenu>
							</Dropdown>
							<Input type="title" placeholder="강의명" className="m-2 w-30 w-30" variant="bordered" onChange={(e) => setNameInSelfForm(e.target.value)}/>
							<Input type="title" placeholder="시간대 ex) 금 1 2 3" className="m-2 w-30" variant="bordered" onChange={(e) => setTimeInSelfForm(e.target.value)}/>
							<Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" onChange={(e) => setProfessorInSelfForm(e.target.value)}/>
							<Input type="title" placeholder="학과명" className="m-2 w-30" variant="bordered" onChange={(e) => setMajorInSelfForm(e.target.value)}/>
							<Input type="number" placeholder="학점" className="m-2 w-30" variant="bordered" onChange={(e) => setCreditInSelfForm(e.target.value)}/>
							<Input type="title" placeholder="강의실명" className="m-2 w-30" variant="bordered" onChange={(e) => setRoomInSelfForm(e.target.value)}/>
							<Input type="title" placeholder="시간대구분명" className="m-2 w-30" variant="bordered" onChange={(e) => setGroupInSelfForm(e.target.value)}/>
							<Input type="number" placeholder="강의번호" className="m-2 w-30" variant="bordered" onChange={(e) => setLectureNumberInSelfForm(e.target.value)}/>
							<Button variant="shadow" color="primary" className="m-2 w-30" onClick={onAddLectureSelfButtonClicked}>
								직접 입력한 강의 추가
							</Button>
						</AccordionItem>
					</Accordion>
				</div>
			</Card>
		</>
	);
}
