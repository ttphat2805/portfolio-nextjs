'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';
import { urlFor } from '../sanity';

type Props = {
  pageInfo: PageInfo;
};

const About = ({ pageInfo }: Props) => {
  return (
    <section aria-labelledby="about-heading">
      <motion.div
        className="flex flex-col relative min-h-screen text-center md:text-left max-w-7xl px-10 justify-evenly mx-auto py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl tracking-[20px] uppercase md:text-6xl lg:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-10"
        >
          About
        </motion.h2>

        <div className="flex md:flex-row flex-col items-center w-full gap-8">
          {/* Profile photo — lazy loaded, WebP/AVIF via next/image */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.3 }}
            viewport={{ once: true }}
            className="flex-shrink-0 relative w-56 h-56 rounded-full md:rounded-lg md:w-64 md:h-96 xl:w-[450px] xl:h-[450px] overflow-hidden"
          >
          {pageInfo.backgroundAvatar && (
            <Image
              src={urlFor(pageInfo.backgroundAvatar).width(450).height(450).url()}
              alt={`${pageInfo.name ?? 'Phat Tran'} profile photo`}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 224px, (max-width: 1280px) 256px, 450px"
            />
          )}
          </motion.div>

          <div className="px-0 md:px-10 text-center md:mt-0 mt-5 w-full">
            <h3 className="text-4xl text-primary font-semibold mb-5">
              Briefly <span className="underline decoration-primary">about</span> yourself
            </h3>

            {pageInfo?.summary.map((text: SanityBlock, index: number) => {
              if (text._type !== 'block' || !text.children) return null;
              return (
                <p
                  key={index}
                  className="text-base text-textlight dark:text-textdark max-w-3xl break-words leading-relaxed mb-3"
                  // ⚠️ dangerouslySetInnerHTML safe here — content comes from your own Sanity CMS
                  dangerouslySetInnerHTML={{ __html: text.children[0].text }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(About);
