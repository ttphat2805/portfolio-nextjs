/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
type Props = {};

const Contact = (props: Props) => {
  return (
    <motion.div className="text-center md:text-left">
      <div className="h-[200px]"></div>
      <h3
        className="uppercase tracking-[15px] text-gray-500 text-4xl md:text-6xl text-center "
        data-scroll
        data-scroll-direction="vertical"
        data-scroll-speed="2"
      >
        Contact
      </h3>
      <div className="bg-gradient relative z-[1] flex items-center justify-center pb-32 px-5">
        <div className="bg-[rgba(0,0,0,.377)] border border-white/30 p-6 rounded-lg backdrop-blur-md shadow-lg w-full max-w-lg mt-[270px] text-left">
          <form action="">
            <div className="bg-white rounded-lg px-4 py-2 mb-5">
              <h3 className="text-base text-black font-semibold">
                Please message me about anything if you need to !
              </h3>
            </div>
            <div className="form-group">
              <label htmlFor="">Your name</label> <br />
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="">Your email</label> <br />
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="">Your email subject</label> <br />
              <input type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="">Your message</label>
              <br />
              <textarea className="form-control" cols={20} rows={3}></textarea>
            </div>
            <button
              className="w-full p-2 border rounded-lg text-base bg-primary/80 shadow-md border-white/40 
            outline-none hover:bg-primary hover:border-primary transition-all duration-300"
            >
              Send
            </button>
          </form>
        </div>

        <div className="shape">
          <svg
            data-name="Layer 1"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
