import icAppIcon from '../assets/icAppIconPayment.png'
import icSuccess2 from '../assets/icSuccess2.png'
import icDownloadAppStore from '../assets/icDownloadAppStore.png'
import QRCode from 'react-qr-code';
import defaultConfig from '../configs/result.json'
import {useEffect, useState} from "react";
import {ResultSuccessConfig} from "../models/ResultSuccessConfig";
import {useParams} from "react-router-dom";
import {FirebaseUtils} from "../utils/FirebaseUtils";


const APP_LINK = 'https://apps.apple.com/app/id6468660073'


export function FinalSuccessScreen() {

    const { languageId } = useParams()

    const [config, setConfig] = useState(ResultSuccessConfig.parse(defaultConfig))

    async function switchConfigs() {
        const locale = localStorage.getItem("languageCode")
        if (locale) {
            try {
                const response = await fetch(`/configs/${locale}/result.json`)
                const json = await response.json();
                const parsed = ResultSuccessConfig.parse(json);
                setConfig(parsed);
            } catch {
                localStorage.removeItem("languageCode");
                setConfig(defaultConfig);
            }
        } else {
            localStorage.removeItem("languageCode");
            setConfig(defaultConfig);
        }
    }

    useEffect(() => {
        switchConfigs().then()
    }, [])

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F4F6FA',
        width: 'calc(100dvw-32px)',
        minHeight: 'calc(100dvh - 48px)',
        padding: '24px 16px'
    }}>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 24,

        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <img src={icAppIcon} alt={''}
                     style={{width: 60, height: 60, borderRadius: 12, boxShadow: '0px 4px 24px 0px #FF255B24'}}/>
                <span style={{fontSize: 24, color: '#FF3D60', fontWeight: 600}}>iCardiac</span>
            </div>

            <span style={{
                fontSize: 28,
                fontWeight: 600,
                whiteSpace: 'pre-line',
                textAlign: 'center',
                color: '#0D0D0E',
                lineHeight: 1.3
            }}>{config.thanks}</span>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <span style={{fontWeight: 600, textAlign: 'center'}} color={'#45454C'}>{config.step1}</span>
                <QRCode value={APP_LINK} size={100}/>
                <a
                    href={APP_LINK}
                    onClick={() => {
                        FirebaseUtils.trackingPayment("click_link");
                    }}
                    target={'_blank'}><img src={icDownloadAppStore} alt={''}
    style={{width: 133, aspectRatio: '133/46'}}/></a>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <span style={{fontWeight: 600, textAlign: 'center'}} color={'#45454C'}>{config.step2}</span>
                <img src={icSuccess2} alt={''} style={{width: 222, aspectRatio: '888/576'}}/>
            </div>

            <span style={{fontWeight: 600}} color={'#45454C'}>{config.step3}</span>
        </div>

    </div>
}