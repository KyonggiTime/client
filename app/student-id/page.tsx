"use client";

import { authState } from "@/states/auth";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { AccountApi } from "../api/account.api";
import { Card } from "@nextui-org/react";
import { QRCode } from "antd";
import Barcode from 'react-barcode';

export default function StudentId() {
    const [auth] = useRecoilState(authState);
    const [studentId, setStudentId] = useState("0");
    const [qrValue, setQrValue] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchStudentId = async () => {
            try {
                if (auth.isLoggedIn) {
                    const accountData: { studentId: string | undefined; } = 
                        await AccountApi.getAccount(auth.token) as { studentId: string | undefined; };
                    if (accountData.studentId) {
                        setStudentId(accountData.studentId);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch student ID:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchStudentId();
    }, [auth]);

    useEffect(() => {
        const updateQRValue = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
            setQrValue(`${studentId}:${timestamp}`);
        };

        updateQRValue();
        const intervalId = setInterval(updateQRValue, 500);
        return () => clearInterval(intervalId);
    }, [studentId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
            </div>
        );
    }

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
                            <p className="text-warning font-semibold">인증이 필요합니다</p>
                            <p className="text-warning-600">
                                이 기능은 관리자에게 인증된 사용자만 사용할 수 있습니다.
                            </p>
                        </div>
                    ) : studentId === "0" && (
                        <div className="flex flex-col gap-2 p-4 bg-warning-50 rounded-lg">
                            <p className="text-warning font-semibold">접근 권한이 없습니다</p>
                            <p className="text-warning-600">
                                학생증 QR 코드 생성 권한이 없습니다. 관리자에게 문의하세요.
                            </p>
                        </div>
                    )}
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
                </div>
            </Card>
        </div>
    );
}
