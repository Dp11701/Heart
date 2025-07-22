import '../styles/Common.css'
import {SwitcherView} from "../components/SwitcherView";
import {TextInputView} from "../components/TextInputView";
import ContinueButton from "../components/ContinueButton";
import {useEffect, useState} from "react";
import {SelectInputValueSchema} from "../models/WelcomeConfig";
import {ValueConfigItem} from "../models/ValueConfig";


export interface SelectHeightScreenProps {
    config: SelectInputValueSchema,
    heightConfig: ValueConfigItem[],
    onContinue: (value: number, unit: string) => void;
}

export function SelectHeightScreen(props: SelectHeightScreenProps): JSX.Element {

    const [unit, setUnit] = useState(props.heightConfig[0].unit);
    const [value, setValue] = useState(0);
    const [maxValue, setMaxValue] = useState(props.heightConfig[0].max);
    const [minValue, setMinValue] = useState(props.heightConfig[0].min);
    const [idealValue, setIdealValue] = useState(props.heightConfig[0].ideal);
    const [isValid, setIsValid] = useState(false);
    const [inputValue, setInputValue] = useState("");

    function currentUnit() {
        return props.heightConfig.find(e => e.unit === unit)
    }

    useEffect(() => {
        switch (unit) {
            case props.heightConfig[1].unit:
                let newValueInFt = value*0.0328084
                setMaxValue(props.heightConfig[1].max)
                setMinValue(props.heightConfig[1].min)
                setIdealValue(props.heightConfig[1].ideal)
                setInputValue(newValueInFt.toFixed(2))
                checkValid(newValueInFt.toFixed(2), props.heightConfig[1].min, props.heightConfig[1].max, true)
                break;
            case props.heightConfig[0].unit:
                setMaxValue(props.heightConfig[0].max)
                setMinValue(props.heightConfig[0].min)
                setIdealValue(props.heightConfig[0].ideal)
                let newValueInCm = value*30.48
                setInputValue(newValueInCm.toFixed(0))
                checkValid(newValueInCm.toFixed(0), props.heightConfig[0].min, props.heightConfig[0].max, true)
                break
        }
    }, [unit])

    function checkValid(stringNumber: string, minValue: number, maxValue: number, reloadInputText: boolean = false) {
        const number = Number(stringNumber);
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

        <SwitcherView
            currentUnit={unit}
            units={props.heightConfig.map(e => e.unit)}
            onSelectUnit={(newUnit) => {
                setUnit(newUnit);
            }
            }
        />

        <div style={{height: 26}}></div>

        <TextInputView
            unit={unit}
            min={minValue}
            ideal={idealValue}
            max={maxValue}
            currentValue={inputValue}
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
                            <span key={idx}>
                                <span>{part}</span>
                                {idx < 2 && (
                                    <span
                                        style={{fontWeight: 'bold'}}>{[currentUnit()?.min, currentUnit()?.max][idx] + unit} </span>
                                )}
                            </span>
                        )
                    })
            }
        </div>

        <div style={{height: 24}}></div>

        <ContinueButton
            disabled={!isValid}
            text={props.config.continue}
            onClick={() => {
                props.onContinue(value, unit)
            }}
        />
    </div>
}