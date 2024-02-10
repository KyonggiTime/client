'use client'
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { CAMPUS } from "@/config/campus";
import { CATEGORY } from "@/config/category";
import { GRADE } from "@/config/grade";
import { LectureApi } from "./api/lecture.api";

export default function Home() {
	const onSearchButtonClicked = async () => {
		const lectures = await LectureApi.loadLectures({});
		console.log(lectures);
	}

	return (
		<Card className="flex-col items-center justify-center shadow-m p-4 w-full">
			<div className="flex items-center w-full shrink-0">
				<Dropdown>
					<DropdownTrigger className="mr-2">
						<Button 
							variant="bordered" 
						>
							캠퍼스 선택
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dynamic Actions" items={CAMPUS}>
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
							이수구분 선택
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dynamic Actions" items={CATEGORY}>
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
							학년 선택
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dynamic Actions" items={GRADE}>
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
				<Input type="title" placeholder="교수명" className="m-2 w-20" variant="bordered" />
				<Input type="title" placeholder="학과명" className="m-2 w-30" variant="bordered" />
			</div>
			<Button variant="shadow" color="primary" className="w-full m-2" onClick={onSearchButtonClicked}>
				검색
			</Button>
		</Card>
	);
}
