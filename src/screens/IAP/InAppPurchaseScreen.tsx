import {IAPSpecificOfferView} from "./IAPSpecificOfferView";
import {IAPThumbView} from "./IAPThumbView";
import {IAPPricesView} from "./IAPPricesView";

import '../../styles/App.css'
import {IAPMillionsUsersLoveUsView} from "./IAPMillionsUsersLoveUsView";
import {IAPGuaranteeView} from "./IAPGuaranteeView";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import defaultConfig from '../../configs/iap.json'
import {IAPConfig} from "../../models/IAPConfig";

export function InAppPurchaseScreen() {
    const [config, setConfig] = useState(IAPConfig.parse(defaultConfig));

    async function switchConfigs() {
        const locale = localStorage.getItem("languageCode")
        console.log(locale)
        if (locale) {
            try {
                const response = await fetch(`/configs/${locale}/iap.json`)
                const json = await response.json();
                const parsed = IAPConfig.parse(json);
                setConfig(parsed);
            } catch {
                localStorage.removeItem("languageCode");
                setConfig(defaultConfig);
            }
        } else {
            localStorage.removeItem("languageCode");
            setConfig(defaultConfig);
        }
    }

    useEffect(() => {
        Modal.setAppElement('#purchase-content')
        switchConfigs().then()
    }, [])

    return <div className='App-No-OverFlow'>
            <div
                id={'purchase-content'}
                style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 600,
                margin: '0 auto',
                backgroundColor: 'white'
            }}>
                <IAPSpecificOfferView config={config}/>
                <IAPThumbView config={config}/>
                <IAPPricesView config={config}/>
                <IAPMillionsUsersLoveUsView config={config}/>
                <IAPGuaranteeView config={config} />
            </div>
    </div>
}