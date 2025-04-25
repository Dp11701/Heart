
import '../styles/Common.css'
import icMale from '../assets/icMale.png'
import icFemale from '../assets/icFemale.png'
import icUncheck from '../assets/icUncheck.png'
import icChecked from '../assets/icChecked.png'
import {useState} from "react";
import {EnumGender} from "../models/EnumGender";

import '../styles/SelectGenderScreen.css'
import IdealView from "../components/IdealView";

function SelectGenderScreen(props: { onSelectGender: (gender: EnumGender) => void }) {

    const [selectedGender, setSelectedGender] = useState(EnumGender.parse('NOT_TO_SAY'))

    function selectGender(gender: EnumGender) {
        setSelectedGender(gender);
        setTimeout(() => {
            props.onSelectGender(gender)
        }, 500)
    }

    function view(gender: EnumGender) {
        const isSelected = selectedGender === gender
        return <div
            className='gender-card-container'
            onClick={ () => {
                selectGender(gender)
            }}
        >
            <img
                src={ gender === 'MALE' ? icMale : icFemale}
                alt={''}
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
            <span
                style={{
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}
            > {gender === 'MALE' ? "Male" : "Female"}
            </span>

            <img src={isSelected ? icChecked : icUncheck} alt={''} style={{
                width: 24,
                height: 'auto',
            }}/>
        </div>
    }

    return <div style={{
        display: "flex",
        flexDirection: "column",
        background: '#F4F6FA',
        width: '100%',
        height: '100%',
    }}>
        <span className='title-text'> What is Your Gender? </span>

        <IdealView text='Gender affects your cardiovascular health. It help us tailor your results to you.'/>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: '8px 24px'
        }}>
            { view('MALE')}
            { view('FEMALE')}
        </div>

        <div>
            <button
               className='gender-prefer-not-to-say'
               onClick={() => selectGender('NOT_TO_SAY')}
            >
                Prefer not to say
            </button>
        </div>
    </div>

}


export default SelectGenderScreen;