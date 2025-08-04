import "../styles/Common.css";
import icMan from "../assets/icMan.png";
import icWomen from "../assets/icWomen.png";
import { useState } from "react";

import "../styles/SelectGenderScreen.css";
import "../styles/SelectRadioView.css";
import IdealView from "../components/IdealView";
import NextButton from "../components/NextButton";
import { SelectGenderSchema } from "../models/WelcomeConfig";

function SelectGenderScreen(props: {
  config: SelectGenderSchema;
  onSelectGender: (gender: string) => void;
}) {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  function selectGender(gender: string) {
    setSelectedGender(gender);
  }

  function view(gender: string) {
    const isSelected = selectedGender === gender;
    return (
      <div
        className={`flex flex-col items-center justify-between p-4 bg-white rounded-[20px] m-2 h-min-[26vh] flex-1 gap-2 ${
          isSelected ? "border-2 border-[#FF3D60]" : ""
        }`}
        onClick={() => {
          selectGender(gender);
        }}
      >
        <img
          src={gender === props.config.male ? icMan : icWomen}
          alt={""}
          className="w-[2000%] h-auto max-w-[150%] object-contain md:w-[150%]"
        />
        <span className="text-[18px] font-[500] text-[#2D3142] leading-[28px]">
          {" "}
          {gender === props.config.male
            ? props.config.male
            : props.config.female}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between p-4 w-full h-full overflow-y-auto">
      <div className="flex flex-col items-center gap-4">
        <span className=" text-2xl font-bold text-gray-[#2D3142] my-4">
          {props.config.title}
        </span>

        <IdealView text={props.config.description} />

        <div className="flex flex-row items-center justify-center ">
          {view(props.config.male)}
          {view(props.config.female)}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full mb-4">
        <div>
          <button
            className="gender-prefer-not-to-say"
            onClick={() => selectGender(props.config.preferNotToSay)}
          >
            {props.config.preferNotToSay}
          </button>
        </div>
        <NextButton
          disabled={selectedGender === null}
          text={"Next"}
          onClick={() => {
            props.onSelectGender(selectedGender || "");
          }}
        />
      </div>
    </div>
  );
}

export default SelectGenderScreen;
