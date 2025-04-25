import {IAPSpecificOfferView} from "./IAPSpecificOfferView";
import {IAPThumbView} from "./IAPThumbView";
import {IAPPricesView} from "./IAPPricesView";

import '../../styles/App.css'
import {IAPMillionsUsersLoveUsView} from "./IAPMillionsUsersLoveUsView";
import {IAPGuaranteeView} from "./IAPGuaranteeView";

export function InAppPurchaseScreen() {
    return <div className='App-No-OverFlow'>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 600,
                margin: '0 auto',
                backgroundColor: 'white'
            }}>
                <IAPSpecificOfferView/>
                <IAPThumbView/>
                <IAPPricesView/>
                <IAPMillionsUsersLoveUsView/>
                <IAPGuaranteeView/>
            </div>
    </div>
}