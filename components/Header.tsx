/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { SocialIcon } from "react-social-icons";
import DarkMode from "./DarkMode";
type Props = {
  socials: Socials[];
  theme: boolean;
  setTheme: (value: boolean) => void;
};

const Header = ({ socials = [], theme, setTheme }: Props) => {
  return (
    <header className="sticky bg-light dark:bg-dark h-full pt-2">
      <div className="flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center px-3">
        <motion.div
          className="flex items-center gap-3 text-gray-500"
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="-1"
        >
          {/* Social Icons */}
          {socials.map((social: Socials, index: number) => (
            <SocialIcon
              key={index}
              url={social.url}
              fgColor="gray"
              bgColor="transparent"
            />
          ))}
        </motion.div>
        <motion.div
          className="flex items-center text-gray-300 cursor-pointer gap-2"
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
        >
          <DarkMode theme={theme} setTheme={setTheme} />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
