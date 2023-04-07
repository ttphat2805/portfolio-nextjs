/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import { TbDownload } from "react-icons/tb";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { urlFor } from "../sanity";
import BackgroundCircles from "./BackgroundCircles";
import ParticlesCanvas from "./ParticlesCanvas";

type Props = {
  pageInfo: PageInfo;
  skills: Skills[];
};

const Hero = ({ pageInfo, skills }: Props) => {
  const [text, count] = useTypewriter({
    words: [`${pageInfo.name}`, "Front-end Developer", "ReactJS Developer"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen clip-home bg-light dark:bg-dark relative flex flex-col space-y-8 items-center justify-center text-center">
      <ParticlesCanvas skills={skills} />
      <BackgroundCircles />
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        src={urlFor(pageInfo.avatarHero).url()}
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        alt=""
      />
      <div className="z-20">
        <motion.h2
          className="text-lg uppercase text-textlight dark:text-textdark tracking-[15px]"
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {pageInfo.role}
        </motion.h2>
        <h1 className="text-5xl lg:text-6xl font-semibold my-10">
          <span>I'm</span> <span className="mr-3 text-primary">{text}</span>
          <Cursor cursorColor="#f89d36" />
        </h1>
        <button className="bg-transparent font-medium px-3 py-2 rounded-md shadow-lg border border-primary text-primary hover:brightness-105 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
          <Link href="TranTanPhat_Resume.pdf" download>
            Download CV <TbDownload className="inline-block text-xl" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
