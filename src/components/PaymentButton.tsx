import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {Stripe} from "@stripe/stripe-js";
import {PaymentMethod} from "../models/PaymentMethod";
import {useNavigate} from "react-router-dom";

import '../styles/PaymentButton.css'
import {ClipLoader} from "react-spinners";
import {OnApproveActions, OnApproveData} from "@paypal/paypal-js/types/components/buttons";
import {IAPConfig} from "../models/IAPConfig";

const PAYPAL_CLIENT_ID = "Af3iGcoCsePb8W3OyjwY31zx34uuYhxcqb7j6WQovkWFJMSdCupp_M8tT6dibvi47DN7aDemwJ2L6jHb";
const SERVER_HOST = "http://54.169.68.101:3000"

function PaymentButton(props: {
    config: IAPConfig
    productId: string,
    paymentMethod: PaymentMethod
    dismissModal: () => void
}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe()

    // Handle Stripe Checkout
    const handleStripeCheckout = async () => {
        if (props.paymentMethod !== 'STRIPE' || !stripe) return;

        const response = await fetch("https://thoroughly-ethical-giraffe.ngrok-free.app/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            setLoading(false)
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend response:", data); // Debug the response

        if (!data.sessionId) {
            throw new Error("No sessionId returned from backend");
        }

        const { error } = await stripe.redirectToCheckout({
            sessionId: data.sessionId,

        });
        if (error) {
            console.error("Stripe redirect error:", error.message);
            console.log(error);
        } else {

        }
    };

    // Handle PayPal Order Creation
    const createPayPalOrder = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://comic-worm-winning.ngrok-free.app/create-paypal-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: props.productId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("PayPal backend response:", data);

            if (!data.orderId) {
                throw new Error("No orderId returned from backend");
            }
            setLoading(false);
            return data.orderId;
        } catch (err: any) {
            console.error("PayPal order creation error:", err);
            setLoading(false);
            throw err;
        }
    };

    // Handle PayPal Order Approval
    const onPayPalApprove = async ( data: OnApproveData, actions: OnApproveActions) => {
        try {
            if (!actions.order) {
                throw new Error("No orderId returned from backend");
            }
            const details = await actions.order.capture()
            navigate('/payment-success')
        } catch (err: any) {
            console.error("PayPal capture error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle PayPal Cancel
    const onPayPalCancel = () => {
        setLoading(false);
        navigate("/purchase")
    };

    // Handle PayPal Error
    const onPayPalError = (err: any) => {
        console.error("PayPal error:", err);
        setLoading(false);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}>
            {props.paymentMethod === "STRIPE" ? (

                <button
                    style={{
                        outline: "none",
                        border: "none",
                        backgroundColor: '#2C2E2F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: 45,
                        borderRadius: 5
                    }}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await handleStripeCheckout()
                        } catch {}
                        setLoading(false)
                    }}
                    disabled={ loading || !stripe}
                >
                    {
                        loading ? <ClipLoader color='white'/> : <span style={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: 18,
                        }}>{props.config.debitOrCredit}</span>
                    }

                </button>
            ) : (
                <PayPalButtons
                    className={'paypal-button'}
                    fundingSource={'paypal'}
                    createOrder={createPayPalOrder}
                    onApprove={onPayPalApprove}
                    onCancel={onPayPalCancel}
                    onError={onPayPalError}
                    style={{ layout: "vertical", height: 45 }}
                />
            )}
        </div>
    );
}

export default PaymentButton;