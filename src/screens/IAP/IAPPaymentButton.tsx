import React, {CSSProperties} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import PaymentButton from "../../components/PaymentButton";
import {IAPConfig} from "../../models/IAPConfig";

const customStyles = {
    content: {
        position: 'relative',
        inset: 'auto', // loại bỏ mặc định top/bottom
        margin: 'auto',
        padding: '20px',
        width: 'fit-content',
        height: 'fit-content',
        maxHeight: '90vh',
        overflow: 'auto',
        borderRadius: '20px',
    } as CSSProperties,
    overlay: {
        zIndex: 1000,
        pointerEvents: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyConstent: 'center',
    } as CSSProperties,
};


export function IAPPaymentButton(props: { config: IAPConfig }) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
    }

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
                onClick={async () => {
                    setIsOpen(true)
                }}
            >
                {
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: 'white'
                    }}>{props.config.purchaseButton}</span>
                }
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    width: '300px'
                }}>
                    <span style={{
                        fontWeight: 600,
                        fontSize: 22,
                        textAlign: 'center'
                    }}>{props.config.selectPaymentMethod}</span>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{
                            fontSize: 16,
                            color: '#81828F'
                        }}>{props.config.priceToday}</span>

                        <span style={{
                            fontSize: 16,
                            color: '#81828F'
                        }}>{props.config.priceTodayDes}</span>
                    </div>

                    <PaymentButton
                        config={props.config}
                        productId={'price_1R6lPHGdp6dTWxMQvInEOjae'}
                        paymentMethod={'STRIPE'}
                        dismissModal={() => setIsOpen(false)}
                    />

                    <PaymentButton
                        config={props.config}
                        productId={'prod_1234'}
                        paymentMethod={'PAY_PAL'}
                        dismissModal={() => setIsOpen(false)}
                    />


                    <span style={{
                        fontSize: 16,
                        color: '#81828F'
                    }}>You’ll pay $0 today for your 3-day trial, and then $6.99 per week after your trial ends. Manage your subscriptions via 1 đường link</span>
                </div>

            </Modal>
        </div>
    );
}