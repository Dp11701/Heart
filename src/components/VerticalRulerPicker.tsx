import React, { useRef, useState, useEffect } from "react";
import icBgWomen from "../assets/icBgWomen.png";
import icBgMan from "../assets/icBgMan.png";

interface VerticalRulerPickerProps {
  min: number;
  max: number;
  value: number;
  unit?: string;
  onChange?: (val: number) => void;
  gender?: "male" | "female";
}

const ITEM_HEIGHT = 10;

// Function to convert inches to feet and inches
const formatInchesToFeet = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet} ft ${remainingInches} in`;
};

export const VerticalRulerPicker: React.FC<VerticalRulerPickerProps> = ({
  min,
  max,
  value,
  unit = "cm",
  onChange,
  gender = "female",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(value);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const rulerHeight = scrollRef.current.clientHeight;
    const measuringLinePosition = rulerHeight * 0.15;
    const top = (max - value) * ITEM_HEIGHT; // Đảo ngược: max - value thay vì value - min
    scrollRef.current.scrollTo({
      top: top - measuringLinePosition + ITEM_HEIGHT / 2,
      behavior: "smooth",
    });
  }, []); // chỉ chạy 1 lần khi mount

  const snapToNearest = () => {
    if (!scrollRef.current) return;
    const rulerHeight = scrollRef.current.clientHeight;
    const measuringLinePosition = rulerHeight * 0.15; // 15% from top
    const scrollTop = scrollRef.current.scrollTop;
    const index = Math.round(
      (scrollTop + measuringLinePosition - ITEM_HEIGHT / 2) / ITEM_HEIGHT
    );
    const newValue = max - index; // Đảo ngược: max - index thay vì min + index
    const top = (max - newValue) * ITEM_HEIGHT; // Đảo ngược: max - newValue
    scrollRef.current.scrollTo({
      top: top - measuringLinePosition + ITEM_HEIGHT / 2,
      behavior: "smooth",
    });
    if (newValue >= min && newValue <= max && newValue !== current) {
      setCurrent(newValue);
      onChange?.(newValue);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const rulerHeight = scrollRef.current.clientHeight;
    const measuringLinePosition = rulerHeight * 0.15; // 15% from top
    const scrollTop = scrollRef.current.scrollTop;
    const index = Math.round(
      (scrollTop + measuringLinePosition - ITEM_HEIGHT / 2) / ITEM_HEIGHT
    );
    const newValue = max - index; // Đảo ngược: max - index thay vì min + index
    if (newValue >= min && newValue <= max && newValue !== current) {
      setCurrent(newValue);
      onChange?.(newValue);
    }
    // Debounce snap
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      snapToNearest();
    }, 120);
  };

  // Also snap on mouse/touch end for best UX
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onEnd = () => snapToNearest();
    el.addEventListener("touchend", onEnd);
    el.addEventListener("mouseup", onEnd);
    return () => {
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mouseup", onEnd);
    };
  }, []);

  return (
    <div
      className="flex items-center w-full h-full relative select-none"
      style={{ overflow: "visible" }}
    >
      {/* Ruler */}
      <div className="relative h-[60vh] w-1/3" style={{ overflow: "visible" }}>
        {/* Ruler ticks */}
        <div
          ref={scrollRef}
          className="relative h-full overflow-y-scroll pl-2"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
            scrollSnapType: "y mandatory",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          onScroll={handleScroll}
        >
          <div
            className="relative flex flex-col items-start"
            style={{
              height: (max - min + 1) * ITEM_HEIGHT,
              willChange: "transform",
            }}
          >
            {Array.from({ length: max - min + 1 }).map((_, i) => {
              const val = max - i; // Đảo ngược: từ max xuống min
              const isTenth = val % 10 === 0;
              return (
                <div
                  key={val}
                  className="flex items-center"
                  style={{ height: ITEM_HEIGHT, scrollSnapAlign: "start" }}
                >
                  <div
                    className={`${
                      isTenth
                        ? "h-[2px] w-12 bg-[#A5A6BC]"
                        : "h-[1px] w-8 bg-[#A5A6BC]"
                    }`}
                  />
                  {isTenth && (
                    <div className="text-xs text-gray-400 ml-2">{val}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Measuring line on ruler side */}
        <div className="absolute top-[15%] left-0 right-0 z-20">
          {/* Unit display above measuring line */}
          {/* <div className="absolute -top-8 right-0 text-[16px] font-semibold text-[#2D3142]">
            {value} {unit}
          </div> */}

          {/* Measuring line */}
          <div className="h-[4px] w-[70vw] bg-[#2D3142] rounded-sm" />
        </div>
      </div>

      {/* Avatar and measurement display */}
      <div className="w-2/3 h-[60vh] flex justify-center items-center relative">
        {/* Value display */}
        <div className="absolute left-1/2 top-[15%] -translate-x-1/2 -translate-y-full z-30 text-[28px] font-semibold text-[#2D3142] text-center mb-2">
          {unit === "ft/in"
            ? formatInchesToFeet(current)
            : `${current} ${unit}`}
        </div>

        {/* Avatar image - constrained to measuring line height */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "80%" }}
        >
          <img
            src={gender === "male" ? icBgMan : icBgWomen}
            alt="gender-illustration"
            className="object-contain object-bottom h-full w-full"
            style={{ maxHeight: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};
