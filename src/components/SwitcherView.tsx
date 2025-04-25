import '../styles/Switcher.css';

export interface SwitcherViewProps {
    units: string[]
    currentUnit: string
    onSelectUnit: (unit: string) => void;
}

export function SwitcherView(props: SwitcherViewProps): JSX.Element {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="switcher">
                {
                    props.units.map(e => <div
                        key={e}
                            className={props.currentUnit === e ? 'active' : ''}
                            onClick={() => props.onSelectUnit(e)}
                        >
                            <span>{e}</span>
                        </div>
                    )
                }
            </div>
        </div>

    );

}