// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics, logEvent} from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAqEYAC1isVQRHf8q9LRwKxPARVsWvn9jE",
    authDomain: "tracking-event-server-adjust.firebaseapp.com",
    projectId: "tracking-event-server-adjust",
    storageBucket: "tracking-event-server-adjust.firebasestorage.app",
    messagingSenderId: "911004696184",
    appId: "1:911004696184:web:718e5eb907ea877c44f78d",
    measurementId: "G-79HK0D6V8X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export class FirebaseUtils {
    static trackingIntro(actionName: string, extraInfo: Record<string, string> = {}) {
        const defaultInfo = {
            action_type: "screen",
            action_name: actionName
        }
        const params = {...defaultInfo, ...extraInfo};
        logEvent(analytics, "tracking_web", params);
    }

    static trackingPayment(actionName: string, extraInfo: Record<string, string> = {}) {
        const defaultInfo = {
            action_type: "paywall",
            action_name: actionName
        }
        const params = {...defaultInfo, ...extraInfo};
        logEvent(analytics, "tracking_web", params);
    }
}