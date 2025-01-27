"use client";

import { authState } from "@/states/auth";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { AccountApi } from "../api/account.api";
import { Card, Input, Button } from "@nextui-org/react";
import { QRCode } from "antd";
import Barcode from 'react-barcode';

export default function StudentId() {
    const [auth] = useRecoilState(authState);
    const [studentId, setStudentId] = useState("0");
    const [qrValue, setQrValue] = useState("");
    const [newStudentId, setNewStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchStudentId = async () => {
            try {
                if (auth.isLoggedIn) {
                    const accountData = await AccountApi.getAccount(auth.token) as { studentId?: string };
                    if (accountData.studentId) {
                        setStudentId(accountData.studentId);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch student ID:', error);
            }
        };
        
        fetchStudentId();
    }, [auth]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        try {
            await AccountApi.updateStudentId(auth.token, newStudentId, password);
            const accountData = await AccountApi.getAccount(auth.token) as { studentId?: string };
            if (accountData.studentId) {
                setStudentId(accountData.studentId);
                setNewStudentId("");
                setPassword("");
            }
        } catch (err) {
            setError("학번 업데이트에 실패했습니다. 비밀번호를 확인해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const updateQRValue = () => {
            const now = new Date();
            const timestamp = [
                now.getFullYear(),
                String(now.getMonth() + 1).padStart(2, '0'),
                String(now.getDate()).padStart(2, '0'),
                String(now.getHours()).padStart(2, '0'),
                String(now.getMinutes()).padStart(2, '0'),
                String(now.getSeconds()).padStart(2, '0'),
            ].join('');
            
            setQrValue(`${studentId}:${timestamp}`);
        };

        updateQRValue();
        const intervalId = setInterval(updateQRValue, 500);
        return () => clearInterval(intervalId);
    }, [studentId]);

    return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
            <Card className="w-full max-w-md">
                <div className="flex gap-3 p-4">
                    <div className="flex flex-col">
                        <p className="text-xl font-semibold">학생증 QR</p>
                    </div>
                </div>
                <div className="h-px bg-gray-200 w-full" />
                <div className="p-4">
                    {!auth.isLoggedIn ? (
                        <div className="flex flex-col gap-2 p-4 bg-warning-50 rounded-lg">
                            <p className="text-warning font-semibold">로그인이 필요합니다</p>
                            <p className="text-warning-600">
                                이 기능은 로그인한 사용자만 사용할 수 있습니다.
                            </p>
                        </div>
                    ) : studentId === "0" ? (
                        <div className="flex flex-col gap-2 p-4 bg-warning-50 rounded-lg">
                            <p className="text-warning font-semibold">학번 등록을 위해 KUTIS 로그인이 필요합니다.<br/>QR 생성을 위해 학번이 경기타임 데이터베이스에 저장합니다.<br/>비밀번호는 저장하지 않습니다.</p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
                                <Input
                                    label="학번"
                                    value={newStudentId}
                                    onChange={(e) => setNewStudentId(e.target.value)}
                                    required
                                    isDisabled={isSubmitting}
                                />
                                <Input
                                    label="비밀번호"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    isDisabled={isSubmitting}
                                />
                                {error && <p className="text-danger text-sm">{error}</p>}
                                <Button 
                                    type="submit" 
                                    color="primary" 
                                    isLoading={isSubmitting}
                                >
                                    등록
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl">도서관 출입 QR코드</h1>
                            <QRCode
                                value={qrValue}
                                size={200}
                                className="p-2"
                            />
                            <h1 className="text-3xl">학생증 바코드</h1>
                            <div className="p-2">
                                <Barcode
                                    value={studentId}
                                    format="CODE39"
                                    width={2}
                                    height={100}
                                    displayValue={false}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
