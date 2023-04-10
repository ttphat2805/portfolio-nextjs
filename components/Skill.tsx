/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { urlFor } from "../sanity";
type Props = {
  skill: Skills;
};

const Skill = ({ skill }: Props) => {
  return (
    <div
      className="group cursor-pointer"
      data-scroll
      data-scroll-direction="vertical"
      data-scroll-speed="1"
    >
      <motion.div
        initial={{
          x: 100,
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="group dark:bg-[rgba(0,0,0,.2)] bg-white/40 w-full h-full p-4
         flex items-center text-center rounded-2xl border-[1px] dark:border-gray-500/50 border-white/80 hover:border-gray-300
         backdrop-blur-lg dark:shadow-skillsd shadow-md hover:brightness-110 dark:hover:border-white/30 
         transition-all duration-300"
      >
        <div className="flex flex-col items-center w-full">
          <img
            src={urlFor(skill.image).url()}
            alt="Skills"
            className=" md:w-[5rem] md:h-[5rem] w-[3rem] h-[3rem] group-hover:scale-105 transition-all duration-300"
          />
          <p className="text-sm sm:text-base group-hover:text-gray-500 dark:group-hover:text-white transition-all duration-200 mt-1 text-textlight dark:text-textdark">
            {skill.title}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Skill;
