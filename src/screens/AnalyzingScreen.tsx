import icAnalyzing1 from '../assets/icAnalyzing1.png'
import icAnalyzing2 from '../assets/icAnalyzing2.png'
import icAnalyzing3 from '../assets/icAnalyzing3.png'

import '../styles/AnalyzingScreen.css'
import '../styles/Common.css'
import {useEffect, useState} from "react";

export interface AnalyzingScreenProps {
    onContinue: () => void
}

export function AnalyzingScreen(props: AnalyzingScreenProps) {

    const ITEMS = [
        {
            title: 'Building your customized health plan using your answers',
            color: '#3A79D8',
            icon: icAnalyzing1
        },
        {
            title: 'Creating advice for mental wellness.',
            color: '#FF8972',
            icon: icAnalyzing2
        },
        {
            title: 'Adjusting our measurement algorithms to fit your data.',
            color: '#A985E5',
            icon: icAnalyzing3
        }
    ]

    const [processes, setProcesses] = useState(Array(3).fill(0))

    useEffect(() => {
        let t1 = setTimeout(() => {
            setRandom(0.4, 0.7)
        }, 500)

        let t2 = setTimeout(() => {
            setRandom(1, 1)
        }, 4000)

        let t3 = setTimeout(() => {
            props.onContinue()
        }, 7500)

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        }
    }, [props]);

    function setRandom(fromPercent: number, maxPercent: number) {
        setProcesses(processes.map(_ => Math.random() * (maxPercent - fromPercent) + fromPercent))
    }

    function itemView(item: { title: string, color: string, icon: string }, idx: number) {
        return <div
            key={idx}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                borderRadius: 16,
                margin: '0px 24px',
                height: 100
            }}
        >
            <div style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 12,
                top: 0, left: 12, right: 114 + 12, bottom: 0
            }}>
                <span style={{
                    textAlign: 'left',
                    color: '#59617A'
                }}>{item.title}</span>

                <div style={{
                    width: '100%',
                    height: 20
                }}>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 20,
                    borderRadius: 10,
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        backgroundColor: item.color,
                        height: 20,
                        borderRadius: 10,
                        width: '100%',
                        opacity: 0.2,
                        top: 0, bottom: 0, left: 0, right: 0,
                    }}/>


                    <div style={{
                        position: 'absolute',
                        backgroundColor: item.color,
                        height: 20,
                        borderRadius: 10,
                        width: `${100 * (processes[idx])}%`,
                        top: 0, bottom: 0, left: 0,
                        transition: 'width 3s ease-in'
                    }}/>
                </div>
                </div>

            </div>

            <img src={item.icon} alt={''} style={{
                position: 'absolute',
                width: 114,
                bottom: 0,
                right: 0,
            }}/>
        </div>
    }

    return <div style={{
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        background: '#F4F6FA',
        width: '100%',
        height: '100%',
        gap: 12
    }}>
        <div style={{height: 26}}></div>
        <span className='title-text'>Analyzing your health status</span>
        {
            ITEMS.map((item, idx) => {
                return itemView(item, idx)
            })
        }
    </div>
}