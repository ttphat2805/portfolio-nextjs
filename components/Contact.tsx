/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
type Props = {};

const Contact = (props: Props) => {
  return (
    <motion.div className="flex relative flex-col h-screen text-center md:text-left px-10 justify-evenly mx-auto">
      <h3
        className="top-10 uppercase tracking-[15px] text-gray-500 text-4xl md:text-6xl text-center "
        data-scroll
        data-scroll-direction="vertical"
        data-scroll-speed="2"
      >
        Contact
      </h3>
      <div className="flex items-center justify-center my-10 ">
        <div className="bg-[rgba(0,0,0,.5)] p-5 rounded-lg backdrop-blur-md shadow-md">
          <form action="">
            <div>Please message me about anything if you need to</div>
            <div className="form-group">
              <label htmlFor="">Your name</label> <br />
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="">Your name</label> <br />
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="">Your name</label> <br />
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="">Your name</label> <br />
              <input type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="">Your name</label>
              <br />
              <textarea name="" id="" cols={20} rows={3}></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
