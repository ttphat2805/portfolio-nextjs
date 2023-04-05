/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { AiOutlineGithub } from "react-icons/ai";
import { urlFor } from "../sanity";
import Link from "next/link";
import { formatDate } from "../shared/contants";
type Props = {
  project: Project[];
};

const Projects = ({ project }: Props) => {
  console.log("project: ", project);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left px-7 md:px-10 justify-evenly mx-auto mt-24"
    >
      <div className="h-[200px]"></div>
      <h3
        className="uppercase tracking-[15px] text-gray-500 text-3xl md:text-6xl text-center mb-24"
        data-scroll
        data-scroll-direction="vertical"
        data-scroll-speed="2"
      >
        Projects
      </h3>

      <div className="w-full absolute top-[30%] bg-primary/10 left-0 h-[500px] -skew-y-12 z-0"></div>

      <div className="projects flex flex-col gap-32 relative mx-auto z-1">
        {project.map((item: Project, index: number) => (
          <motion.div
            key={index}
            className="project-item max-w-6xl w-full"
            initial={{
              x: 200,
              opacity: 0,
            }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="bg-[#313552d2] grid grid-cols-1 md:grid-cols-2 p-3 md:p-̀5 rounded-lg backdrop-blur-lg border-b border-primary hover:border-b-4 transition-all duration-300">
              <div className="col-span-1 p-2 md:p-5 rounded-md">
                <img
                  src={urlFor(item.image).url()}
                  alt=""
                  className="h-[18rem] sm:h-[20rem] md:h-[18rem] lg:h-[22rem] w-full object-cover rounded-lg hover:scale-[1.01] transition-transform duration-300"
                />
              </div>

              <div className="col-span-1 p-3 md:p-5 my-auto text-left">
                <div className="title">
                  <h4 className="text-2xl md:text-4xl text-white font-bold font-Pacifico">
                    {item.title}
                  </h4>
                </div>
                <div className="desc mt-5 text-white font-medium text-sm md:text-base">
                  {item.summary}
                </div>
                <div className="date my-4">
                  {`${formatDate(item.fromDate)} - ${formatDate(item.toDate)}`}
                </div>
                <div className="tech flex gap-3 justify-center md:justify-start">
                  {item.technologies.map((tech: Technology, index: number) => (
                    <motion.img
                      key={index}
                      whileTap={{
                        scale: 1.3,
                      }}
                      src={urlFor(tech.image).url()}
                      alt="technology-icon"
                      className="tech-icon"
                    />
                  ))}
                </div>
                {item.linkBuild && (
                  <div className="action my-5 flex md:justify-start justify-center">
                    <Link href={item.linkBuild}>
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
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
