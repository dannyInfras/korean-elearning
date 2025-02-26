import React, { useState } from "react";
import { Modal, Button, Card, Input, notification } from "antd";
import { useTheme } from "../../ThemeContext";
import Navbar from "../../components/Navbar";
import StarsCanvas from "../../components/canvas/Stars";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PackageList = () => {
    const { season } = useTheme();
    const [visible, setVisible] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [orderCode, setOrderCode] = useState("");
    const [verifyOrderCode, setVerifyOrderCode] = useState(""); // For manual input
    const navigate = useNavigate();

    const packages = [
        {
            id: 1,
            duration: "📅 1 Tháng",
            title: "Gói Khởi Động Nhanh",
            description: [
                "Lựa chọn lý tưởng cho người mới bắt đầu học tiếng Hàn.",
                "Trải nghiệm các bài học tương tác mà không có rủi ro.",
            ],
            note: "Dành cho ai muốn thử nghiệm và làm quen với lộ trình học.",
            price: 2000,
        },
        {
            id: 2,
            duration: "📅 6 Tháng",
            title: "Gói Giá Trị Tốt Nhất",
            description: [
                "🔥 (Phổ biến nhất!)",
                "Lộ trình học tập rõ ràng giúp ghi nhớ và tiến bộ nhanh hơn.",
                "Cam kết lâu dài giúp bạn duy trì động lực học tập.",
                "Tiết kiệm hơn so với gói hàng tháng!",
            ],
            note: "Thích hợp cho người học nghiêm túc muốn thấy sự tiến bộ thực sự.",
            price: 650000,
        },
        {
            id: 3,
            duration: "📅 1 Năm",
            title: "Gói Trải Nghiệm Tuyệt Vời Nhất",
            description: [
                "🏆 (Ưu đãi tốt nhất!)",
                "Truy cập toàn bộ nội dung bài học và tính năng cao cấp.",
                "Không quảng cáo – giúp bạn tập trung 100% vào việc học!",
                "Tiết kiệm lớn nhất – chỉ thanh toán một lần, học cả năm!",
            ],
            note: "Lựa chọn tốt nhất cho những ai cam kết học tập dài hạn.",
            price: 1050000,
        },
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showTransactionModal = (packageItem) => {
        setSelectedPackage(packageItem);
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
        setUserEmail("");
        setOrderCode("");
    };

    const handlePurchase = async () => {
        if (!userEmail || !emailRegex.test(userEmail)) {
            notification.error({
                message: "Email không hợp lệ",
                description: "Vui lòng nhập một địa chỉ email hợp lệ.",
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/payment/create", {
                amount: selectedPackage.price,
                description: selectedPackage.title,
                email: userEmail,
            });

            setOrderCode(response.data.orderCode);
            window.location.href = response.data.checkoutUrl;
        } catch (error) {
            notification.error({
                message: "Lỗi khi tạo thanh toán",
                description: "Có lỗi xảy ra khi tạo liên kết thanh toán.",
            });
        }
    };

    const handleCancel = async () => {
        if (orderCode) {
            try {
                await axios.post("http://localhost:8000/payment/cancel", { orderCode });
                notification.info({
                    message: "Đã hủy thanh toán",
                    description: "Giao dịch của bạn đã được hủy.",
                });
                closeModal();
            } catch (error) {
                notification.error({
                    message: "Lỗi khi hủy",
                    description: "Không thể hủy giao dịch lúc này.",
                });
            }
        } else {
            closeModal();
        }
    };

    const handleVerifyOrderCode = async () => {
        if (!verifyOrderCode) {
            notification.error({
                message: "Vui lòng nhập mã đơn hàng",
                description: "Bạn cần nhập mã đơn hàng để xác minh.",
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/payment/verify-order", {
                orderCode: parseInt(verifyOrderCode),
            });

            console.log(response.data);
            notification.success({
                message: "Xác minh thành công",
                description: "Tài khoản của bạn đã được nâng cấp lên premium!",
            });
            navigate("/finish", { state: { package: selectedPackage, email: userEmail } });
        } catch (error) {
            notification.error({
                message: "Xác minh thất bại",
                description: "Mã đơn hàng không hợp lệ hoặc đã hết hạn.",
            });
        }
    };

    return (
        <>
            <Navbar active="package" />
            <div className={`${season}-gradient z-0 min-h-screen relative overflow-hidden`}>
                <StarsCanvas />
                <div className="pt-20 md:mx-auto min-h-screen p-6">
                    <h1 className={`mb-6 text-center text-4xl font-bold ${season}-text-gradient`}>
                        📦 Gói Học Tập
                    </h1>

                    {/* Verification Form */}
                    <div className="max-w-md mx-auto mb-8 p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-center mb-4">Kích hoạt Premium</h2>
                        <Input
                            placeholder="Nhập mã đơn hàng từ trang thành công"
                            value={verifyOrderCode}
                            onChange={(e) => setVerifyOrderCode(e.target.value)}
                            className="mb-4 p-2 border rounded-lg w-full"
                        />
                        <Button
                            type="primary"
                            className="w-full h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
                            onClick={handleVerifyOrderCode}
                        >
                            Xác minh mã đơn hàng
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-8 justify-center">
                        {packages.map((item) => (
                            <Card
                                key={item.id}
                                className="w-80 text-center shadow-lg p-6 rounded-lg border border-gray-200 bg-white hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                                style={{ borderRadius: "12px", border: "1px solid #ddd", minHeight: "420px" }}
                            >
                                <div className="flex-grow h-96 relative align-center">
                                    <h3 className="text-lg font-semibold text-gray-600">{item.duration}</h3>
                                    <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
                                    <ul className="text-gray-600 text-left mt-4 space-y-2">
                                        {item.description.map((point, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="mr-2">✅</span>{point}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-sm italic text-gray-500 mt-2">📌 {item.note}</p>
                                    <p className="font-bold text-xl mt-4 text-green-600 w-[100%] absolute bottom-0">
                                        Giá: {item.price.toLocaleString()} VND
                                    </p>
                                </div>
                                <Button
                                    type="primary"
                                    className="mt-4 w-full h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-lg transition duration-300"
                                    onClick={() => showTransactionModal(item)}
                                >
                                    Mua Ngay
                                </Button>
                            </Card>
                        ))}
                    </div>

                    <Modal open={visible} footer={null} onCancel={closeModal} title="Xác nhận mua gói học">
                        {selectedPackage && (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">{selectedPackage.title}</h2>
                                <p className="text-gray-600">{selectedPackage.duration}</p>
                                <p className="text-sm italic text-gray-500 mt-2">📌 {selectedPackage.note}</p>
                                <p className="font-bold text-xl mt-4 text-green-600">
                                    Giá: {selectedPackage.price.toLocaleString()} VND
                                </p>
                                <Input
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="mt-4 p-2 border rounded-lg w-full"
                                />
                                <Button
                                    type="primary"
                                    className="mt-4 w-full h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
                                    onClick={handlePurchase}
                                >
                                    Tiến hành thanh toán
                                </Button>
                                <Button
                                    className="mt-4 w-full h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
                                    onClick={handleCancel}
                                >
                                    Hủy giao dịch
                                </Button>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default PackageList;