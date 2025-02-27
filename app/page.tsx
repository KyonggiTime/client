'use client'
import { authState } from "@/states/auth";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { AiFillCalendar } from "react-icons/ai";
import { RiNumbersFill } from "react-icons/ri";
import { FaMap, FaGoogle, FaIdCard } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

export default function Home() {
	const [auth, setAuth] = useRecoilState(authState);
	const { push } = useRouter();

	return (
		<>
		<div className="flex flex-wrap gap-4 justify-center">
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/timetable')}>
				<h1 className="flex items-center text-2xl"><AiFillCalendar />&nbsp;시간표</h1>
			</Card>
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/student-id')}>
				<h1 className="flex items-center text-2xl"><FaIdCard />&nbsp;학생증</h1>
			</Card>
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/map')}>
				<h1 className="flex items-center text-2xl"><FaMap />&nbsp;지도</h1>
			</Card>
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/evaluation')}>
				<h1 className="flex items-center text-2xl"><RiNumbersFill />&nbsp;강의평</h1>
			</Card>
		</div>
		<Card className="flex-col items-center justify-center my-6 w-full">
			<h1 className="text-center font-bold text-md">앱 설치 방법</h1>
			<h1 className="text-center text-md">아이폰: 사파리 -&gt; 공유 아이콘 -&gt; 홈 화면에 추가</h1>
			<h1 className="text-center text-md">갤럭시: 크롬 -&gt; 크롬 우측 메뉴 -&gt; 앱 설치</h1>
		</Card>
		<div className="flex flex-wrap gap-4 justify-center">
			<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('/help')}>
				<h1 className="flex items-center text-2xl"><IoIosAlert />&nbsp;문의</h1>
			</Card>
			{
				auth.isLoggedIn ?
				(
					<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('https://server.kyonggiti.me/google/logout')}>
						<h1 className="flex items-center text-2xl"><FaGoogle />&nbsp;로그아웃</h1>
					</Card>
				) :	
				(
					<Card className="flex-col items-center justify-center w-[45%] p-4 cursor-pointer bg-primary-400 text-white shadow-2xl" isPressable onClick={() => push('https://server.kyonggiti.me/google')}>
						<h1 className="flex items-center text-2xl"><FaGoogle />&nbsp;로그인</h1>
					</Card>
				)
			}
		</div>
		</>
	);
}
