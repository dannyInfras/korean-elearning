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
            duration: "📅 1 Month",
            title: "Quick Start Package",
            description: [
                "An ideal choice for beginners learning Korean.",
                "Experience interactive lessons with no risk.",
            ],
            note: "Suitable for those who want to try and get familiar with the learning path.",
            price: 120000,
        },
        {
            id: 2,
            duration: "📅 6 Months",
            title: "Best Value Package",
            description: [
                "🔥 (Most popular!)",
                "A clear learning path to help you remember and progress faster.",
                "A long-term commitment to keep you motivated.",
                "More savings compared to the monthly package!",
            ],
            note: "Perfect for serious learners who want to see real progress.",
            price: 650000,
        },
        {
            id: 3,
            duration: "📅 1 Year",
            title: "Ultimate Experience Package",
            description: [
                "🏆 (Best deal!)",
                "Access to all lesson content and premium features.",
                "Ad-free – allowing you to focus 100% on learning!",
                "Biggest savings – pay once, learn all year!",
            ],
            note: "The best choice for those committed to long-term learning.",
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
                message: "Invalid email",
                description: "Please enter a valid email address.",
            });
            return;
        }

        try {
            const response = await axios.post("https://exekoreanapi-production.up.railway.app/payment/create", {
                amount: selectedPackage.price,
                description: selectedPackage.title,
                email: userEmail,
            });

            setOrderCode(response.data.orderCode);
            window.location.href = response.data.checkoutUrl;
        } catch (error) {
            notification.error({
                message: "Error creating payment",
                description: "An error occurred while generating the payment link.",
            });
        }
    };

    const handleCancel = async () => {
        if (orderCode) {
            try {
                await axios.post("https://exekoreanapi-production.up.railway.app/payment/cancel", { orderCode });
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
            const response = await axios.post("https://exekoreanapi-production.up.railway.app/payment/verify-order", {
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
                        📦Learning Package
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
                          Verify order code
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
                                        Price: {item.price.toLocaleString()} VND
                                    </p>
                                </div>
                                <Button
                                    type="primary"
                                    className="mt-4 w-full h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-lg transition duration-300"
                                    onClick={() => showTransactionModal(item)}
                                >
                                    Buy Now
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
                                    Make payment
                                </Button>
                                <Button
                                    className="mt-4 w-full h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
                                    onClick={handleCancel}
                                >
                                   Cancel transaction
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