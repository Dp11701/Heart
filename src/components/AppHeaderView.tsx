import React from 'react';
import logo from '../assets/icAppIcon.png'
import icBack from '../assets/icBack.png'
import '../styles/AppHeaderView.css'

export interface AppHeaderViewProps {
    showBackButton?: boolean
    indexIndicator: number
    onTapBack: () => void
}

function AppHeaderView(props: AppHeaderViewProps) {
    const INDICATORS = Array(13).fill(0).map((_, i) => i)

    return (
        <div className='app-header-nav'>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: '#ea3d6f',
                gap: 0
            }}>
                <img
                    src={icBack}
                    alt={''}
                    style={{width: 24, opacity: props.showBackButton === true ? 1 : 0, marginLeft: 16}}
                    onClick={() => {
                        if (props.showBackButton === true) {
                            props.onTapBack()
                        }
                    }}
                />
                <div style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    padding: "5px 10px",
                    height: 56
                }}>
                    <img src={logo} alt="logo" style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '5px'
                    }}/>

                    <span className={'header-title'}>iCardiac</span>
                </div>

                <div style={{width: 24, marginRight: 16 }}/>
            </div>
            { props.indexIndicator >= 0 && props.indexIndicator < INDICATORS.length ?
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'calc(100% - 32px)',
                    height: 6,
                    justifyContent: 'space-between',
                    margin: '16px 0'
                }}>
                    {
                        INDICATORS.map(e => {
                            return <div key={e} style={{
                                height: '100%',
                                width: `calc((100% - ${5*(INDICATORS.length-1)}px)/${INDICATORS.length})`,
                                borderRadius: 3,
                                backgroundColor: e <= props.indexIndicator ? '#FF3D60' : '#FF3D601A'
                            }}/>
                        })
                    }
                </div>
                : null
            }

        </div>
    );
}

export default AppHeaderView;
