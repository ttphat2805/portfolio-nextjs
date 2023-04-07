import React from "react";
import { motion } from "framer-motion";
type Props = {};

const BackgroundCircles = (props: Props) => {
  return (
    <motion.div
      className="relative flex justify-center items-center"
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 2.5,
      }}
    >
      <div className="absolute border border-gray-300 dark:border-white/20 rounded-full h-[250px] w-[250px] mt-60 animate-ping" />
      <div className="absolute border border-gray-300 dark:border-white/20 rounded-full h-[300px] w-[300px] mt-60" />
      <div className="absolute border border-gray-300 dark:border-white/20 rounded-full h-[500px] w-[500px] mt-60 animate-pulse" />
      <div className="absolute border border-gray-300 dark:border-white/20 rounded-full h-[620px] w-[620px] mt-60 animate-pulse" />
      <div className="absolute border border-gray-300 dark:border-white/20 rounded-full h-[800px] w-[800px] mt-60 animate-pulse" />
    </motion.div>
  );
};

export default BackgroundCircles;
