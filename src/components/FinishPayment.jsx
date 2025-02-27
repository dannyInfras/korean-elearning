import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const FinishPayment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { package: selectedPackage, email } = state || {};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-green-600">Thanh toán thành công!</h1>
                <p className="mt-4 text-gray-600">Cảm ơn bạn đã mua gói học tập.</p>
                {selectedPackage && (
                    <>
                        <h2 className="mt-4 text-2xl font-bold">{selectedPackage.title}</h2>
                        <p className="text-gray-600">{selectedPackage.duration}</p>
                        <p className="font-bold text-xl mt-4 text-green-600">
                            Giá: {selectedPackage.price.toLocaleString()} VND
                        </p>
                        <p className="mt-2">Thông tin đã được gửi đến email: <strong>{email}</strong></p>
                    </>
                )}
                <Button
                    type="primary"
                    className="mt-6 w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                    onClick={() => navigate("/")}
                >
                    Quay lại trang chủ
                </Button>
            </div>
        </div>
    );
};

export default FinishPayment;