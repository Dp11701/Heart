import "../styles/Common.css";
import icIdeal from "../assets/icIdeal.png";
function IdealView(props: { text: string }) {
  return (
    <div className="flex flex-row gap-[8px] items-center justify-center p-4 bg-white rounded-[20px] m-4">
      <img src={icIdeal} alt={"idea"} />
      <span className="text-[#59617A] text-start  text-[14px] leading-[20px]">
        {props.text}
      </span>
    </div>
  );
}

export default IdealView;
