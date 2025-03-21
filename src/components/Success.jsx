import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";

const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderCode = searchParams.get("orderCode"); // PayOS may append orderCode to the URL

    useEffect(() => {
        // Optionally, you can verify the payment status here with the orderCode
        console.log("Payment successful with orderCode:", orderCode);
    }, [orderCode]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-green-600">Thanh Toán Thành Công!</h1>
                <p className="mt-4 text-gray-600">Cảm ơn bạn đã mua gói học tập.</p>
                {orderCode && <p className="mt-2">Mã đơn hàng: <strong>{orderCode}</strong></p>}
                <p className="mt-2">Vui lòng kiểm tra email để nhận mã xác nhận.</p>
                <Button
                    type="primary"
                    className="mt-6 w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                    onClick={() => navigate("/package", { state: { orderCode } })}
                >
                    Quay lại trang gói học
                </Button>
            </div>
        </div>
    );
};

export default Success;