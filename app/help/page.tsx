'use client'
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { useState } from "react";
import { HelpApi } from "../api/help.api";

export default function Help() {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const onAddButtonClicked = async () => {
		HelpApi.addHelp({title, description});
		setTitle("");
		setDescription("");
		alert("문의가 접수되었습니다.")
	}
	return (
		<>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<Input type="title" placeholder="제목" className="m-2 w-full" variant="bordered" onChange={(e) => setTitle(e.target.value)}/>
				<Textarea placeholder="내용" className="m-2 w-full" variant="bordered" onChange={(e) => setDescription(e.target.value)}/>
				<Button variant="shadow" color="primary" className="m-2 w-full" onClick={onAddButtonClicked}>
					문의 전송
				</Button>
			</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<h1 className="text-center">개발자 이메일</h1>
				<h1 className="text-center">hyeki0206@naver.com</h1>
			</Card>
		</>
	);
}
