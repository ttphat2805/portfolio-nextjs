import React from "react";
import { motion } from "framer-motion";
import { useLocomotiveScroll } from "react-locomotive-scroll";
type Props = {};

const About = (props: Props) => {
  const { scroll } = useLocomotiveScroll();
  console.log("scroll: ", scroll);
  // const scrollDirection = delta.y > 0 ? "up" : "down";
  return (
    <>
      <motion.div
        className="flex flex-col relative h-screen text-center md:text-left max-w-7xl px-10 justify-evenly mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h3
          className="uppercase tracking-[20px] text-gray-500 text-4xl md:text-6xl text-center"
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="2"
        >
          About
        </h3>
        <div className="flex md:flex-row flex-col items-center">
          <motion.img
            src="https://www.mnp.ca/-/media/foundation/integrations/personnel/2020/12/16/13/57/personnel-image-4483.jpg?h=800&w=600&hash=9D5E5FCBEE00EB562DCD8AC8FDA8433D"
            alt=""
            initial={{
              x: -200,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
            }}
            viewport={{ once: true }}
            data-scroll
            data-scroll-direction="vertical"
            data-scroll-speed="5"
            className="flex-shrink-0 w-56 h-56 rounded-full md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[500px] object-fill"
          />

          <div className="space-y-5 px-0 md:px-10 text-center md:mt-0 mt-5">
            <h4
              className="text-4xl font-semibold"
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed="2"
            >
              Here is a{" "}
              <span className="underline decoration-primary">little</span> bg
            </h4>
            <p
              className="text-base"
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed="-1"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nemo
              assumenda provident excepturi ex eius tenetur officia veritatis
              modi nostrum eaque esse reprehenderit natus repellat ut quia iusto
              vel quae!
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default About;
