/* eslint-disable @next/next/no-img-element */
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdInformationCircle } from "react-icons/io";
import { EMAILJS } from "../shared/contants";
import Loader from "./Loader";
type Props = {};

type FormValues = {
  name: string;
  email: string;
  email_subject: string;
  message: string;
};

const Contact = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [checkMark, setCheckMark] = useState<boolean>(false);
  const form = useRef<string | HTMLFormElement>("");
  const checkMarkRef = useRef<any>();

  useEffect(() => {
    if (checkMark) {
      checkMarkRef.current.classList.add("draw");
    } else {
      checkMarkRef.current.classList.remove("draw");
    }
  }, [checkMark]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);

    if (Object.keys(errors).length === 0) {
      emailjs
        .sendForm(
          EMAILJS.SERVICE_ID!,
          EMAILJS.TEMPLATE_ID!,
          form.current,
          EMAILJS.PUBLIC_KEY
        )
        .then(
          (result) => {
            if (result.text === "OK") {
              setTimeout(() => {
                setCheckMark(true);
                setLoading(false);
                setTimeout(() => {
                  setCheckMark(false);
                  reset();
                }, 1000);
              }, 1000);
            }
          },
          (error) => {
            console.log(error.text);
          }
        )
        .catch((err) => console.log(err));
    }
  };

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
        <div className="bg-[rgba(0,0,0,.377)] border border-white/30 p-6 rounded-lg backdrop-blur-lg shadow-lg w-full max-w-lg mt-[270px] text-left">
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white text-blue-500 rounded-lg px-4 py-2 mb-5 border-l-4 border-primary flex items-center">
              <IoMdInformationCircle className="mr-2 text-xl" />
              <h3 className="text-base text-black font-semibold">
                Please message me about anything if you need to !
              </h3>
            </div>
            <div className="form-group">
              <label className="font-semibold" htmlFor="">
                Your name
              </label>
              <br />
              <input
                type="text"
                className={`form-control ${
                  errors.name ? "border-red-500" : ""
                }`}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name", { required: true })}
                placeholder="Enter your name"
                name="name"
              />
              <p className="text-red-500">
                {errors.name && "Name is required"}
              </p>
            </div>
            <div className="form-group">
              <label className="font-semibold" htmlFor="">
                Your email
              </label>
              <br />
              <input
                type="text"
                className={`form-control ${
                  errors.email ? "border-red-500" : ""
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  required: true,
                })}
                placeholder="Enter your email"
                name="email"
              />
              <p className="text-red-500">
                {errors.email && "Email must be in the correct format"}
              </p>
            </div>
            <div className="form-group">
              <label className="font-semibold" htmlFor="">
                Your email subject
              </label>
              <br />
              <input
                type="text"
                className={`form-control ${
                  errors.email_subject ? "border-red-500" : ""
                }`}
                aria-invalid={errors.email_subject ? "true" : "false"}
                {...register("email_subject", { required: true })}
                placeholder="Enter your email subject"
                name="email_subject"
              />
              <p className="text-red-500">
                {errors.email_subject && "Email subject is required"}
              </p>
            </div>

            <div className="form-group">
              <label className="font-semibold" htmlFor="">
                Your message
              </label>
              <br />
              <textarea
                className={`form-control ${
                  errors.message ? "border-red-500" : ""
                }`}
                aria-invalid={errors.message ? "true" : "false"}
                {...register("message", { required: true })}
                cols={20}
                rows={3}
                name="message"
                placeholder="Enter your message"
              ></textarea>
              <p className="text-red-500 -mt-2">
                {errors.message && "Message is required"}
              </p>
            </div>

            <button
              className={`relative w-full p-2 mt-5 border rounded-lg text-base bg-primary/80 shadow-md border-white/40 
            outline-none hover:bg-primary hover:border-primary transition-all duration-300 ${
              checkMark && "h-[40px]"
            }`}
              disabled={loading}
            >
              {loading ? <Loader /> : !checkMark ? "Send" : ""}
              <div
                ref={checkMarkRef}
                className="checkmark relative m-auto invisible"
              ></div>
            </button>
          </form>
        </div>

        <div className="absolute top-0 left-0 w-full z-[-1] overflow-hidden leading-0">
          <svg
            className="relative block w-[calc(205% + 1.3px)] h-[300px]"
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
