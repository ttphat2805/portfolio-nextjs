/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRef } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import ParticlesCanvas from "./ParticlesCanvas";
import { motion } from "framer-motion";

type Props = {};

const Hero = (props: Props) => {
  const [text, count] = useTypewriter({
    words: ["Hi, The Name's TTP ", "I'm FrontEnd Developer", "I'm Student"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen relative flex flex-col space-y-8 items-center justify-center text-center">
      {/* <ParticlesCanvas /> */}
      <BackgroundCircles />
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        alt=""
      />
      <div className="z-20">
        <motion.h2
          className="text-lg uppercase text-gray-500 tracking-[15px]"
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Software Engieer
        </motion.h2>
        <h1 className="text-5xl lg:text-6xl font-semibold my-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
      </div>
    </div>
  );
};

export default Hero;
