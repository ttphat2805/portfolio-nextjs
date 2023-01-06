/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
type Props = {};

const Projects = (props: Props) => {
  return (
    <motion.div className="flex relative flex-col h-screen text-center md:text-left px-10 justify-evenly mx-auto">
      <h3 className="top-10 uppercase tracking-[20px] text-gray-500 text-6xl text-center">
        Projects
      </h3>

      <div className="w-full absolute top-[30%] bg-primary/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
};

export default Projects;
