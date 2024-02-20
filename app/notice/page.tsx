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
			<h1 className="text-center font-bold">경기타임 개발과정 후기</h1>
			<h1 className="text-center">
				<a className="text-blue-600 underline" href="https://velog.io/@jinhyeokfang/25%EC%8B%9C%EA%B0%84-%EC%95%88%EC%97%90-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%88%84%EC%A0%81-%EB%B0%A9%EB%AC%B8-800-%EC%9D%B4%EC%83%81-%EC%B0%8D%EC%9D%80-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%95%EA%B3%BC-%ED%9B%84%EA%B8%B0">개발 과정과 후기</a><br/>
				<a className="text-blue-600 underline" href="https://velog.io/@jinhyeokfang/%ED%95%98%EB%A3%A8-%ED%8F%89%EA%B7%A0-550%EB%AA%85%EC%9D%B4-%EB%B0%A9%EB%AC%B8%ED%95%98%EB%8A%94-%EA%B2%BD%EA%B8%B0%ED%83%80%EC%9E%84-%EC%B6%9C%EC%8B%9C-%ED%9B%84-%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98-%ED%9B%84%EA%B8%B0">출시 후 유지보수 후기</a><br/>
			</h1>
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
			<h1 className="text-center">학년 미입력시 전공 과목이 뜨지 않는 오류 수정 (hotfix)</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="text-center font-bold">업데이트 예정</h1>
		</Card>
		</>
	);
}
