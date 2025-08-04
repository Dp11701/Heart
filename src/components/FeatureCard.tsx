import React from "react";
import { motion } from "framer-motion";
import RealTime from "../assets/images/RealTime.png";
import Blood from "../assets/images/Blood.png";
import Healthy from "../assets/images/Healthy.png";
import Personalized from "../assets/images/Personalized.png";

// Icon mapping
const iconMap: { [key: string]: string } = {
  "Real-time Heart Monitoring": RealTime,
  "Blood Pressure Tracking": Blood,
  "Heart-Healthy Diet": Healthy,
  "AI-personalized Plan": Personalized,
};

interface FeatureCardProps {
  config: { title: string; description?: string };
  idx: number;
  onTap: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  config,
  idx,
  onTap,
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay: idx * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="rounded-xl shadow-md flex flex-col h-auto w-auto"
    >
      <img
        src={iconMap[config.title] || RealTime}
        alt="feature"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};
