import React, { Fragment, memo } from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
type Props = {
  skills: Skills[];
};

const Skills = ({ skills }: Props) => {
  return (
    <motion.div className="flex flex-col relative h-screen text-center md:text-left max-w-7xl px-10 justify-evenly mx-auto mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl tracking-[20px] uppercase md:text-6xl lg:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-10"
      >
        Skills
      </motion.h2>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-[500px] md:w-[800px] absolute mix-blend-screen overflow-visible"
      >
        <defs>
          <radialGradient
            id="Gradient1"
            cx="50%"
            cy="50%"
            fx="10%"
            fy="50%"
            r=".5"
          >
            <animate
              attributeName="fx"
              dur="34s"
              values="0%;10%;0%"
              repeatCount="indefinite"
            ></animate>
            <stop offset="0%" stopColor="#FFE47A"></stop>
            <stop offset="100%" stopColor="#00aeef00"></stop>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
          <animate
            attributeName="x"
            dur="20s"
            values="25%;0%;25%"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="y"
            dur="21s"
            values="0%;25%;0%"
            repeatCount="indefinite"
          ></animate>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="17s"
            repeatCount="indefinite"
          ></animateTransform>
        </rect>
      </svg>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-8 mx-auto md:mt-0 mt-10">
        {skills.map((item, index) => (
          <Fragment key={index}>
            <Skill skill={item} />
          </Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default memo(Skills);
