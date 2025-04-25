import { JSX, useEffect, useState} from "react";
import Picker from 'react-mobile-picker'
import IdealView from "../components/IdealView";
import '../styles/SelectAgeScreen.css'
import ContinueButton from "../components/ContinueButton";


export interface SelectAgeScreenProps {
    onContinue: (age: number) => void
}

function SelectAgeScreen(props: SelectAgeScreenProps): JSX.Element {

    const [selectedAge, setSelectedAge] = useState(30)
    const ALL_AGES = Array.from({ length: 90 }, (_, i) => i + 5);
    const [showPicker, setShowPicker] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShowPicker(true)
        }, 200)
    }, []);


    return <div
        style={{
            position: 'relative',
            display: "flex",
            flexDirection: "column",
            background: '#F4F6FA',
            width: '100%',
            height: '100%',
        }}
    >

        <span className='title-text'>What is Your Age?</span>
        <IdealView text='This will help us properly determine your health condition'/>

        <Picker
            value={{key: selectedAge}}
            onChange={value => {
                setSelectedAge(value.key)
            }}
            className='select-age-picker'
            itemHeight={50}
            height={300}
            style={{
                opacity: showPicker ? 1 : 0
            }}
        >
            <Picker.Column name={'key'} key={'key'}>
                {
                    ALL_AGES.map(age => {
                        return <Picker.Item
                            className={selectedAge === age ? 'select-age-picker-item-selected' : 'select-age-picker-item'}
                            value={age}
                            key={age}
                        >
                            {age}
                        </Picker.Item>
                    })
                }
            </Picker.Column>
        </Picker>

        <ContinueButton
            style={{
                position: 'absolute',
                bottom: 48,
                left: 24,
                right: 24,
            }}
            text="Continue"
            onClick={ () => {
                props.onContinue(selectedAge)
            } }
        />

    </div>
}


export default SelectAgeScreen;