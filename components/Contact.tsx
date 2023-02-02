/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
type Props = {};

const Contact = (props: Props) => {
  return (
    <motion.div className="flex relative flex-col h-screen text-center md:text-left px-10 justify-evenly mx-auto">
      <h3 className="top-10 uppercase tracking-[15px] text-gray-500 text-4xl md:text-6xl text-center ">
        Contact
      </h3>
    </motion.div>
  );
};

export default Contact;
