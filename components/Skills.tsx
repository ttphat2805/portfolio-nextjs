import React, { Fragment } from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { listSkills } from "../shared/contants";
type Props = {};

const Skills = (props: Props) => {
  return (
    <motion.div className="flex flex-col relative h-screen text-center md:text-left max-w-7xl px-10 justify-evenly mx-auto mt-24">
      <h3
        className="uppercase tracking-[20px] text-gray-500 text-4xl md:text-6xl text-center"
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="-1"
      >
        Skills
      </h3>
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
            <stop offset="0%" stopColor="#f7ac0a93"></stop>
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
      {/* <div className="eclipse-1 absolute w-[500px] h-[500px] rounded-full"></div> */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-8 mx-auto md:mt-0 mt-10">
        {listSkills.map((item, index) => (
          <Fragment key={index}>
            <Skill skill={item} directionLeft={item.direction} />
          </Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
