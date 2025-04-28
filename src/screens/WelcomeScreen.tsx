import iconTrusted from '../assets/icWelcomeTrusted.png'
import iconTick from '../assets/icTick.svg'
import '../styles/WelcomeView.css'
import ContinueButton from "../components/ContinueButton";
import {WelcomeSchema} from "../models/WelcomeConfig";

function WelcomeScreen(props: { config: WelcomeSchema, onContinue: () => void }) {
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
                            <span style={{fontWeight: 500}}>{props.config.trustedBy}</span>
                            <div style={{height: 4}}/>
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: '24px',
                            }}>
                            {props.config["1M+"]}
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
                    <span className='welcome-title'>{props.config.welcomeTo}</span>
                    <span className='welcome-title-highlight'>{props.config.appName}</span>
                </div>

                <div style={{height: '24px'}}></div>

                <div className='welcome-benefits'>
                    {
                        props.config.features.map((e, idx) => {
                            return <div key={idx} className='welcome-benefits-item'>
                                    <img src={iconTick} alt='tick'/>
                                    <span>{e}</span>
                                </div>
                        })
                    }
                </div>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}>
                <ContinueButton text={props.config.continueTitle} onClick={ () => {  props.onContinue() } }/>

                <span style={{
                    fontSize: '10px',
                    padding: '5px',
                    width: '100%',
                    zIndex: 1
                }}>{props.config.advice}</span>

                <div
                    style={{
                        width: 'calc(100% - 32px)',
                        margin: '0 auto',
                        justifyContent: 'space-between',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <a className='welcome-link' href={props.config.privacyPolicyLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{props.config.privacyPolicy}</a>
                    <a className='welcome-link' href={props.config.termOfUseLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{props.config.termOfUse}</a>
                    <a className='welcome-link' href={props.config.subscriptionTermsLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{props.config.subscriptionTerms}</a>
                </div>

                <div style={{height: '16px'}}></div>

            </div>
        </div>
    </div>
}

export default WelcomeScreen;