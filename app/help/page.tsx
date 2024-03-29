'use client'
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { HelpApi } from "../api/help.api";
import { AccountApi } from "../api/account.api";

export default function Help() {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const onAddButtonClicked = async () => {
		HelpApi.addHelp({title, description});
		setTitle("");
		setDescription("");
		alert("문의가 접수되었습니다.")
	}

	const callapi = async () => {
		const accessToken = await AccountApi.getAccessToken('ae5fba13-1c33-4e8c-a3ef-40ac225b09b9');
		console.dir(accessToken);
	}

	useEffect(() => {
		callapi();
	}, []);

	return (
		<>
			<h1 className="text-center text-xl font-bold mb-4">공지사항</h1>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<h1 className="text-center font-bold">경기타임 Next.js 팀원 모집 <a className="text-blue-600 underline" href="https://everytime.kr/375140/v/331630405">모집 글</a></h1>
			</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<h1 className="text-center font-bold">업데이트 예정</h1>
				<h1 className="text-center">시간표 여러 개 저장</h1>
				<h1 className="text-center">강의평 추가 (현재 작업중)</h1>
				<br/>
				<h1 className="text-center font-bold">업데이트 내역</h1>
				<h1 className="text-center">구글 계정으로 시간표 / 학점계산기 동기화</h1>
				<h1 className="text-center">시간표가 제대로 저장되지 않는 문제 수정</h1>
				<h1 className="text-center">계정에 시간표 정보가 없는 경우 로컬의 시간표를 업로드하여 동기화</h1>
				<h1 className="text-center">강의 계산기 UI 개선 및 패논패 지원</h1>
			</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<h1 className="text-center font-bold">경기타임 개발과정 후기</h1>
				<h1 className="text-center">
					<a className="text-blue-600 underline" href="https://velog.io/@jinhyeokfang/25%EC%8B%9C%EA%B0%84-%EC%95%88%EC%97%90-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%88%84%EC%A0%81-%EB%B0%A9%EB%AC%B8-800-%EC%9D%B4%EC%83%81-%EC%B0%8D%EC%9D%80-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%95%EA%B3%BC-%ED%9B%84%EA%B8%B0">개발 과정과 후기</a><br/>
					<a className="text-blue-600 underline" href="https://velog.io/@jinhyeokfang/%ED%95%98%EB%A3%A8-%ED%8F%89%EA%B7%A0-550%EB%AA%85%EC%9D%B4-%EB%B0%A9%EB%AC%B8%ED%95%98%EB%8A%94-%EA%B2%BD%EA%B8%B0%ED%83%80%EC%9E%84-%EC%B6%9C%EC%8B%9C-%ED%9B%84-%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98-%ED%9B%84%EA%B8%B0">출시 후 유지보수 후기</a><br/>
				</h1>
			</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<Input type="title" placeholder="제목" className="m-2 w-full" variant="bordered" onChange={(e) => setTitle(e.target.value)}/>
				<Textarea placeholder="내용 (회신을 원하시는 경우 회신받을 이메일도 입력해주세요.)" className="m-2 w-full" variant="bordered" onChange={(e) => setDescription(e.target.value)}/>
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
