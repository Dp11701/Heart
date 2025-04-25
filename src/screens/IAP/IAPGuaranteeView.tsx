import icMoneyBack from  '../../assets/icMoneyBack.png'

export function IAPGuaranteeView() {

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 16,
        gap: 16
    }}>
        <span style={{
            whiteSpace: 'pre-line',
            fontSize: 28,
            fontWeight: 'bold'
        }}>{`30 Days Money-Back\nGuarantee`}</span>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            backgroundColor: '#F4F4F4',
            borderRadius: 20,
            margin: '0px 24px'
        }}>
            <span style={{
                color: '#666666',
                textAlign: 'start',
                lineHeight: 1.8
            }}>We believe that our plan may work for you and you'll get visiable result in 4 weeks!</span>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <span style={{
                    color: '#666666',
                    textAlign: 'start',
                    lineHeight: 1.8
                }}>We are even ready to completely refund you within 30 days after purchase if you don't get visiable results and can demonstrate that you have followed our plan.</span>
                <img src={icMoneyBack} alt={''} style={{ width: 60, height: 60 }}/>
            </div>
        </div>

        <span style={{textAlign: 'start', margin: '0px 24px', lineHeight: 1.8, whiteSpace: 'pre-line'}}>
            <span style={{fontWeight: 'bold'}}>Your information is safe</span>
            {`\nWe won’t sell or rent your personal contact information for any marketing purposes whatsoever.\n`}
            <span style={{fontWeight: 'bold'}}>Secure checkout</span>
            {`\nAll information is encrypted and transmitted without risk using a Secure Sockets Layer protocol.\n`}
            <span style={{fontWeight: 'bold'}}>Need help?</span>
            {`\nSend us an email: feedback@begamob.com\n\n`}
            <span style={{
                lineHeight: 1,
                textAlign: 'start',
                fontSize: 12,
                fontStyle: 'italic',
                color: '#979797',
            }}>PLEASE NOTE: After your introductory offer, unless you cancel online before the end of then-current period, your subscription will renew automatically and you will be charged $6.99, the full not discounted price each week before you cancel. Subscriptions renew automatically at the end of each period unless you cancel online. If you are unsure how to cancel, visit our Subscription Terms. Prepayment of total plan cost required. You will need an iOS mobile phone to access the full version of the product. You may want to take a screenshot of this information and save it.</span>
        </span>
    </div>
}