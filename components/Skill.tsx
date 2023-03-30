/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
type Props = {
  directionLeft?: boolean;
  skill: {
    src: string;
    text: string;
  };
};

const Skill = ({ directionLeft, skill }: Props) => {
  return (
    <div
      className="group cursor-pointer"
      data-scroll
      data-scroll-direction="vertical"
      data-scroll-speed="1"
    >
      <motion.div
        initial={{
          x: directionLeft ? -100 : 100,
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="group bg-[rgba(0,0,0,.2)] w-full h-full p-4
         flex items-center text-center rounded-2xl border-[1px] border-gray-500/50 
         backdrop-blur-lg shadow-skillsd hover:brightness-150 hover:border-white/30 
         transition-all duration-300"
      >
        <div className="flex flex-col items-center w-full">
          <img
            src={skill.src}
            alt="Skills"
            className="md:w-[5rem] md:h-[5rem] w-[3rem] h-[3rem] group-hover:scale-105 transition-all duration-300"
          />
          <p className="text-sm sm:text-base text-gray-400 group-hover:text-white transition-all duration-200 mt-1">
            {skill.text}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Skill;
