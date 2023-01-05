import React from "react";
import { motion } from "framer-motion";
type Props = {};

const Skills = (props: Props) => {
  return (
    <motion.div
      className="h-screen flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px]
     xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-10 uppercase tracking-[20px] text-gray-500 text-4xl">
        Skills
      </h3>
      <div className="grid grid-cols-4 gap-5"></div>
    </motion.div>
  );
};

export default Skills;
