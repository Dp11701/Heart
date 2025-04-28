import ContinueButton from "../components/ContinueButton";
import icIdeal2 from '../assets/icIdeal2.png'
import ColorScale from "../components/ColorScale";
import {UserInfo} from "../models/UserInfo";
import {OverviewInfoSchema, WelcomeSchema} from "../models/WelcomeConfig";

export interface IBMIScreenProps {
    config: OverviewInfoSchema
    userInfo: UserInfo
    onContinue: () => void;
}

export function BMIScreen(props: IBMIScreenProps): JSX.Element {

    function infoComponents(title: string, value:string): JSX.Element {
        return <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <span style={{
                fontWeight: 'bold',
                fontSize: '20px',
                color: '#2BAE20',
            }}>{value}</span>

            <span style={{
                fontWeight: 500,
                fontSize: '14px',
                color: '#9C9EB9',
            }}>{title}</span>
        </div>
    }

    return <div style={{
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        background: '#F4F6FA',
        width: '100%',
        height: '100%',
    }}>
        <span className='title-text'>{props.config.title}</span>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: '16px 24px',
            borderRadius: 20,
            margin: '0px 16px',
            gap: 12,
        }}>
            <span style={{
                fontWeight: 500
            }}>{props.config.tenYears}</span>

            <ColorScale label={props.config.normal} />

            <div style={{
                backgroundColor: '#ACACAC',
                height: 0.5
            }}></div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                { infoComponents(props.config.weight, `${props.userInfo.weight?.toString() || ""} ${props.userInfo.weightUnit?.toString() || "kg"}`)}
                { infoComponents(props.config.height, `${props.userInfo.height?.toString() || ""} ${props.userInfo.heightUnit?.toString() || "cm"}`)}
                { infoComponents(props.config.age, props.userInfo.age?.toString() || "")}
                { infoComponents(props.config.gender, props.userInfo.gender || "")}
            </div>
        </div>

        <div style={{ height: 24 }}></div>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 20,
            margin: '0px 16px',
            gap: 4
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: 8 }}>
                <img src={icIdeal2} alt={''} style={{width: 24, height: 24 }}/>
                <span style={{
                    textAlign: 'start',
                    color: '#2BAE20',
                    fontSize: 16,
                    fontWeight: 'bold',
                    justifyContent: 'center'
                }}>{props.config["80LikeYou"]}</span>
            </div>

            <span style={{
                textAlign: 'start',
                color: '#7D8296',
                fontSize: 14,
                lineHeight: '25px'
            }}>{props.config.description}</span>
        </div>

        <ContinueButton
            additionClassName='button-animate-keyboard'
            text={props.config.continue}
            onClick={ () => { props.onContinue() }}
        />
    </div>
}