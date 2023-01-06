import React from "react";
import { motion } from "framer-motion";
type Props = {};

const About = (props: Props) => {
  return (
    <motion.div
      className="flex flex-col relative h-screen text-center md:text-left max-w-7xl px-10 justify-evenly mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <h3 className="uppercase tracking-[20px] text-gray-500 text-6xl text-center">
        About
      </h3>
      <div className="flex items-center">
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
          className="flex-shrink-0 w-56 h-56 rounded-full md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[500px] object-fill"
        />

        <div className="space-y-10 px-0 md:px-10">
          <h4 className="text-4xl font-semibold">
            Here is a{" "}
            <span className="underline decoration-primary">little</span> bg
          </h4>
          <p className="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nemo
            assumenda provident excepturi ex eius tenetur officia veritatis modi
            nostrum eaque esse reprehenderit natus repellat ut quia iusto vel
            quae!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
