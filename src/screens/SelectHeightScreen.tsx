import '../styles/Common.css'
import {SwitcherView} from "../components/SwitcherView";
import {TextInputView} from "../components/TextInputView";
import ContinueButton from "../components/ContinueButton";
import {useEffect, useState} from "react";

export interface SelectHeightScreenProps {
    onContinue: (value: number, unit: string) => void;
}

export function SelectHeightScreen(props: SelectHeightScreenProps): JSX.Element {

    const [unit, setUnit] = useState('cm');
    const [value, setValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [idealValue, setIdealValue] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        switch (unit) {
            case 'ft':
                let newValueInFt = value*0.0328084
                setMaxValue(9)
                setMinValue(4)
                setIdealValue(5.8)
                setInputValue(newValueInFt.toFixed(2))
                checkValid(newValueInFt.toFixed(2), 4, 12, true)
                break;
            case 'cm':
                setMaxValue(260)
                setMinValue(120)
                setIdealValue(177)
                let newValueInCm = value*30.48
                setInputValue(newValueInCm.toFixed(0))
                checkValid(newValueInCm.toFixed(0), 90, 242, true)
                break
        }
    }, [unit, value])

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
        <span className='title-text'>How tall are you?</span>

        <SwitcherView
            currentUnit={unit}
            units={['cm', 'ft']}
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
            <span>Please enter a value from</span>
            <span style={{fontWeight: 'bold'}}>{minValue}{unit}</span>
            <span>to</span>
            <span style={{fontWeight: 'bold'}}>{maxValue}{unit}</span>
        </div>

        <div style={{height: 24}}></div>

        <ContinueButton
            disabled={!isValid}
            text='Continue'
            // additionClassName='button-animate-keyboard'
            onClick={() => {
                props.onContinue(value, unit)
            }}
        />
    </div>
}