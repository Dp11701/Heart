import React, {JSX, useState} from "react";
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
import {useNavigate} from "react-router-dom";

function IntroScreen() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>(UserInfo.parse({}));
    const [step, setStep] = useState(IntroStep.parse('WELCOME'));
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
                return <WelcomeScreen onContinue={ () => { nextStep() } } />
            case 'SELECT_GENDER':
                return <SelectGenderScreen onSelectGender={ (gender) => {
                    setUserInfo({...userInfo, ...{ gender: gender }})
                    nextStep()
                } }
                />
            case 'SELECT_AGE':
                return <SelectAgeScreen onContinue={ (age) => {
                    setUserInfo({...userInfo, ...{ age: age }})
                    nextStep()
                }}
                />
            case 'SELECT_HEIGHT':
                return <SelectHeightScreen onContinue={ (value, unit) => {
                    setUserInfo({ ...userInfo, ...{ height: value, heightUnit: unit} })
                    nextStep()
                }}
                />
            case 'SELECT_WEIGHT':
                return <SelectWeightScreen onContinue={ (value, unit) => {
                    setUserInfo({ ...userInfo, ...{ weight: value, weightUnit: unit} })
                    nextStep() }}
                />
            case 'OVERVIEW_INFO':
                return <BMIScreen userInfo={userInfo} onContinue={ () => { nextStep() }}/>

            case 'SELECT_CHOLESTEROL':
                return <SelectRadioView
                    key={step}
                    options={Constants.CHOLESTEROL_OPTIONS}
                    onPickOption= { (option) => {
                        userInfo.cholesterolOption = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'SELECT_BLOOD_PRESSURE':
                return <SelectRadioView
                    key={step}
                    options={Constants.BLOOD_PRESSURE_READING_OPTIONS}
                    onPickOption={ (option) => {
                        userInfo.bloodPressureReading = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'SELECT_HYPERTENSION':
                return <SelectRadioView
                    key={step}
                    options={Constants.HYPERTENSION_OPTIONS}
                    onPickOption={ (option) => {
                        userInfo.hypertensionOption = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'SELECT_HIGH_BLOOD_PRESSURE':
                return <SelectRadioView
                    key={step}
                    options={Constants.HIGH_BLOOD_PRESSURE_OPTIONS}
                    onPickOption={ (option) => {
                        userInfo.highBloodPressureOption = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'SELECT_ACTIVITY_LEVEL':
                return <SelectRadioView
                    key={step}
                    options={Constants.ACTIVITY_LEVEL_OPTIONS}
                    onPickOption={ (option) => {
                        userInfo.activityLevelOption = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'SELECT_SLEEP':
                return <SelectRadioView
                    key={step}
                    options={Constants.SLEEP_DAILY_OPTIONS}
                    onPickOption={ (option) => {
                        userInfo.sleepDailyOption = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'SELECT_SMOKING_HISTORY':
                return <SelectRadioView
                    key={step}
                    options={Constants.SMOKE_HISTORY_OPTIONS}
                    onPickOption={ (option) => {
                        userInfo.smokeHistory = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'SELECT_ALCOHOL':
                return <SelectRadioView
                    key={step}
                    options={Constants.DRINK_ALCOHOL_OPTIONS}
                    onPickOption={ (option) => {
                        userInfo.drinkAlcoholOption = option
                        setUserInfo(userInfo)
                        nextStep()
                    }}
                />

            case 'ANALYZING':
                return <AnalyzingScreen onContinue={ () => {
                    console.log(userInfo)
                    nextStep()
                }}/>

            case 'SEND_EMAIL':
                return <EmailScreen onContinue={ (email) => {
                    userInfo.email = email
                    setUserInfo(userInfo)
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