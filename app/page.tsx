'use client'
import { authState } from "@/states/auth";
import { Card } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function Home() {
	const [auth, setAuth] = useRecoilState(authState);
	const { push } = useRouter();

	return (
		<>
		<h1 className="text-2xl mb-2 font-bold text-center w-full">앱 메뉴</h1>
		<div className="flex flex-wrap gap-4 justify-center">
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/evaluation')}>
				<h1 className="text-2xl">강의평가</h1>
			</Card>
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/timetable')}>
				<h1 className="text-2xl">시간표</h1>
			</Card>
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/map')}>
				<h1 className="text-2xl">학교 지도</h1>
			</Card>
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/calculator')}>
				<h1 className="text-2xl">학점계산기</h1>
			</Card>
		</div>
		<Card className="flex-col items-center justify-center my-6 w-full">
			<h1 className="text-center font-bold text-md">어플리케이션 설치 방법 (모바일)</h1>
			<h1 className="text-center text-md">아이폰: 사파리로 접속 -&gt; 공유 아이콘 클릭 -&gt; 홈 화면에 추가</h1>
			<h1 className="text-center text-md">안드로이드: 크롬으로 접속 -&gt; 브라우저 우측 메뉴 -&gt; 앱 설치</h1>
		</Card>
		<Card className="flex-col items-center justify-center my-6 w-full">
			<h1 className="text-center font-bold text-md">로그인하여 시간표를 휴대폰 / PC와 동기화하세요!</h1>
		</Card>
		<div className="flex flex-wrap gap-4 justify-center">
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/help')}>
				<h1 className="text-2xl">공지사항 및 문의</h1>
			</Card>
			{
				auth.isLoggedIn ?
				(
					<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('https://api.kyonggiti.me/google/logout')}>
						<h1 className="text-2xl">로그아웃</h1>
					</Card>
				) :	
				(
					<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('https://api.kyonggiti.me/google')}>
						<h1 className="text-2xl">로그인</h1>
					</Card>
				)
			}
		</div>
		</>
	);
}
