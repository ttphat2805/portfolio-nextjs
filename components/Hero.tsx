/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import ParticlesCanvas from "./ParticlesCanvas";
type Props = {};

const Hero = (props: Props) => {
  const [text, count] = useTypewriter({
    words: ["Hi, The Name's TTP ", "I'm FrontEnd Developer", "I'm Student"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="h-screen relative flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <ParticlesCanvas />
      <BackgroundCircles />
      <img
        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        alt=""
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          Software Engieer
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold scroll-px-10 my-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
      </div>
    </div>
  );
};

export default Hero;
