import { JSX, useEffect, useState} from "react";
import Picker from 'react-mobile-picker'
import IdealView from "../components/IdealView";
import '../styles/SelectAgeScreen.css'
import ContinueButton from "../components/ContinueButton";
import {SwitcherView} from "../components/SwitcherView";
import {TextInputView} from "../components/TextInputView";

import '../styles/SelectAgeScreen.css'
import {SelectInputValueSchema, SelectSchema} from "../models/WelcomeConfig";

export interface SelectAgeScreenProps {
    config: SelectInputValueSchema,
    onContinue: (age: number) => void
}

function SelectAgeScreen(props: SelectAgeScreenProps): JSX.Element {

    const [value, setValue] = useState(0);
    const [maxValue, setMaxValue] = useState(props.config.units[0]?.max || 95);
    const [minValue, setMinValue] = useState(props.config.units[0]?.min || 20);
    const [idealValue, setIdealValue] = useState(props.config.units[0]?.ideal || 30);
    const [isValid, setIsValid] = useState(false);
    const [inputValue, setInputValue] = useState("");


    function checkValid(stringNumber: string, minValue: number, maxValue: number, reloadInputText: boolean = false) {
        const number = parseInt(stringNumber);
        if (isFinite(number) && number >= minValue && number <= maxValue) {
            setValue(number)
            setIsValid(true)
        } else {
            setValue(0)
            setIsValid(false)
            if (reloadInputText) {
                setInputValue("")
            }
        }
    }

    return <div style={{
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        background: '#F4F6FA',
        width: '100%',
        height: '100%',
    }}>
        <span className='title-text'>{props.config.title}</span>
        <IdealView text={props.config.description || ""}/>

        <div style={{height: 26}}></div>

        <TextInputView
            unit={''}
            min={minValue}
            ideal={idealValue}
            max={maxValue}
            currentValue={inputValue}
            textInputStyles={{ textAlign: 'center' }}
            maxLength={2}
            onChangeValue={(newValue: string) => {
                setInputValue(newValue)
                checkValid(newValue, minValue, maxValue)
            }}
        />

        <div style={{height: 26}}></div>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 3,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {
                props.config.note.split('%@')
                    .map((part, idx) => {
                        return (
                            <>
                                <span>{part}</span>
                                {idx < 2 && (
                                    <span style={{fontWeight: 'bold'}}>{[props.config.units[0].min, props.config.units[0].max][idx]}</span>
                                )}
                            </>
                        )
                    })
            }
        </div>

        <div style={{height: 24}}></div>

        <ContinueButton
            disabled={!isValid}
            text={props.config.continue || ""}
            onClick={() => {
                props.onContinue(value)
            }}
        />
    </div>
}


export default SelectAgeScreen;