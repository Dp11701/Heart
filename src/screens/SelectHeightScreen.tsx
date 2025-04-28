import '../styles/Common.css'
import {SwitcherView} from "../components/SwitcherView";
import {TextInputView} from "../components/TextInputView";
import ContinueButton from "../components/ContinueButton";
import {useEffect, useState} from "react";
import {SelectInputValueSchema, SelectSchema} from "../models/WelcomeConfig";

export interface SelectHeightScreenProps {
    config: SelectInputValueSchema
    onContinue: (value: number, unit: string) => void;
}

export function SelectHeightScreen(props: SelectHeightScreenProps): JSX.Element {

    const [unit, setUnit] = useState(props.config.units[0].unit);
    const [value, setValue] = useState(0);
    const [maxValue, setMaxValue] = useState(props.config.units[0].max);
    const [minValue, setMinValue] = useState(props.config.units[0].min);
    const [idealValue, setIdealValue] = useState(props.config.units[0].ideal);
    const [isValid, setIsValid] = useState(false);
    const [inputValue, setInputValue] = useState("");

    function currentUnit() {
        return props.config.units.find(e => e.unit === unit)
    }

    useEffect(() => {
        switch (unit) {
            case props.config.units[1].unit:
                let newValueInFt = value*0.0328084
                setMaxValue(props.config.units[1].max)
                setMinValue(props.config.units[1].min)
                setIdealValue(props.config.units[1].ideal)
                setInputValue(newValueInFt.toFixed(2))
                checkValid(newValueInFt.toFixed(2), props.config.units[1].min, props.config.units[1].max, true)
                break;
            case props.config.units[0].unit:
                setMaxValue(props.config.units[0].max)
                setMinValue(props.config.units[0].min)
                setIdealValue(props.config.units[0].ideal)
                let newValueInCm = value*30.48
                setInputValue(newValueInCm.toFixed(0))
                checkValid(newValueInCm.toFixed(0), props.config.units[0].min, props.config.units[0].max, true)
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
            units={props.config.units.map(e => e.unit)}
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
                            <>
                                <span>{part}</span>
                                {idx < 2 && (
                                    <span style={{fontWeight: 'bold'}}>{[currentUnit()?.min, currentUnit()?.max][idx] + unit} </span>
                                )}
                            </>
                        )
                    })
            }
        </div>

        <div style={{height: 24}}></div>

        <ContinueButton
            disabled={!isValid}
            text={props.config.continue}
            // additionClassName='button-animate-keyboard'
            onClick={() => {
                props.onContinue(value, unit)
            }}
        />
    </div>
}