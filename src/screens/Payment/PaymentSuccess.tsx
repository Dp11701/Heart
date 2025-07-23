import icAppIcon from '../../assets/icAppIconPayment.png'
import icAppleLogo from '../../assets/icAppleLogo.png'
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {FirebaseUtils} from "../../utils/FirebaseUtils";
import {UserInfo} from "../../models/UserInfo";
import {Utils} from "../../utils/Utils";

function loadUserInfo(): UserInfo {
    try {
        return UserInfo.parse(JSON.parse(localStorage.getItem("userInfo") || '{}'))
    } catch (e) {
        return UserInfo.parse({})
    }
}

export function PaymentSuccess() {

    const [config, setConfig] = useState(Utils.shared.defaultResultConfig)
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        switchConfigs().then()
        register().then()

        localStorage.removeItem("sessionId")
        localStorage.removeItem("authorization_code");
    }, [])

    async function switchConfigs() {
        const locale = localStorage.getItem("languageCode")
        if (locale) {
            try {
                const response = await Utils.shared.resultConfig(locale);
                setConfig(response);
            } catch {
                localStorage.removeItem("languageCode");
                setConfig(Utils.shared.defaultResultConfig);
            }
        } else {
            localStorage.removeItem("languageCode");
            setConfig(Utils.shared.defaultResultConfig);
        }
    }

    async function register() {
        try {
            const userInfo = loadUserInfo();
            const response = await fetch(
                `${process.env.REACT_APP_TECH_URL}/api/v1/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "bundle_id": "com.pulse.heartkit",
                        "email_user_input": userInfo.email,
                        "raw_data": userInfo,
                        "session_id": localStorage.getItem("sessionId") || "",
                        "type": "apple"
                    })
                }
            );

            const json = await response.json();
            console.log(json);
        } catch (error) {

        }
    }


    async function handleSignInWithApple() {
        try {
            const userInfo = loadUserInfo()
            FirebaseUtils.trackingPayment("sign_in")
            const data = await (window as any).AppleID.auth.signIn()

            console.log(data)
            if (data.authorization) {
                const code = data.authorization.code;
                const idToken = data.authorization.id_token;
                localStorage.setItem("authorization_code", code);
                navigate("/success")
            } else {

            }
        } catch ( error ) {
            console.error("Error during registration:", error);
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