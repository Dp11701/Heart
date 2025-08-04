import React, { useRef, useState, useEffect } from "react";
import "./RulerPicker.css";

interface RulerPickerProps {
  min: number;
  max: number;
  value: number;
  unit?: string;
  onChange?: (val: number) => void;
  orientation?: "horizontal" | "vertical";
}

const ITEM_WIDTH = 24;

export const RulerPicker: React.FC<RulerPickerProps> = ({
  min,
  max,
  value,
  unit = "",
  onChange,
  orientation = "horizontal",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(value);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    const centerOffset =
      orientation === "horizontal"
        ? scrollRef.current.clientWidth / 2
        : scrollRef.current.clientHeight / 2;
    const left = (value - min) * ITEM_WIDTH;
    if (orientation === "horizontal") {
      scrollRef.current.scrollTo({
        left: left - centerOffset + ITEM_WIDTH / 2,
        behavior: "auto",
      });
    } else {
      scrollRef.current.scrollTo({
        top: left - centerOffset + ITEM_WIDTH / 2,
        behavior: "auto",
      });
    }
  }, [value, min, orientation]);

  const snapToNearest = () => {
    if (!scrollRef.current) return;
    const centerOffset =
      orientation === "horizontal"
        ? scrollRef.current.clientWidth / 2
        : scrollRef.current.clientHeight / 2;
    const scrollPos =
      orientation === "horizontal"
        ? scrollRef.current.scrollLeft
        : scrollRef.current.scrollTop;
    const index = Math.round(
      (scrollPos + centerOffset - ITEM_WIDTH / 2) / ITEM_WIDTH
    );
    const newValue = min + index;
    const left = (newValue - min) * ITEM_WIDTH;
    if (orientation === "horizontal") {
      scrollRef.current.scrollTo({
        left: left - centerOffset + ITEM_WIDTH / 2,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scrollTo({
        top: left - centerOffset + ITEM_WIDTH / 2,
        behavior: "smooth",
      });
    }
    if (newValue >= min && newValue <= max && newValue !== current) {
      setCurrent(newValue);
      onChange?.(newValue);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    // Set scrolling state to prevent excessive updates
    if (!isScrolling) {
      setIsScrolling(true);
    }

    const centerOffset =
      orientation === "horizontal"
        ? scrollRef.current.clientWidth / 2
        : scrollRef.current.clientHeight / 2;
    const scrollPos =
      orientation === "horizontal"
        ? scrollRef.current.scrollLeft
        : scrollRef.current.scrollTop;
    const index = Math.round(
      (scrollPos + centerOffset - ITEM_WIDTH / 2) / ITEM_WIDTH
    );
    const newValue = min + index;
    if (newValue >= min && newValue <= max && newValue !== current) {
      setCurrent(newValue);
      onChange?.(newValue);
    }

    // Debounce snap with longer delay for mobile
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      snapToNearest();
      setIsScrolling(false);
    }, 250); // Increased delay for better mobile performance
  };

  // Also snap on mouse/touch end for best UX
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onEnd = () => {
      // Small delay to let momentum scrolling finish
      setTimeout(() => {
        snapToNearest();
        setIsScrolling(false);
      }, 100);
    };

    el.addEventListener("touchend", onEnd);
    el.addEventListener("mouseup", onEnd);
    el.addEventListener("scrollend", () => setIsScrolling(false));

    return () => {
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mouseup", onEnd);
      el.removeEventListener("scrollend", () => setIsScrolling(false));
    };
  }, [orientation, snapToNearest]);

  // Prevent default touch behaviors that might interfere
  const handleTouchStart = (e: React.TouchEvent) => {
    // Allow native scrolling but prevent other touch behaviors
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent zoom gestures during scroll
    if (Math.abs(e.touches[0].clientX - e.touches[0].clientX) > 10) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto select-none ruler-picker-container">
      {/* Giá trị hiển thị */}
      <div className="text-center text-[28px] leading-[32px] font-semibold text-[#2D3142] mb-2 ruler-value-display">
        {current}
        <span className="text-[20px] leading-[32px] text-[#2D3142] font-[500] ml-1">
          {unit}
        </span>
      </div>

      {/* Ruler */}
      <div
        className={`relative ${
          orientation === "horizontal" ? "w-full h-28" : "h-96 w-20"
        }`}
      >
        {/* Vạch center */}
        {orientation === "horizontal" ? (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-[3px] h-20 bg-[#2D3142]" />
          </div>
        ) : (
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-20 flex justify-center">
            <div className="h-[3px] w-16 bg-[#2D3142]" />
          </div>
        )}

        {/* Scrollable ruler */}
        <div
          ref={scrollRef}
          className={`relative h-full bg-transparent ruler-scroll-container ${
            orientation === "horizontal"
              ? "overflow-x-scroll"
              : "overflow-y-scroll"
          }`}
          style={{
            touchAction: orientation === "horizontal" ? "pan-x" : "pan-y",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`relative bg-transparent flex items-end ${
              orientation === "horizontal"
                ? "h-full flex-row"
                : "w-full flex-col items-center"
            }`}
            style={{
              width:
                orientation === "horizontal"
                  ? (max - min + 1) * ITEM_WIDTH
                  : undefined,
              height:
                orientation === "vertical"
                  ? (max - min + 1) * ITEM_WIDTH
                  : undefined,
            }}
          >
            {Array.from({ length: max - min + 1 }).map((_, i) => {
              const val = min + i;
              const isTenth = val % 10 === 0;
              return (
                <div
                  key={val}
                  className={`flex flex-col items-center justify-end ruler-item ${
                    orientation === "horizontal"
                      ? ""
                      : "flex-row items-end justify-center"
                  }`}
                  style={{
                    width:
                      orientation === "horizontal" ? ITEM_WIDTH : undefined,
                    height: orientation === "vertical" ? ITEM_WIDTH : undefined,
                  }}
                >
                  {isTenth && (
                    <div
                      className={`text-xs text-gray-400 mt-1 ${
                        orientation === "horizontal" ? "" : "ml-2 mb-0"
                      }`}
                    >
                      {val}
                    </div>
                  )}
                  <div
                    className={`${
                      isTenth
                        ? orientation === "horizontal"
                          ? "w-[2px] h-12 bg-[#A5A6BC]"
                          : "h-[2px] w-12 bg-[#A5A6BC]"
                        : orientation === "horizontal"
                        ? "w-[1px] h-8 bg-[#A5A6BC]"
                        : "h-[1px] w-8 bg-[#A5A6BC]"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
