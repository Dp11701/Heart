import '../styles/Common.css'
import icIdeal from "../assets/icIdeal.png";
function IdealView(props: { text: string}) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '20px',
        margin: '8px 24px',
    }}>
        <img src={icIdeal} alt={''}/>
        <span className='normal-text-align-start'>
                {props.text}
            </span>
    </div>
}

export default IdealView;