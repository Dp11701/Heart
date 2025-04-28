import { z } from 'zod';

export const IAPConfig = z.object({
    yourSpecialOffer: z.string(),
    thumbTitle: z.string(),
    checkWithBody: z.string(),
    enableFreeTrial: z.string(),
    title1: z.string(),
    subtitle1: z.string(),
    title2: z.string(),
    price1: z.string(),
    price2: z.string(),
    subtitle2: z.string(),
    purchaseButton: z.string(),
    millionsOfUsers: z.string(),
    millionsOfUseHighlight: z.string(),
    "30Days": z.string(),
    weBelieve: z.string(),
    weBelieve2: z.string(),
    yourInfoSafe: z.string(),
    yourInfoSafe2: z.string(),
    secureCheckout: z.string(),
    secureCheckout2: z.string(),
    needHelp: z.string(),
    needHelp2: z.string(),
    pleaseNote: z.string(),
    selectPaymentMethod: z.string(),
    debitOrCredit: z.string(),
    priceToday: z.string(),
    priceTodayDes: z.string()
});

export type IAPConfig = z.infer<typeof IAPConfig>;