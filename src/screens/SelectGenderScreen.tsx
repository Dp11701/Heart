
import '../styles/Common.css'
import icMale from '../assets/icMale.png'
import icFemale from '../assets/icFemale.png'
import icUncheck from '../assets/icUncheck.png'
import icChecked from '../assets/icChecked.png'
import {useState} from "react";
import {EnumGender} from "../models/EnumGender";

import '../styles/SelectGenderScreen.css'
import '../styles/SelectRadioView.css'
import IdealView from "../components/IdealView";
import {SelectGenderSchema, SelectSchema} from "../models/WelcomeConfig";

function SelectGenderScreen(props: { config: SelectGenderSchema, onSelectGender: (gender: string) => void }) {

    const [selectedGender, setSelectedGender] = useState<string | null>(null)

    function selectGender(gender: string) {
        if (selectedGender !== null) return;
        setSelectedGender(gender);

        setTimeout(() => {
            props.onSelectGender(gender)
        }, 600)
    }

    function view(gender: string) {
        const isSelected = selectedGender === gender
        return <div
            className={`gender-card-container ${isSelected ? 'bounce' : ''}`}
            onClick={ () => {
                selectGender(gender)
            }}
        >
            <img
                src={ gender === props.config.male ? icMale : icFemale}
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
            > {gender === props.config.male ? props.config.male : props.config.female}
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
        <span className='title-text'>{props.config.title}</span>

        <IdealView text={props.config.description}/>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: '8px 24px'
        }}>
            { view(props.config.male) }
            { view(props.config.female)}
        </div>

        <div>
            <button
               className='gender-prefer-not-to-say'
               onClick={() => selectGender(props.config.preferNotToSay)}
            >
                {props.config.preferNotToSay}
            </button>
        </div>
    </div>

}


export default SelectGenderScreen;