'use client';
import { Card } from '@nextui-org/card';

export const Evaluation = ({ evaluation }) => {
    return (
      <>
        <Card className="grid grid-cols-3 w-full mt-2 p-2">
						<span className="text-sm text-center">강의명: { evaluation.nameOfLecture }</span>
						<span className="text-sm text-center">교수: { evaluation.nameOfProfessor }</span>
						<span className="text-sm text-center">{ evaluation.totalRate }점</span>
            <p>총평: { evaluation.description }</p>
        </Card>
      </>
    );
}
