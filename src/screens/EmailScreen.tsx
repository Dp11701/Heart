import icMail from '../assets/icMail.png'

import '../styles/AnalyzingScreen.css'
import '../styles/Common.css'
import ContinueButton from "../components/ContinueButton";
import {useEffect, useRef, useState} from "react";
import {SendEmailSchema} from "../models/WelcomeConfig";

export interface EmailScreenProps {
    config: SendEmailSchema
    onContinue: (email: string) => void
}

export function EmailScreen(props: EmailScreenProps) {

    const [email, setEmail] = useState<string>("")
    const [canSubmit, setCanSubmit] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log(inputRef)
            inputRef.current?.focus();
        }, 150)

        return () => { clearTimeout(timeout) }
    }, []);


    function validateEmail(raw: string) {
        const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setCanSubmit(strictEmailRegex.test(raw))
    }

    const handleSubmit = () => {
        props.onContinue(email)
    };

    const link = (
        <a
            style={{
                fontWeight: 'bold',
                color: '#979797',
                fontSize: 12,
            }}
            href='https://begamob.com/cast-policy.html'
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.config.privacyPolicy}
        </a>
    );

    const parts = props.config.description.split('%@');


    return <div style={{
        display: "flex",
        flexDirection: "column",
        background: '#F4F6FA',
        width: '100%',
        height: '100%',
        gap: 24
    }}>
        <div style={{height: 26}}></div>
        <span className='title-text'>{props.config.title}</span>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
            backgroundColor: '#F8F8F8',
            padding: 16,
            margin: '0px 24px',
            borderRadius: 5,
            alignItems: 'center'

        }}>
            <img src={icMail} alt={''} style={{width: 24, height: 24}}/>
            <input
                autoFocus={true}
                style={{
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: '100%',
                    fontSize: 16
                }}
                type={'email'}
                placeholder="name@gmail.com"
                onChange={(e) => {
                    setEmail(e.target.value)
                    validateEmail(e.target.value)
                }}
            >
            </input>
        </div>
        <span style={{
            fontSize: 12,
            textAlign: 'left',
            lineHeight: 1.5,
            fontStyle: 'italic',
            color: '#979797',
            margin: '0 24px'
        }}>
            {parts[0]}
            {link}
            {parts[1]}
        </span>

        <ContinueButton disabled={!canSubmit} text={props.config.submit} onClick={() => handleSubmit()}/>
    </div>
}