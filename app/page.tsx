'use client'
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { CAMPUS } from "@/config/campus";
import { CATEGORY } from "@/config/category";
import { GRADE } from "@/config/grade";
import { LectureApi } from "./api/lecture.api";
import { useState } from "react";
import { zeroFill } from "@/util/util";

export default function Home() {
	const [lectures, setLectures] = useState<Record<string, string>[]>([]);
	const [campus, setCampus] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [grade, setGrade] = useState<string>("");
	const onSearchButtonClicked = async () => {
		const lecturesFromApi = await LectureApi.loadLectures({});
		setLectures(lecturesFromApi);
		console.log(lecturesFromApi);
	}

	return (
		<>
			<Card className="flex-col items-center justify-center shadow-m p-4 w-full">
				<div className="flex items-center w-full">
					<Dropdown>
						<DropdownTrigger className="mr-2">
							<Button 
								variant="bordered" 
							>
								{ campus || "캠퍼스 선택" }
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={CAMPUS} selectionMode="single" onSelectionChange={keys => setCampus(keys.valueOf() as string)}>
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
								{ category || "이수구분 선택" }
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={CATEGORY} selectionMode="single" onSelectionChange={keys => setCategory(keys.valueOf() as string)}>
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
								{ grade || "이수구분 선택" }
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={GRADE} selectionMode="single" onSelectionChange={keys => setGrade(keys.valueOf() as string)}>
							{(item: {key: string, label: string}) => (
								<DropdownItem
									key={item.key}
								>
									{item.label}
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
					<Input type="title" placeholder="과목명" className="m-2 w-30" variant="bordered" />
					<Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" />
					<Input type="title" placeholder="학과명" className="m-2 w-30" variant="bordered" />
				</div>
				<Button variant="shadow" color="primary" className="w-full m-2" onClick={onSearchButtonClicked}>
					검색
				</Button>
			</Card>
			<Card className="flex-col items-center justify-center shadow-m p-4 gap-2 w-full">
				<Card className="grid grid-cols-11 gap-4 w-full p-2 text-center">
						<span className="text-sm text-center">캠퍼스</span>
						<span className="text-sm text-center">이수구분</span>
						<span className="text-sm text-center">학점</span>
						<span className="text-sm text-center">학년</span>
						<span className="text-sm text-center">시간대구분</span>
						<span className="text-sm text-center">강의번호</span>
						<span className="text-sm text-center">과 이름</span>
						<span className="text-sm text-center">이름</span>
						<span className="text-sm text-center">교수</span>
						<span className="text-sm text-center">강의실</span>
						<span className="text-sm text-center">시간</span>
				</Card>
				{
					lectures.map(lecture => (
						<Card className="grid grid-cols-11 gap-4 w-full p-2" key={lecture.id}>
							<span className="text-sm text-center">{lecture.campusName}</span>
							<span className="text-sm text-center">{lecture.category}</span>
							<span className="text-sm text-center">{lecture.credit}</span>
							<span className="text-sm text-center">{lecture.grade}</span>
							<span className="text-sm text-center">{lecture.group}</span>
							<span className="text-sm text-center">{zeroFill(lecture.id + "", 4)}</span>
							<span className="text-sm text-center">{lecture.major}</span>
							<span className="text-sm text-center">{lecture.name}</span>
							<span className="text-sm text-center">{lecture.professor}</span>
							<span className="text-sm text-center">{lecture.room}</span>
							<span className="text-sm text-center">{lecture.time}</span>
					</Card>
					))
				}
			</Card>
		</>
	);
}
