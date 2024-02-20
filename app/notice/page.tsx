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
			<h1 className="text-center font-bold">안녕하세요 경기타임 개발자입니다.</h1>
			<h1 className="text-center">안녕하세요 시간표 작성 사이트 경기타임 개발자입니다. 감사 인사 및 버그 제보를 받기 위해 글을 썼습니다. <br/>
2~4학년 수강신청 기간이 종료되었음에도 경기타임의 사용자 수가 최고치(하루 방문자수 천 명 돌파)를 경신했습니다. 왜 그런가 하고 살펴보니 신입생 분들이 시간표 작성에 불편을 겪어 많이 이용을 해주고 계신 것이었습니다. (학번이 안나오면 쿠티스를 못쓰는 걸 몰랐습니다. 쿠티스 없이 시간표를 짜다니...) <br/>
경기타임에 부족함이 많음에도 이용해주신 모든 학우분께 정말로 감사합니다! 특히나 사용하시다 불편한 점을 제보해주신 분들껜 더더욱 감사드립니다. (에타에 올라온 글 모두 확인했고 수정 예정입니다.) <br/>
경기타임을 이용해주시는 많은 학우분들께 보답하고자 버그와 불편한 점을 제보 받아 사용성을 더욱 개선하고자 합니다! 문의 페이지를 통해 불편한 점을 제보해주시면 빠른 시일내에 개선하도록 하겠습니다. 경기타임을 이용해주셔서 정말 정말 감사합니다!</h1>
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
			<h1 className="text-center">학점계산기 페이지 추가</h1>
			<h1 className="text-center">문의 페이지 추가</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-center font-bold">업데이트 예정</h1>
		</Card>
		</>
	);
}
