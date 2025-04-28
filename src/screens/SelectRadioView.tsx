import {HTMLAttributes, useEffect, useState} from "react";

import '../styles/SelectRadioView.css'
import '../styles/Common.css'
import {RadioOptions} from "../models/Constants";
import {SelectSchema} from "../models/WelcomeConfig";

interface SelectRadioItemProps extends HTMLAttributes<HTMLElement>{
    idx: number;
    showIndex: number;
    option: string
    isSelected: boolean
    onTap: () => void
}

function SelectRadioItem(props: SelectRadioItemProps) {
    const [scale, setScale] = useState(false)

    function className(): string{
        if (props.isSelected) {
            return `option-button-active item-list ${props.idx < props.showIndex ? 'show' : ''} ${scale ? 'bounce' : ''}`
        }
        return `option-button item-list ${props.idx < props.showIndex ? 'show' : ''}`
    }
    
    return <div
        key={props.idx}
        className= {className()}
        onClick={ () => {
            setScale(true)
            props.onTap()
        }}>
        <span>{props.option}</span>
    </div>;
}

export interface SelectRadioProps extends HTMLAttributes<HTMLDivElement> {
    options: SelectSchema
    onPickOption?: (value: string) => void
}

export function SelectRadioView(props: SelectRadioProps) {

    const { options, onPickOption, ...rest } = props;

    const [selectedOption, setSelectedOptions] = useState<string | null>(null);

    const [showIndex, setShowIndex] = useState<number>(0);

    useEffect(() => {
        if (selectedOption !== null) {
            setTimeout(() => {
                props.onPickOption?.(selectedOption || "")
            }, 600)
        }
    }, [selectedOption, props])

    useEffect(() => {
        for (let i = 0; i <= props.options.options.length; i++) {
            setTimeout(() => {
                setShowIndex(i)
            }, 100*i)
        }
    }, [props.options.options.length])

    return <div style={{
        display: "flex",
        flexDirection: "column",
        background: '#F4F6FA',
        width: '100%',
        height: '100%',
        gap: 16
    }} { ...rest} >

        <span className='title-text'> {props.options.title} </span>

        {
            props.options.options.map((option, idx) => {
                return <SelectRadioItem idx={idx} isSelected={selectedOption === option} option={option} showIndex={showIndex} key={idx} onTap={() => {
                    if (selectedOption === null) {
                        setSelectedOptions(option);
                    }
                }} />
            })
        }
    </div>

}