import { motion } from "framer-motion";
import { urlFor } from "../sanity";
import { memo } from "react";
type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
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
        <div className="flex md:flex-row flex-col items-center w-full">
          <motion.img
            src={urlFor(pageInfo.backgroundAvatar).url()}
            alt=""
            initial={{
              x: -300,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.3,
            }}
            viewport={{ once: true }}
            data-scroll
            data-scroll-direction="vertical"
            data-scroll-speed="2"
            className="flex-shrink-0 w-56 h-56 rounded-full md:rounded-lg md:w-64 md:h-95 xl:w-[450px] xl:h-[450px] object-cover"
          />

          <div className="px-0 md:px-10 text-center md:mt-0 mt-5 w-full">
            <h4
              className="text-4xl text-primary font-semibold mb-5"
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed="2"
            >
              Briefly{" "}
              <span className="underline decoration-primary">about</span>{" "}
              yourself
            </h4>
            {pageInfo?.summary.map((text: SanityBlock, index: number) => {
              if (text._type !== "block" || !text.children) {
                return "";
              }
              return (
                <p
                  key={index}
                  className="text-base text-textlight dark:text-textdark max-w-3xl break-words"
                  data-scroll
                  data-scroll-direction="horizontal"
                  data-scroll-speed="-1"
                  dangerouslySetInnerHTML={{ __html: text.children[0].text }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default memo(About);
