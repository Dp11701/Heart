import ContinueButton from "../components/ContinueButton";
import icIdeal2 from "../assets/icIdeal2.png";
import ColorScale from "../components/ColorScale";
import { UserInfo } from "../models/UserInfo";
import { OverviewInfoSchema, WelcomeSchema } from "../models/WelcomeConfig";
import { Typography, Image } from "antd";
import doctor from "../assets/Doctor2.gif";
import { BMIResult } from "../components/BMIResult";
// Import icons
import icCheck from "../assets/icons/icCheck.svg";
import icCancel from "../assets/icons/icCancel.svg";
import icRequest from "../assets/icons/icRequest.svg";
import icBloodPressure from "../assets/icons/icBloodPressure.svg";
import icHeartRate from "../assets/icons/icHeartRate.svg";
import icSleep from "../assets/icons/icSleep.svg";
import icNutrition from "../assets/icons/icNutrition.svg";
import icEnergy from "../assets/icons/icEnergy.svg";
import icImprove from "../assets/icons/icImprove.svg";
import icExploring from "../assets/icons/icExploring.svg";
import icWatch from "../assets/icons/icWatch.svg";
import icManually from "../assets/icons/icManually.svg";
import icProhibition from "../assets/icons/icProhibition.svg";
import icHealthcare from "../assets/icons/icHealthcare.svg";
import icSmile from "../assets/icons/icSmile.svg";
import icConfused from "../assets/icons/icConfused.svg";
import icSad from "../assets/icons/icSad.svg";
import icVerySad from "../assets/icons/icVerySad.svg";
import icSedentary from "../assets/icons/icSedentary.svg";
import icLightActivity from "../assets/icons/icLightActivity.svg";
import icModerate from "../assets/icons/icModerate.svg";
import icVeryActive from "../assets/icons/icVeryActive.svg";
import icTobacco from "../assets/icons/icTobacco.svg";
import icVape from "../assets/icons/icVape.svg";
import icSmoker from "../assets/icons/icSmoker.svg";
import icNeverSmoker from "../assets/icons/icNeverSmoker.svg";
import icRegularly from "../assets/icons/icRegularly.svg";
import icOccasionally from "../assets/icons/icOccasionally.svg";
import icBeer from "../assets/icons/icBeer.svg";
import icNoAlcohol from "../assets/icons/icNoAlcohol.svg";
import icHeartPlus from "../assets/icons/icHeartPlus.svg";
// Icon mapping
const iconMap: { [key: string]: string } = {
  icCheck: icCheck,
  icCancel: icCancel,
  icRequest: icRequest,
  icBloodPressure: icBloodPressure,
  icHeartRate: icHeartRate,
  icSleep: icSleep,
  icNutrition: icNutrition,
  icEnergy: icEnergy,
  icImprove: icImprove,
  icExploring: icExploring,
  icWatch: icWatch,
  icManually: icManually,
  icProhibition: icProhibition,
  icHealthcare: icHealthcare,
  icSmile: icSmile,
  icConfused: icConfused,
  icSad: icSad,
  icVerySad: icVerySad,
  icSedentary: icSedentary,
  icLightActivity: icLightActivity,
  icModerate: icModerate,
  icVeryActive: icVeryActive,
  icTobacco: icTobacco,
  icVape: icVape,
  icSmoker: icSmoker,
  icNeverSmoker: icNeverSmoker,
  icRegularly: icRegularly,
  icOccasionally: icOccasionally,
  icBeer: icBeer,
  icNoAlcohol: icNoAlcohol,
  icHeartPlus: icHeartPlus,
};

