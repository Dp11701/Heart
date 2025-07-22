import React, {JSX, useEffect, useState} from "react";
import {IntroStep} from "../models/IntroStep";
import WelcomeScreen from "./WelcomeScreen";
import SelectGenderScreen from "./SelectGenderScreen";
import SelectAgeScreen from "./SelectAgeScreen";
import {SelectHeightScreen} from "./SelectHeightScreen";
import {SelectWeightScreen} from "./SelectWeightScreen";
import {BMIScreen} from "./BMIScreen";
import {SelectRadioView} from "./SelectRadioView";
import AppHeaderView from "../components/AppHeaderView";
import {AnalyzingScreen} from "./AnalyzingScreen";
import {EmailScreen} from "./EmailScreen";
import {UserInfo} from "../models/UserInfo";
import '../styles/App.css'
import {useNavigate, useParams} from "react-router-dom";
import defaultConfig from '../configs/welcome.json'
import {WelcomeConfig} from "../models/WelcomeConfig";
import {FirebaseUtils} from "../utils/FirebaseUtils";


function IntroScreen() {
    const { locale } = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>(UserInfo.parse({}));
    const [step, setStep] = useState(IntroStep.parse('WELCOME'));

    const [config, setConfig] = useState(WelcomeConfig.parse(defaultConfig));

    useEffect(() => {
        switchConfigs().then()
    }, [locale]);

    useEffect(() => {
        FirebaseUtils.trackingIntro('welcome');
    }, []);

    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }, [userInfo]);;

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
                return <WelcomeScreen key={step} config={config.WELCOME} onContinue={ () => {
                    nextStep()
                    FirebaseUtils.trackingIntro('continue');
                } } />
            case 'SELECT_GENDER':
                return <SelectGenderScreen key={step} config={config.SELECT_GENDER} onSelectGender={ (gender) => {
                    setUserInfo({...userInfo, ...{ gender: gender }})
                    nextStep()
                    FirebaseUtils.trackingIntro('gender', {
                        gender: gender.toLowerCase()
                    });
                } }
                />
            case 'SELECT_AGE':
                return <SelectAgeScreen key={step} config={config.SELECT_AGE} onContinue={ (age) => {
                    setUserInfo({...userInfo, ...{ age: age }})
                    nextStep()
                    FirebaseUtils.trackingIntro('age', {
                        gender: age.toString().toLowerCase()
                    });
                }}
                />
            case 'SELECT_HEIGHT':
                return <SelectHeightScreen key={step} config={config.SELECT_HEIGHT} onContinue={ (value, unit) => {
                    setUserInfo({ ...userInfo, ...{ height: value, heightUnit: unit} })
                    nextStep()
                    FirebaseUtils.trackingIntro('body_metric', {
                        height: value.toString(),
                        length_unit: unit.toString(),
                        weight: userInfo.weight?.toString() ?? "null",
                        weight_unit: userInfo.weightUnit?.toString() ?? "null"
                    });
                }}
                />
            case 'SELECT_WEIGHT':
                return <SelectWeightScreen key={step} config={config.SELECT_WEIGHT} onContinue={ (value, unit) => {
                    setUserInfo({ ...userInfo, ...{ weight: value, weightUnit: unit} })
                    nextStep()
                }}
                />

            case 'OVERVIEW_INFO':
                return <BMIScreen config={config.OVERVIEW_INFO} userInfo={userInfo} onContinue={ () => {
                    nextStep()
                    FirebaseUtils.trackingIntro('bmi', {
                        status: bmiStatus()
                    });
                }}/>

            case 'SELECT_CHOLESTEROL':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_CHOLESTEROL}
                    onPickOption= { (option) => {
                        setUserInfo({...userInfo, ...{ cholesterolOption: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('cholesterol', {
                            status: option
                        });
                    }}
                />

            case 'SELECT_BLOOD_PRESSURE':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_BLOOD_PRESSURE}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ bloodPressureReading: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('blood_pressure_level', {
                            status: option
                        });
                    }}
                />

            case 'SELECT_HYPERTENSION':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_HYPERTENSION}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ hypertensionOption: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('hypertension', {
                            status: option
                        });
                    }}
                />

            case 'SELECT_HIGH_BLOOD_PRESSURE':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_HIGH_BLOOD_PRESSURE}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ highBloodPressureOption: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('blood_pressure_medication', {
                            status: option
                        });
                    }}
                />

            case 'SELECT_ACTIVITY_LEVEL':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_ACTIVITY_LEVEL}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ activityLevelOption: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('physical_activity_level', {
                            status: option
                        });
                    }}
                />

            case 'SELECT_SLEEP':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_SLEEP}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ sleepDailyOption: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('sleep_duration', {
                            status: option
                        });
                    }}
                />

            case 'SELECT_SMOKING_HISTORY':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_SMOKING_HISTORY}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ smokeHistory: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('smoke', {
                            status: option
                        });
                    }}
                />

            case 'SELECT_ALCOHOL':
                return <SelectRadioView
                    key={step}
                    options={config.SELECT_ALCOHOL}
                    onPickOption={ (option) => {
                        setUserInfo({...userInfo, ...{ drinkAlcoholOption: option }})
                        nextStep()
                        FirebaseUtils.trackingIntro('drink_alcohol', {
                            status: option
                        });
                    }}
                />

            case 'ANALYZING':
                return <AnalyzingScreen config={config.ANALYZING} onContinue={ () => {
                    console.log(userInfo)
                    nextStep()
                    FirebaseUtils.trackingIntro('analyzing');
                }}/>

            case 'SEND_EMAIL':
                return <EmailScreen config={config.SEND_EMAIL} onContinue={ (email) => {
                    setUserInfo({...userInfo, ...{ email: email }})
                    navigate('/purchase')
                    FirebaseUtils.trackingIntro('email', {
                        user_email: email
                    });
                    FirebaseUtils.trackingPayment('email', {
                        user_email: email
                    });
                }}/>
            default:
                return <></>
        }
    }

    function bmiStatus() {
        if (!userInfo.height || !userInfo.weight) {
            return 'unknown';
        }
        const heightInKg = userInfo.heightUnit == 'ft' ? userInfo.height * 0.3048 : userInfo.height;
        const weightInKg = userInfo.weightUnit == 'lbs' ? userInfo.weight * 0.453592 : userInfo.weight;

        const bmi = weightInKg / (heightInKg * heightInKg);
        if (bmi < 18.5) {
            return 'underweight';
        } else if (bmi < 24.9) {
            return 'normal';
        } else if (bmi < 29.9) {
            return 'overweight';
        } else {
            return 'obese';
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