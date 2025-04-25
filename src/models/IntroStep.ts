import {z} from "zod";

export const IntroStep = z.enum([
    'WELCOME',
    'SELECT_GENDER',
    'SELECT_AGE',
    'SELECT_WEIGHT',
    'SELECT_HEIGHT',
    'OVERVIEW_INFO',
    'SELECT_CHOLESTEROL',
    'SELECT_BLOOD_PRESSURE',
    'SELECT_HYPERTENSION',
    'SELECT_HIGH_BLOOD_PRESSURE',
    'SELECT_ACTIVITY_LEVEL',
    'SELECT_SLEEP',
    'SELECT_SMOKING_HISTORY',
    'SELECT_ALCOHOL',
    'ANALYZING',
    'SEND_EMAIL',
])

export type IntroStep = z.infer<typeof IntroStep>;