import Link from "next/link";
import React from "react";
import { MdFacebook } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { AiOutlineGithub } from "react-icons/ai";
import { motion } from "framer-motion";
type Props = {};

const Header = (props: Props) => {
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
      >
        {/* Social Icons */}
        <Link href={""}>
          <div className="icon text-2xl">
            <MdFacebook />
          </div>
        </Link>
        <Link href={""}>
          <div className="icon text-2xl">
            <FiInstagram />
          </div>
        </Link>
        <Link href={""}>
          <div className="icon text-2xl">
            <FaLinkedin />
          </div>
        </Link>
        <Link href={""}>
          <div className="icon text-2xl">
            <AiOutlineGithub />
          </div>
        </Link>
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
