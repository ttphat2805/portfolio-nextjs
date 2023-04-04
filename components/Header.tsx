/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import { MdFacebook } from "react-icons/md";
import { SocialIcon } from "react-social-icons";
type Props = {
  socials: Socials[];
};

const Header = ({ socials }: Props) => {
  return (
    <header className="sticky top-5 flex items-start justify-between max-w-7xl mx-auto my-5 z-20 xl:items-center px-3">
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
        {socials?.map((social: Socials, index: number) => (
          <Link href={""} key={index}>
            <SocialIcon url={social.url} fgColor="gray" bgColor="transparent" />
          </Link>
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
        <div>
          <HiMail className="text-2xl text-gray-500" />
        </div>
        <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
          Get In Touch
        </p>
      </motion.div>
    </header>
  );
};

export default Header;
