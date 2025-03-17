/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  text?: string;
}

const LoadingSpinner = ({
  size = "md",
  color = "primary",
  text,
}: LoadingSpinnerProps) => {
  // Size mapping
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  // Color mapping
  const colorMap = {
    primary: "border-primary/20 border-t-primary",
    white: "border-white/30 border-t-white",
    gray: "border-gray-200 border-t-gray-600",
  };

  // Text size mapping
  const textSizeMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`${sizeMap[size]} border-4 border-transparent rounded-full`}
        style={{
          borderTopColor: "currentColor",
          borderLeftColor: "currentColor",
          opacity: 0.75,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {text && (
        <p className={`mt-2 ${textSizeMap[size]} text-center`}>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
