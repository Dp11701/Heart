import {z} from "zod";
import {ValueConfig} from "../models/ValueConfig";
import defaultValueConfig from '../configs/value_config.json'

export const EnumOS = z.enum([
    'Android', 'iOS', 'macOS', 'Windows', 'Unknown', 'Windows Phone'
])
export type EnumOS = z.infer<typeof EnumOS>

export class Utils {
    static getOS() : EnumOS {
        const userAgent = window.navigator.userAgent || window.navigator.vendor;

        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }
        if (/android/i.test(userAgent)) {
            return "Android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            return "iOS";
        }
        if (/Macintosh/.test(userAgent)) {
            return "macOS";
        }
        if (/Windows/.test(userAgent)) {
            return "Windows";
        }
        return "Unknown";
    }

    static valueConfig(): ValueConfig {
        return ValueConfig.parse(defaultValueConfig);
    }

}