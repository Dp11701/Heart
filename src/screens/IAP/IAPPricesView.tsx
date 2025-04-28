import ReactSwitch from "react-switch";
import {useState} from "react";
import {IAPPackModel} from "../../models/IAPPackModel";
import {useStripe} from "@stripe/react-stripe-js";
import {useNavigate} from "react-router-dom";
import {IAPPaymentButton} from "./IAPPaymentButton";
import {IAPConfig} from "../../models/IAPConfig";

interface IAPPricesViewProps {
    pack: IAPPackModel
    isSelected: boolean
    onTapPack: () => void
}

function IAPPackView(props: IAPPricesViewProps) {
    return <div
        onClick={() => {
            props.onTapPack()
        }}
        style={{
            display: 'flex',
            flexDirection: 'row',
            background: 'white',
            border: `2px solid ${props.isSelected ? '#FF3D60' : '#9C9EB9'}`,
            borderRadius: 16,
            padding: '10px 16px',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <span style={{
                fontWeight: 600,
                fontSize: 19,
                color: props.isSelected ? '#2D3142' : '#9C9EB9',
                whiteSpace: 'pre-line',
                textAlign: 'start'
            }}>
                {props.pack.title + "\n"}
                <span style={{
                    fontWeight: 500,
                    fontSize: 15,
                    color: props.isSelected ? '#2D3142' : '#9C9EB9'
                }}>
                    {props.pack.subTitle}
                </span>
            </span>

        <span
            style={{
                whiteSpace: 'pre-line',
                fontWeight: 600,
                fontSize: 15,
                color: props.isSelected ? '#2D3142' : '#9C9EB9',
                textAlign: 'end'
            }}>
                {props.pack.priceTitle}
            </span>
    </div>

}


export function IAPPricesView(props: { config: IAPConfig }) {

    const [selectedPackIndex, setSelectedPackIndex] = useState(0)
    const [isNavigating, setIsisNavigating] = useState(false)
    const navigate = useNavigate()

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0px 24px',
        gap: 10
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            background: 'white',
            border: '1.5px solid #7D8296',
            borderRadius: 14,
            padding: '10px 16px',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <span style={{fontWeight: 500, color: '#7D8296'}}>{props.config.enableFreeTrial}</span>

            <ReactSwitch
                checked={selectedPackIndex === 0}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor={'#FF3D60'}
                activeBoxShadow={'0px 0px 2px 3px #FF3D60'}
                onChange={(checked, evnet, id) => {
                    setSelectedPackIndex(checked ? 0 : 1)
                }}/>
        </div>

        <IAPPackView
            isSelected={selectedPackIndex === 0}
            onTapPack={() => {
                setSelectedPackIndex(0)
            }}
            pack={{
                title: props.config.title1,
                priceTitle: props.config.price1,
                subTitle: props.config.subtitle1,
            }}/>

        <IAPPackView
            isSelected={selectedPackIndex === 1}
            onTapPack={() => {
                setSelectedPackIndex(1)
            }}
            pack={{
                title: props.config.title2,
                priceTitle: props.config.price2,
                subTitle: props.config.subtitle2
            }}/>
        <IAPPaymentButton config={props.config}/>
        <span style={{
            fontSize: 15,
            whiteSpace: 'pre-line',
            lineHeight: 1.8,
            textAlign: 'center'
        }}>{`You will pay $0 for your 3-day trial, then 6,99 per week. Manage your subscriptions via link đối tác :))\nMoney-back guarantee. Cancel anytime`}</span>
    </div>
}