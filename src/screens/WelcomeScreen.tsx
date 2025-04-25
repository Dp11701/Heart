import iconTrusted from '../assets/icWelcomeTrusted.png'
import iconTick from '../assets/icTick.svg'
import '../styles/WelcomeView.css'
import ContinueButton from "../components/ContinueButton";

function WelcomeScreen(props: { onContinue: () => void }) {
    return <div className='welcome-container'>

        <div className='welcome-thumbnail-container'/>
        <div className='welcome-overlay'/>

        <div className='welcome-content'>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            display: 'flex',
                            flexDirection: 'column',
                            top: '10px',
                            left: 0,
                            right: 0,
                        }}>
                            <span style={{fontWeight: 500}}>Trusted by</span>
                            <div style={{height: 4}}/>
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: '24px',
                            }}>
                            1M+ Users
                        </span>
                        </div>

                        <img src={iconTrusted}
                            alt=''
                             style={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        }}/>
                    </div>
                </div>

                <div style={{height: '12px'}}></div>

                <div className='welcome-title-container'>
                    <span className='welcome-title'>Welcome to </span>
                    <span className='welcome-title-highlight'> iCardiac</span>
                </div>

                <div style={{height: '24px'}}></div>

                <div className='welcome-benefits'>
                    <div className='welcome-benefits-item'>
                        <img src={iconTick} alt='tick'/>
                        <span>Control your Heart health</span>
                    </div>
                    <div className='welcome-benefits-item'>
                        <img src={iconTick} alt='tick'/>
                        <span>Access Blood Pressure Report</span>
                    </div>
                    <div className='welcome-benefits-item'>
                        <img src={iconTick} alt='tick'/>
                        <span>Improve your stress level</span>
                    </div>
                </div>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                <ContinueButton text="Continue" onClick={ () => {  props.onContinue() } }/>

                <span style={{
                    fontSize: '10px',
                    padding: '5px',
                    width: '100%',
                    zIndex: 1
                }}>This does not constitute a diagnosis of medical advice</span>

                <div
                    style={{
                        width: 'calc(100% - 32px)',
                        margin: '0 auto',
                        justifyContent: 'space-between',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <a className='welcome-link' href='https://google.com' target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a className='welcome-link' href='https://google.com' target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a className='welcome-link' href='https://google.com 'target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </div>

                <div style={{height: '10px'}}></div>

            </div>
        </div>
    </div>
}

export default WelcomeScreen;