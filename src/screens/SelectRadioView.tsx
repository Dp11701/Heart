import { HTMLAttributes, useEffect, useState } from "react";

import "../styles/SelectRadioView.css";
import "../styles/Common.css";
import { SelectSchema } from "../models/WelcomeConfig";
import { isValid } from "zod";
import NextButton from "../components/NextButton";

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
};

interface SelectRadioItemProps extends HTMLAttributes<HTMLElement> {
  idx: number;
  showIndex: number;
  option: any;
  isSelected: boolean;
  onTap: () => void;
}

function SelectRadioItem(props: SelectRadioItemProps) {
  const [scale, setScale] = useState(false);

  function className(): string {
    if (props.isSelected) {
      return `option-button-active item-list ${
        props.idx < props.showIndex ? "show" : ""
      } ${scale ? "bounce" : ""}`;
    }
    return `option-button item-list ${
      props.idx < props.showIndex ? "show" : ""
    }`;
  }

  return (
    <div
      key={props.idx}
      className={`${className()} bg-white rounded-[18px]`}
      style={{
        border: props.isSelected ? "2px solid #FF3D60" : "none",
        borderRadius: props.isSelected ? "8px" : "0",
      }}
      onClick={() => {
        setScale(true);
        props.onTap();
      }}
    >
      <div className="flex items-center gap-2">
        <img
          src={iconMap[props.option?.key] || props.option?.key}
          alt="icon"
          className="w-6 h-6"
          style={{ pointerEvents: "none" }}
        />
        <span>{props.option?.value as string}</span>
      </div>
    </div>
  );
}

export interface SelectRadioProps extends HTMLAttributes<HTMLDivElement> {
  options: SelectSchema;
  onPickOption?: (value: string) => void;
}

export function SelectRadioView(props: SelectRadioProps) {
  const { options, onPickOption, ...rest } = props;

  const [selectedOption, setSelectedOptions] = useState<any | null>(null);

  const [showIndex, setShowIndex] = useState<number>(0);

  useEffect(() => {
    for (let i = 0; i <= props.options.options.length; i++) {
      setTimeout(() => {
        setShowIndex(i);
      }, 100 * i);
    }
  }, [props.options.options.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "12px 16px",
        gap: 16,
      }}
      className="overflow-y-auto"
      {...rest}
    >
      <div className="flex flex-col gap-4">
        <span className="title-text"> {props.options.title} </span>

        <div className="flex flex-col gap-4">
          {props.options.options.map((option, idx) => {
            return (
              <SelectRadioItem
                idx={idx}
                isSelected={selectedOption?.key === option.key}
                option={option}
                showIndex={showIndex}
                key={`${option.key}-${idx}`}
                onTap={() => {
                  setSelectedOptions(option);
                }}
              />
            );
          })}
        </div>
      </div>

      <NextButton
        disabled={selectedOption === null}
        text={"Next"}
        onClick={() => {
          props.onPickOption?.(selectedOption?.key || "");
        }}
      />
    </div>
  );
}
