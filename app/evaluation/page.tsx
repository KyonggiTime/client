'use client'
import { Button, Card, Input, Slider } from "@nextui-org/react";
import { Evaluation } from "@/components/evaluation.component";
import { authState } from '@/states/auth';
import { useRecoilState } from 'recoil';
import { EvaluationApi } from '@/app/api/evaluation.api';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EvaluationPage() {
	const [auth, setAuth] = useRecoilState(authState);
	const { push } = useRouter();
	const [rate, setRate] = useState(5);
	const [lectureForSearch, setLectureForSearch] = useState('');
	const [professorForSearch, setProfessorForSearch] = useState('');
	const [lecture, setLecture] = useState('');
	const [professor, setProfessor] = useState('');
	const [description, setDescription] = useState('');
	const [evaluations, setEvaluations] = useState([]);

	const onSearchButtonClick = async () => {
		const data = await EvaluationApi.getEvaluations(lectureForSearch, professorForSearch);
		setEvaluations(data.evaluations);
	}

	const onLoginButtonClick = () => {
		push('https://server.kyonggiti.me/google');
	}

	const onAddButtonClick = async () => {
		if (auth.token == null) {
			alert('로그인이 필요합니다');
			push('https://server.kyonggiti.me/google');
		}
		try {
			if (lecture == '' && professor == '') {
				alert('');
				return;
			}
			await EvaluationApi.createEvaluation(auth.token, {
				nameOfLecture: lecture,
				nameOfProfessor: professor,
				totalRate: rate,
				description,
			});
			alert('등록이 완료되었습니다!');
		} catch (err) {
			alert('이미 등록 된 강의 평가입니다!');
		}
	}

	return (
		<>
		<Card className="p-4 mt-2">
			<h1 className="m-2 font-bold text-lg text-center">강의평가</h1>
			{
				auth.token ? (
					<>
						<Input type="title" placeholder="강의명" className="m-2 w-30" variant="bordered" onChange={(e) => setLecture(e.target.value)}/>
						<Input type="title" placeholder="교수명" className="m-2 w-30" variant="bordered" onChange={(e) => setProfessor(e.target.value)}/>
						<Input type="title" placeholder="총평" className="m-2 w-30" variant="bordered" onChange={(e) => setDescription(e.target.value)}/>
						평점: {rate} <Slider   
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
						<Button variant="shadow" color="primary" className="m-2 w-30" onClick={onAddButtonClick}>
							평가 추가하기
						</Button>
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
						{
							evaluations.map(evaluation => (
								<Evaluation evaluation={evaluation}/>
							))
						}
					</>
				) : <>
					<Button variant="shadow" color="primary" className="m-2 w-30" onClick={onLoginButtonClick}>
						로그인하고 평가 보러가기
					</Button>
				</>
			}
		</Card>
		</>
	);
}
