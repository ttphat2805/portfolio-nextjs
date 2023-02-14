import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import { AiOutlineGithub } from "react-icons/ai";
type Props = {};

const Projects = (props: Props) => {
  return (
    <motion.div className="flex relative flex-col text-center md:text-left px-7 md:px-10 justify-evenly mx-auto mt-24">
      <div className="h-[200px]"></div>
      <h3 className="uppercase tracking-[15px] text-gray-500 text-3xl md:text-6xl text-center mb-24">
        Projects
      </h3>

      <div className="w-full absolute top-[30%] bg-primary/10 left-0 h-[500px] -skew-y-12 z-0"></div>

      <div
        id="container"
        className="projects flex w-[200vw] mx-auto z-1 overflow-x-scroll"
      >
        <div id="project" className="project-item !w-[100vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 md:p-10 bg-slate-500 rounded-lg shadow-md">
            <div className="col-span-1 p-5 rounded-md">
              <img
                src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg?w=2000"
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-span-1 p-3 md:p-5 my-auto">
              <div className="title">
                <h4 className="text-2xl md:text-4xl text-[#2c3e50] font-bold font-Pacifico">
                  Booking Webiste
                </h4>
              </div>
              <div className="desc mt-5 text-white font-medium text-sm md:text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quidempisicing elit. Quidem cing elit. Quidem
              </div>
              <div className="date my-4">2022 - Dev</div>
              <div className="tech flex gap-3 justify-center md:justify-start">
                <motion.img
                  whileTap={{
                    scale: 1.3,
                  }}
                  src="/images/mongodb.png"
                  alt=""
                  className="w-[50px] h-[50px] border border-white/20 rounded-full p-2 shadow-md hover:border-white hover:bg-white transition duration-300"
                />
                <motion.img
                  whileTap={{
                    scale: 1.3,
                  }}
                  src="/images/mongodb.png"
                  alt=""
                  className="w-[50px] h-[50px] border border-white/20 rounded-full p-2 shadow-md hover:border-white hover:bg-white transition duration-300"
                />
                <motion.img
                  whileTap={{
                    scale: 1.3,
                  }}
                  src="/images/mongodb.png"
                  alt=""
                  className="w-[50px] h-[50px] border border-white/20 rounded-full p-2 shadow-md hover:border-white hover:bg-white transition duration-300"
                />
              </div>
              <div className="action my-5">
                <motion.button
                  whileTap={{
                    scale: 1.2,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="border border-[#1b222b] bg-[#1b222b] py-3 px-4 rounded-lg shadow-sm flex items-center justify-center hover:opacity-90 transition-all duration-300"
                >
                  <AiOutlineGithub className="inline-block text-2xl mr-2" />
                  View Github{" "}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <div id="project" className="project-item !w-[100vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 md:p-10 bg-slate-500 rounded-lg shadow-md">
            <div className="col-span-1 p-5 rounded-md">
              <img
                src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg?w=2000"
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="col-span-1 p-3 md:p-5 my-auto">
              <div className="title">
                <h4 className="text-2xl md:text-4xl text-[#2c3e50] font-bold font-Pacifico">
                  Booking Webiste
                </h4>
              </div>
              <div className="desc mt-5 text-white font-medium text-sm md:text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quidempisicing elit. Quidem cing elit. Quidem
              </div>
              <div className="date my-4">2022 - Dev</div>
              <div className="tech flex gap-3 justify-center md:justify-start">
                <motion.img
                  whileTap={{
                    scale: 1.3,
                  }}
                  src="/images/mongodb.png"
                  alt=""
                  className="w-[50px] h-[50px] border border-white/20 rounded-full p-2 shadow-md hover:border-white hover:bg-white transition duration-300"
                />
                <motion.img
                  whileTap={{
                    scale: 1.3,
                  }}
                  src="/images/mongodb.png"
                  alt=""
                  className="w-[50px] h-[50px] border border-white/20 rounded-full p-2 shadow-md hover:border-white hover:bg-white transition duration-300"
                />
                <motion.img
                  whileTap={{
                    scale: 1.3,
                  }}
                  src="/images/mongodb.png"
                  alt=""
                  className="w-[50px] h-[50px] border border-white/20 rounded-full p-2 shadow-md hover:border-white hover:bg-white transition duration-300"
                />
              </div>
              <div className="action my-5">
                <motion.button
                  whileTap={{
                    scale: 1.2,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="border border-[#1b222b] bg-[#1b222b] py-3 px-4 rounded-lg shadow-sm flex items-center justify-center hover:opacity-90 transition-all duration-300"
                >
                  <AiOutlineGithub className="inline-block text-2xl mr-2" />
                  View Github{" "}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
