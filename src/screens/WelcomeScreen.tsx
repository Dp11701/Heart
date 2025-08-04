import iconTrusted from "../assets/icWelcomeTrusted.png";
import iconTick from "../assets/icTick.svg";
import "../styles/WelcomeView.css";
import ContinueButton from "../components/ContinueButton";
import { WelcomeSchema } from "../models/WelcomeConfig";
import { Image } from "antd";
import heartRate from "../assets/heartRate.png";
import Lottie from "react-lottie";
import starwellcomeAnimation from "../assets/jsons/Starwellcome.json";
import ratingsAnimation from "../assets/jsons/Ratings.json";

function WelcomeScreen(props: {
  config: WelcomeSchema;
  onContinue: () => void;
}) {
  return (
    <div className="screen-container">
      <div className="screen-content flex flex-col items-center justify-center gap-4">
        <Image
          src={heartRate}
          alt="heartRate"
          className="w-auto h-auto mb-10"
          preview={false}
        />
        <Lottie
          options={{
            animationData: starwellcomeAnimation,
            loop: true,
            autoplay: true,
          }}
          height="auto"
          width="auto"
          style={{
            mixBlendMode: "multiply",
            backgroundColor: "transparent",
          }}
        />
        <Lottie
          options={{
            animationData: ratingsAnimation,
            loop: true,
            autoplay: true,
          }}
          height="auto"
          width="auto"
          style={{
            mixBlendMode: "multiply",
            backgroundColor: "transparent",
          }}
        />
      </div>
      <ContinueButton
        disabled={false}
        text={props.config.continueTitle}
        // additionClassName='button-animate-keyboard'
        onClick={() => {
          props.onContinue();
        }}
      />
    </div>
  );
}

export default WelcomeScreen;
