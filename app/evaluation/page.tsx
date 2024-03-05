'use client'
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { Evaluation } from "@/components/evaluation.component";
import { authState } from '@/states/auth';
import { useRecoilState } from 'recoil';
import { EvaluationApi } from '@/app/api/evaluation.api';
import { useState } from "react";

export default function EvaluationPage() {
	const [auth, setAuth] = useRecoilState(authState);
	const [rate, setRate] = useState(5);
	const [lectureForSearch, setLectureForSearch] = useState('');
	const [professorForSearch, setProfessorForSearch] = useState('');
	const [lecture, setLecture] = useState('');
	const [professor, setProfessor] = useState('');
	const [evaluations, setEvaluations] = useState([]);

	const onSearchButtonClick = () => {

	}

	const onAddButtonClick = () => {
		
	}

	return (
		<>
		<Card className="flex items-center justify-center p-4 mt-2 mb-2 w-full">
			<h1 className="m-2 font-bold text-lg text-center">강의평가 찾기</h1>
			<div className="flex-row w-full">
				<Input type="title" placeholder="강의명" className="m-2 w-30" variant="bordered" onChange={(e) => setLectureForSearch(e.target.value)}/>
				<Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" onChange={(e) => setProfessorForSearch(e.target.value)}/>
			</div>
			<Button variant="shadow" color="primary" className="m-2 w-full" onClick={onSearchButtonClick}>
				검색
			</Button>
		</Card>
		{/* <Evaluation /> */}
		<Card className="p-4 mt-2">
			<h1 className="m-2 font-bold text-lg text-center" onClick={onAddButtonClick}>강의평가 추가하기</h1>
			<Input type="title" placeholder="강의명" className="m-2 w-30" variant="bordered" onChange={(e) => setLecture(e.target.value)}/>
			<Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" onChange={(e) => setProfessor(e.target.value)}/>
			<Slider   
				size="lg"
				step={0.5}
				color="warning"
				showSteps={true}
				maxValue={5} 
				minValue={0} 
				defaultValue={5}
				className="max-w-md m-2"
				onChange={setRate}
			/>
			<Button variant="shadow" color="primary" className="m-2 w-30">
				평가 추가하기
			</Button>
		</Card>
		</>
	);
}
