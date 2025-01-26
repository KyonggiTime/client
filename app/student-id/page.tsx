'use client'

import { QRCode, Input } from "antd";
import { useState, useEffect } from "react";

export default function Map() {
    const [inputValue, setInputValue] = useState("202111505");
    const [qrValue, setQrValue] = useState("");
    
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
            setQrValue(`${inputValue}:${timestamp}`);
        };

        updateQRValue();
        const intervalId = setInterval(updateQRValue, 500);
        
        return () => clearInterval(intervalId);
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <Input
                    placeholder="Input value"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="max-w-xs"
                />
            </div>
            <QRCode value={qrValue} />
            <div className="mt-2 text-sm text-gray-600">
                Current QR Value: {qrValue}
            </div>
        </div>
    );
}