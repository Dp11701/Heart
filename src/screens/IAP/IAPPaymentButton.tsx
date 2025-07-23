import React from 'react';
import {IAPConfig} from "../../models/IAPConfig";
import {FirebaseUtils} from "../../utils/FirebaseUtils";
import {PaymentUtils} from "../../utils/PaymentUtils";
import {ClipLoader} from "react-spinners";
import {toast, ToastContainer} from 'react-toastify';


export function IAPPaymentButton(props: { config: IAPConfig, selectedPackIndex: number }) {

    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            height: 60,
        }}>
            <button
                style={{
                    width: '100%',
                    display: 'flex',
                    height: 60,
                    backgroundColor: '#FF3D60',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 16,
                    border: 'none'
                }}
                disabled={isLoading}
                onClick={async () => {
                    if (isLoading) return;
                    try {
                        setIsLoading(true);
                        FirebaseUtils.trackingPayment('sales', {
                            product_id: props.config.packs[props.selectedPackIndex].productId,
                            price: props.config.packs[props.selectedPackIndex].price,
                            currency: "",
                            subscription: "1"
                        });
                        await PaymentUtils.checkOut()
                        setIsLoading(false);
                    } catch (e) {
                        setIsLoading(false);
                        toast.error('Payment error. Please try again later.');
                    }
                }}
            >
                {
                    isLoading ? <ClipLoader color={'white'}/> :
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: 'white'
                    }}>{props.config.packs[props.selectedPackIndex].ctaButtonTitle}</span>
                }
            </button>
            <ToastContainer position={'top-center'} autoClose={2000} hideProgressBar={true} closeOnClick={true} />
        </div>
    );
}