import '../styles/TextInputView.css'
import '../styles/SelectAgeScreen.css'
import {CSSProperties, useEffect, useRef} from "react";

export interface TextInputViewProps {
    max: number
    min: number
    ideal: number
    unit: string
    currentValue: string
    onChangeValue: (value: string) => void
    textInputStyles?: CSSProperties
    maxLength?: number
}

export function TextInputView(props: TextInputViewProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        setTimeout(() => {
            inputRef.current?.focus();
        })
    }, [inputRef]);

    return <div style={{
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        margin: '0 auto'
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div className='text-input-container'>
                <input
                    // ref={inputRef}
                    autoFocus={true}
                    value={props.currentValue}
                    className={`text-input`}
                    style={props.textInputStyles ?? {}}
                    placeholder={props.ideal.toString()}
                    maxLength={props.maxLength ?? 5}
                    onChange={ (e) => {
                        props.onChangeValue(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            (e.target as any).blur?.(); // Bắt buộc mất focus → kích hoạt onBlur
                        }
                    }}
                />
                <span style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>{props.unit}</span>
            </div>

            <div style={{
                height: 1.5,
                backgroundColor: '#3A79D8',
            }}></div>
        </div>
    </div>
}