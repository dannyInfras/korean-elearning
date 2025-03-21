import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-red-600">Thanh Toán Đã Hủy!</h1>
                <p className="mt-4 text-gray-600">Bạn đã hủy thanh toán. Vui lòng thử lại nếu cần.</p>
                <Button
                    type="primary"
                    className="mt-6 w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                    onClick={() => navigate("/package")}
                >
                    Quay lại trang gói học
                </Button>
            </div>
        </div>
    );
};

export default Cancel;