// Mapping function to get display values from userInfo
const getUserInfoDisplay = (userInfo: UserInfo) => {
  const mappings = [
    {
      key: "cholesterolOption",
      label: "Cholesterol",
      getIcon: () => "icHeartPlus",
      getValue: (info: UserInfo) => {
        if (info.cholesterolOption === "icCheck") return "Yes";
        if (info.cholesterolOption === "icCancel") return "No";
        if (info.cholesterolOption === "icRequest") return "I don't know";
        return "Not specified";
      },
    },
    {
      key: "bloodPressureReading",
      label: "Blood Pressure",
      getIcon: () => "icBloodPressure",
      getValue: (info: UserInfo) => {
        if (info.bloodPressureReading === "icSmile")
          return "Less than 120/Less than 80";
        if (info.bloodPressureReading === "icConfused")
          return "120-129/less than 80";
        if (info.bloodPressureReading === "icSad") return "130-139/80-89";
        if (info.bloodPressureReading === "icVerySad")
          return "140 or higher/90 or higher";
        if (info.bloodPressureReading === "icRequest") return "I don't know";
        return "Not specified";
      },
    },
    {
      key: "activityLevelOption",
      label: "Activity Level",
      getIcon: (info: UserInfo) => info.activityLevelOption || "icVeryActive",
      getValue: (info: UserInfo) => {
        if (info.activityLevelOption === "icSedentary")
          return "Sedentary (little to no exercise)";
        if (info.activityLevelOption === "icLightActivity")
          return "Light activity (1-2 times/week)";
        if (info.activityLevelOption === "icModerate")
          return "Moderate activity (3-5 times/week)";
        if (info.activityLevelOption === "icVeryActive")
          return "Very active (more than 5 times/week)";
        return "Not specified";
      },
    },
    {
      key: "smokeHistory",
      label: "Smoking History",
      getIcon: (info: UserInfo) => info.smokeHistory || "icTobacco",
      getValue: (info: UserInfo) => {
        if (info.smokeHistory === "icTobacco") return "I smoke tobacco";
        if (info.smokeHistory === "icVape") return "Only vape";
        if (info.smokeHistory === "icSmoker") return "I'm an ex-smoker";
        if (info.smokeHistory === "icNeverSmoker") return "I've never smoked";
        return "Not specified";
      },
    },
    {
      key: "drinkAlcoholOption",
      label: "Alcohol Consumption",
      getIcon: (info: UserInfo) => info.drinkAlcoholOption || "icRegularly",
      getValue: (info: UserInfo) => {
        if (info.drinkAlcoholOption === "icRegularly") return "Regularly";
        if (info.drinkAlcoholOption === "icOccasionally") return "Occasionally";
        if (info.drinkAlcoholOption === "icBeer")
          return "Regularly but in the past";
        if (info.drinkAlcoholOption === "icNoAlcohol") return "I don't drink";
        return "Not specified";
      },
    },
  ];

  return mappings.filter((mapping) => userInfo[mapping.key as keyof UserInfo]);
};

export interface IBMIScreenProps {
  config: OverviewInfoSchema;
  userInfo: UserInfo;
  onContinue: () => void;
}

export function BMIScreen(props: IBMIScreenProps): JSX.Element {
  const { userInfo } = props;
  const heightInCm =
    userInfo.heightUnit === "ft/in"
      ? (userInfo?.height ?? 0) * 2.54
      : userInfo.height ?? 0;
  const weightInKg =
    userInfo.weightUnit === "lbs"
      ? (userInfo.weight ?? 0) * 0.453592
      : userInfo.weight ?? 0;

  const userInfoDisplay = getUserInfoDisplay(userInfo);

  return (
    <div className="screen-container">
      <div className="screen-content">
        <Typography className="text-center text-[#2D3142] font-[600] text-[20px] leading-[32px] px-5 mb-10">
          Your Personal Summary
        </Typography>

        <Image
          src={doctor}
          alt="doctor"
          className="w-full h-full object-cover object-left"
          preview={false}
        />

        <div className="flex flex-col items-center mb-8 bg-[#FFFFFF] mx-5 rounded-[16px] pb-4">
          <BMIResult w={weightInKg} h={heightInCm} />

          <div className="flex flex-col w-full px-5 gap-4">
            {userInfoDisplay.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-center justify-start px-3 bg-[#F4F6FA] rounded-[16px]"
              >
                <img src={iconMap[item.getIcon(userInfo)]} alt={item.label} />
                <div className="flex flex-col justify-start items-start">
                  <Typography className="text-[14px] text-[#9C9EB9] font-[400] leading-[20px]">
                    {item.label}
                  </Typography>
                  <Typography className="font-[500] text-[14px] leading-[20px] text-[#2D3142]">
                    {item.getValue(userInfo)}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContinueButton
        disabled={false}
        text={"Continue"}
        onClick={() => {
          props.onContinue();
        }}
      />
    </div>
  );
}
