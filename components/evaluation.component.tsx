'use client';
import { Card } from '@nextui-org/card';

export const Evaluation = ({ evaluation }) => {
    return (
      <>
        <Card className="grid grid-cols-3 w-full p-2">
						<span className="text-sm text-center">강의명: { evaluation.lecture }</span>
						<span className="text-sm text-center">교수: { evaluation.professor }</span>
						<span className="text-sm text-center">총평: { evaluation.description }</span>
						<span className="text-sm text-center">총점: { evaluation.totalRate }점</span>
        </Card>
      </>
    );
}
