import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {FirebaseUtils} from "../../utils/FirebaseUtils";

const PaymentResultScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get("status");

        if (status === "success") {
            localStorage.setItem("sessionId", params.get("session_id") || "");
            FirebaseUtils.trackingPayment("order_completed", {
                status: "completed",
            })
            navigate("/payment-success");
        } else {
            FirebaseUtils.trackingPayment("order_completed", {
                status: "failed",
                reason: status || "unknown",
            })
            if (status === "cancel") {
                navigate("/success-payment-cancel");
            } else {
                navigate("/purchase");
            }
        }
    }, [location, navigate]);

    return <p>Đang xử lý kết quả thanh toán…</p>;
};

export default PaymentResultScreen;