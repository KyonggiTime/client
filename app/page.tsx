'use client'
import { Card } from "@nextui-org/card";
import { useRouter } from "next/navigation";

export default function Home() {
	const { push } = useRouter();

	return (
		<>
		<h1 className="text-center font-bold text-xs">홈 화면</h1>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full cursor-pointer" isPressable onClick={() => push('/timetable')}>
			<h1 className="font-bold text-3xl text-left w-full">시간표로 이동</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full cursor-pointer" isPressable onClick={() => push('/calculator')}>
			<h1 className="font-bold text-3xl text-left w-full">학점계산기</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full cursor-pointer" isPressable onClick={() => push('/notice')}>
			<h1 className="font-bold text-3xl text-left w-full">공지사항</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full cursor-pointer" isPressable onClick={() => push('/help')}>
			<h1 className="font-bold text-3xl text-left w-full">버그 제보 및 문의</h1>
		</Card>
		<Card className="flex-col items-center justify-center p-4 mt-2 mb-2 w-full cursor-pointer" isPressable onClick={() => push('https://api.kyonggiti.me/google')}>
			<h1 className="font-bold text-3xl text-left w-full">구글 로그인</h1>
		</Card>
		<Card className="flex-col items-center justify-center mb-2 w-full">
			<h1 className="text-center font-bold text-xs">어플리케이션 설치 방법 (모바일)</h1>
			<h1 className="text-center text-xs">안드로이드: 크롬으로 접속 -&gt; 브라우저 우측 메뉴 -&gt; 앱 설치</h1>
			<h1 className="text-center text-xs">아이폰: 사파리로 접속 -&gt; 공유 아이콘 클릭 -&gt; 홈 화면에 추가</h1>
			<h1 className="text-center font-bold text-xs">구글 로그인으로 시간표를 계정과 동기화해보세요! (지금 작성된 시간표 그대로 계정으로 동기화됩니다.)</h1>
		</Card>
		</>
	);
}
