import icMoneyBack from  '../../assets/icMoneyBack.png';
import icPaymentGuranteed from '../../assets/icPaymentGuranteed.png';
import {IAPConfig} from "../../models/IAPConfig";

export function IAPGuaranteeView(props: { config: IAPConfig }) {

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 16,
        gap: 16
    }}>
        <img src={icPaymentGuranteed} alt={''} style={{ width: 'calc(100% - 48px)', height: 'auto' }}/>
        <span style={{
            whiteSpace: 'pre-line',
            fontSize: 28,
            fontWeight: 'bold'
        }}>{props.config["30Days"]}</span>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            backgroundColor: '#F4F4F4',
            borderRadius: 20,
            margin: '0px 24px'
        }}>
            <span style={{
                color: '#666666',
                textAlign: 'start',
                lineHeight: 1.8
            }}>{props.config.weBelieve}</span>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <span style={{
                    color: '#666666',
                    textAlign: 'start',
                    lineHeight: 1.8
                }}>{props.config.weBelieve2}</span>
                <img src={icMoneyBack} alt={''} style={{ width: 60, height: 60 }}/>
            </div>
        </div>

        <span style={{textAlign: 'start', margin: '0px 24px', lineHeight: 1.8, whiteSpace: 'pre-line'}}>
            <span style={{fontWeight: 'bold'}}>{props.config.yourInfoSafe}</span>
            {`\n${props.config.yourInfoSafe2}\n`}
            <span style={{fontWeight: 'bold'}}>{props.config.secureCheckout}</span>
            {`\n${props.config.secureCheckout2}\n`}
            <span style={{fontWeight: 'bold'}}>{props.config.needHelp}</span>
            {`\n${props.config.needHelp2}`}
            <a href={'mailto:feedback@begamob.com'}>feedback@begamob.com</a>
            {`\n\n`}
            <span style={{
                lineHeight: 1,
                textAlign: 'start',
                fontSize: 12,
                fontStyle: 'italic',
                color: '#979797',
            }}>{props.config.pleaseNote}</span>
        </span>
    </div>
}