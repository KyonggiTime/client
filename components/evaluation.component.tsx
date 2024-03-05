'use client';
import { Card } from '@nextui-org/card';

export const Evaluation = ({ evaluation }) => {
    return (
      <>
        <Card className="grid grid-cols-3 w-full p-2">
						<span className="text-sm text-center">{ evaluation.lecture }</span>
						<span className="text-sm text-center">{ evaluation.professor }</span>
						<span className="text-sm text-center">{ evaluation.totalRate }점</span>
        </Card>
      </>
    );
}
