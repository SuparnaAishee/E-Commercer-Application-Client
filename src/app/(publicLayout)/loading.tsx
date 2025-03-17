"use client";

import { motion } from "framer-motion";

interface LoadingPulseProps {
  color?: "primary" | "white" | "gray";
  size?: "sm" | "md" | "lg";
}

const LoadingPulse = ({
  color = "primary",
  size = "md",
}: LoadingPulseProps) => {
  // Size mapping
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  // Color mapping
  const colorMap = {
    primary: "bg-primary",
    white: "bg-white",
    gray: "bg-gray-600",
  };

  return (
    <div className="relative">
      <motion.div
        className={`${sizeMap[size]} ${colorMap[color]} rounded-full opacity-20`}
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute inset-0 ${colorMap[color]} rounded-full opacity-40`}
        initial={{ opacity: 0.4, scale: 0.6 }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.6, 1, 0.6] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      <motion.div
        className={`absolute inset-0 ${colorMap[color]} rounded-full`}
        initial={{ scale: 0.4 }}
        animate={{ scale: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />
    </div>
  );
};

export default LoadingPulse;
