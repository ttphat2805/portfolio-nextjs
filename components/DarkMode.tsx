import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiSun } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";
type Props = {
  theme: boolean;
  setTheme: (value: boolean) => void;
};

const DarkMode = ({ theme, setTheme }: Props) => {
  return (
    <div
      className={`flex items-center h-[38px] w-[70px] cursor-pointer transition-all shadow-md
      hover:brightness-105 backdrop-blur-lg bg-white dark:bg-textdark/20 rounded-full duration-300 
      ${!theme ? "justify-end" : "justify-start"}`}
      onClick={() => setTheme(!theme)}
    >
      <motion.div
        layout
        className="h-[35px] w-[35px] rounded-full overflow-hidden bg-primary relative"
      >
        <AnimatePresence initial={false}>
          {theme ? (
            <BiSun className="text-white text-xl absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
          ) : (
            <BsMoonStars className="text-white text-xl absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DarkMode;
