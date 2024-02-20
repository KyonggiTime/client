'use client'
import { Card } from "@nextui-org/card";

export default function Help() {
	return (
		<>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<h1 className="text-center"><a className="text-blue-600 underline" href="https://everytime.kr/385881/v/331188454">버그 제보하러 가기</a></h1>
			</Card>
			<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
				<h1 className="text-center">개발자 이메일</h1>
				<h1 className="text-center">hyeki0206@naver.com</h1>
			</Card>
		</>
	);
}
