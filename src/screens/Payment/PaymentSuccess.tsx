import icAppIcon from '../../assets/icAppIconPayment.png'
import icAppleLogo from '../../assets/icAppleLogo.png'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import defaultConfig from '../../configs/result.json'
import {ResultSuccessConfig} from "../../models/ResultSuccessConfig";

export function PaymentSuccess() {

    const [config, setConfig] = useState(ResultSuccessConfig.parse(defaultConfig))
    const navigate = useNavigate()

    useEffect(() => {
        switchConfigs().then()
    }, [])

    async function switchConfigs() {
        const locale = localStorage.getItem("languageCode")
        console.log(locale)
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


    async function handleSignInWithApple() {
        try {
            const data = await (window as any).AppleID.auth.signIn()
            // Handle successful response.
            console.log(data)
            if (data.authorization) {
                navigate('/success')
            } else {

            }
        } catch ( error ) {

        }
    }


    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '100dvw',
        height: 'calc(100dvh - 48px)',
        padding: '24px auto'
    }}>
        <div></div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifySelf: 'center',
            alignItems: 'center',
            gap: 12
        }}>
            <img src={icAppIcon} alt={''} style={{
                width: 100,
                height: 100,
                borderRadius: 16,
                boxShadow: '0px 4px 24px 0px #FF355B24'
            }}/>

            <span style={{
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                whiteSpace: 'pre-line',
                lineHeight: 1.5
            }}>{config.paymentSuccessTitle}</span>

        </div>

        <button onClick={handleSignInWithApple}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    height: 56,
                    backgroundColor: 'black',
                    borderRadius: 10,
                    gap: 16,
                    padding: '0px 16px'
                }}>
            <img src={icAppleLogo} alt={''} style={{ width: 32, height: 32 }}/>
            <span style={{fontSize: 18, fontWeight: 600, color: 'white'}}>{config.loginWithApple}</span>
    </button>
    </div>
}