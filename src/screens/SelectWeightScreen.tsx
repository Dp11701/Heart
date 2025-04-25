import '../styles/Common.css'
import {SwitcherView} from "../components/SwitcherView";
import {TextInputView} from "../components/TextInputView";
import ContinueButton from "../components/ContinueButton";
import {useEffect, useState} from "react";

export interface SelectWeightScreenProps {
    onContinue: (value: number, unit: string) => void;
}

export function SelectWeightScreen(props: SelectWeightScreenProps): JSX.Element {

    const [unit, setUnit] = useState('kg');
    const [value, setValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [idealValue, setIdealValue] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        switch (unit) {
            case 'kg':
                let newValueInKg = value*2.20462;
                setMaxValue(300);
                setMinValue(10);
                setIdealValue(72);
                setInputValue(newValueInKg.toFixed(0));
                checkValid(newValueInKg.toFixed(0), 10, 300, true);
                break;
            case 'lbs':
                setMaxValue(700);
                setMinValue(20);
                setIdealValue(160);
                let newValueInLbs = value * 0.453592;
                setInputValue(newValueInLbs.toFixed(0));
                checkValid(newValueInLbs.toFixed(0), 20, 700, true);
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
        <span className='title-text'>What is your current weight?</span>

        <SwitcherView
            currentUnit={unit}
            units={['kg', 'lbs']}
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