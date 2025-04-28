import React, {JSX, useEffect, useState} from "react";
import {IntroStep} from "../models/IntroStep";
import WelcomeScreen from "./WelcomeScreen";
import SelectGenderScreen from "./SelectGenderScreen";
import SelectAgeScreen from "./SelectAgeScreen";
import {SelectHeightScreen} from "./SelectHeightScreen";
import {SelectWeightScreen} from "./SelectWeightScreen";
import {BMIScreen} from "./BMIScreen";
import {SelectRadioView} from "./SelectRadioView";
import {Constants} from "../models/Constants";
import AppHeaderView from "../components/AppHeaderView";
import {AnalyzingScreen} from "./AnalyzingScreen";
import {EmailScreen} from "./EmailScreen";
import {UserInfo} from "../models/UserInfo";
import '../styles/App.css'
import {useNavigate, useParams} from "react-router-dom";
import defaultConfig from '../configs/welcome.json'
import {WelcomeConfig} from "../models/WelcomeConfig";

function IntroScreen() {
    const { locale } = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>(UserInfo.parse({}));
    const [step, setStep] = useState(IntroStep.parse('WELCOME'));

    const [config, setConfig] = useState(WelcomeConfig.parse(defaultConfig));

    useEffect(() => {
        switchConfigs().then()
    }, [locale])

    async function switchConfigs() {
        if (locale) {
            try {
                const response = await fetch(`/configs/${locale}/welcome.json`)
                const json = await response.json();
                const parsed = WelcomeConfig.parse(json);
                localStorage.setItem("languageCode", locale)
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

    const STEPS: IntroStep[] = [
        'WELCOME',
        'SELECT_GENDER',
        'SELECT_AGE',
        'SELECT_WEIGHT',
        'SELECT_HEIGHT',
        'OVERVIEW_INFO',
        'SELECT_CHOLESTEROL',
        'SELECT_BLOOD_PRESSURE',
        'SELECT_HYPERTENSION',
        'SELECT_HIGH_BLOOD_PRESSURE',
        'SELECT_ACTIVITY_LEVEL',
        'SELECT_SLEEP',
        'SELECT_SMOKING_HISTORY',
        'SELECT_ALCOHOL',
        'ANALYZING',
        'SEND_EMAIL',
    ]

    function nextStep() {
        let idx = STEPS.findIndex(e => e === step)
        if (idx + 1 < STEPS.length) {
            setStep(STEPS[idx + 1])
        }
    }

    function previousStep() {
        let idx = STEPS.findIndex(e => e === step)
        if (idx - 1 >=0) {
            setStep(STEPS[idx - 1])
        }
    }

    function screen(step: IntroStep): JSX.Element {
        switch (step) {
            case 'WELCOME':
                return <WelcomeScreen config={config.WELCOME} onContinue={ () => { nextStep() } } />
            case 'SELECT_GENDER':
                return <SelectGenderScreen config={config.SELECT_GENDER} onSelectGender={ (gender) => {
                    setUserInfo({...userInfo, ...{ gender: gender }})
                    nextStep()
                } }
                />
            case 'SELECT_AGE':
                return <SelectAgeScreen config={config.SELECT_AGE} onContinue={ (age) => {
                    setUserInfo({...userInfo, ...{ age: age }})
                    nextStep()
                }}
                />
            case 'SELECT_HEIGHT':
                return <SelectHeightScreen config={config.SELECT_HEIGHT} onContinue={ (value, unit) => {
                    setUserInfo({ ...userInfo, ...{ height: value, heightUnit: unit} })
                    nextStep()
                }}
                />
            case 'SELECT_WEIGHT':
                return <SelectWeightScreen config={config.SELECT_WEIGHT} onContinue={ (value, unit) => {
                    setUserInfo({ ...userInfo, ...{ weight: value, weightUnit: unit} })
                    nextStep() }}
                />

            case 'OVERVIEW_INFO':
                return <BMIScreen config={config.OVERVIEW_INFO} userInfo={userInfo} onContinue={ () => { nextStep() }}/>

            case 'SELECT_CHOLESTEROL':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_CHOLESTEROL}
                    onPickOption= { (option) => {
                        setUserInfo({...userInfo, ...{ cholesterolOption: option }})
                        nextStep()
                    }}
                />

            case 'SELECT_BLOOD_PRESSURE':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_BLOOD_PRESSURE}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ bloodPressureReading: option }})
                        nextStep()
                    }}
                />

            case 'SELECT_HYPERTENSION':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_HYPERTENSION}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ hypertensionOption: option }})
                        nextStep()
                    }}
                />

            case 'SELECT_HIGH_BLOOD_PRESSURE':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_HIGH_BLOOD_PRESSURE}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ highBloodPressureOption: option }})
                        nextStep()
                    }}
                />

            case 'SELECT_ACTIVITY_LEVEL':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_ACTIVITY_LEVEL}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ activityLevelOption: option }})
                        nextStep()
                    }}
                />

            case 'SELECT_SLEEP':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_SLEEP}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ sleepDailyOption: option }})
                        nextStep()
                    }}
                />

            case 'SELECT_SMOKING_HISTORY':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_SMOKING_HISTORY}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ smokeHistory: option }})
                        nextStep()
                    }}
                />

            case 'SELECT_ALCOHOL':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_ALCOHOL}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ drinkAlcoholOption: option }})
                        nextStep()
                    }}
                />

            case 'ANALYZING':
                return <AnalyzingScreen config={config.ANALYZING} onContinue={ () => {
                    console.log(userInfo)
                    nextStep()
                }}/>

            case 'SEND_EMAIL':
                return <EmailScreen config={config.SEND_EMAIL} onContinue={ (email) => {
                    setUserInfo({...userInfo, ...{ email: email }})
                    navigate('/purchase')
                }}/>
            default:
                return <></>
        }
    }

    return <div className='App'>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxWidth: 600,
            margin: '0 auto',
        }}>
            <AppHeaderView
                indexIndicator={STEPS.findIndex(e => e === step) - 1}
                showBackButton={!['WELCOME', 'SEND_EMAIL', 'ANALYZING'].includes(step)}
                onTapBack={() => {
                    previousStep()
                }}
            />
            {screen(step)}
        </div>
    </div>
}

export default IntroScreen;