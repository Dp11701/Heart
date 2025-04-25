import React from 'react';
import icTriangle from '../assets/icTriangle.png'
import '../styles/ColorScale.css'

const ColorScale = ({ index = 12, label = "Normal" }) => {

    const colors = [
        ...Array(6).fill('#629CF3'),
        ...Array(12).fill('#2BAE20'),
        ...Array(10).fill('#FBD830'),
        ...Array(8).fill('#F8931D'),
        ...Array(10).fill('#F62617'),
    ];

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div className="color-scale-container">
                <div className="color-scale-label-container" style={{
                    transform: 'translateX(-30%)'
                }}>
                    <div className="label">
                        {label}
                    </div>
                    <img src={icTriangle} alt='' style={{
                        width: 12,
                        bottom: 0
                    }}/>
                </div>
                <div className="color-scale">
                    {colors.map((color, i) => (
                        <div
                            key={i}
                            className="color-block"
                            style={{
                                backgroundColor: color,
                                border: 2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorScale;