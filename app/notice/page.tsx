'use client'
import { Card } from "@nextui-org/card";

export default function Notice() {
	return (
		<>
		<h1 className="text-center text-xl font-bold mb-4">공지사항</h1>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-red-500 text-md font-bold">주의</h1>
			<h2 className="text-red-500">잘못 기입된 강의가 존재할 수 있습니다. 시간표를 다 만드시고 나서 꼭 수강신청 사이트에서 확인해주세요!!</h2>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-center">경기타임 개발자 감사 인사 및 버그 제보 글</h1>
			<h1 className="text-center"><a className="text-blue-600 underline" href="https://everytime.kr/385881/v/331188454">글로 이동하기</a></h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-center font-bold">20일 2시 서버 오류 관련 사과말씀</h1>
			<h1 className="text-center">2월 20일 오후 2시부터 15분동안 서버에 문제가 생겨 검색 기능이 사용 불가했습니다. (무중단 배포 관련 오류)<br/>
			 서버 오류는 현재 수정된 상태로 정상적으로 이용 가능합니다. 불편을 끼쳐 대단히 죄송합니다.</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-center font-bold">업데이트 내역</h1>
			<h1 className="text-center">텍스트 가독성 / 디자인 개선</h1>
			<h1 className="text-center">띄어쓰기 시 강의가 검색되지 않는 오류 수정</h1>
			<h1 className="text-center">학년 조건 입력 시 나머지 조건이 무시되는 오류 수정</h1>
			<h1 className="text-center">API 서버 배포과정 수정 (hotfix)</h1>
			<h1 className="text-center">공지사항 페이지 추가</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-center font-bold">업데이트 예정</h1>
			<h1 className="text-center">학점계산기 페이지 추가</h1>
			<h1 className="text-center">문의 페이지 추가</h1>
		</Card>
		</>
	);
}
