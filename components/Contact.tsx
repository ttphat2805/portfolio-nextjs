/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IoMdInformationCircle,
  IoMdCheckmarkCircle,
  IoMdAlert,
} from "react-icons/io";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import Loader from "./Loader";
import { EMAILJS } from "../shared/contants";

type Props = {
  theme: boolean;
};

type FormValues = {
  name: string;
  email: string;
  email_subject: string;
  message: string;
};

const Contact = ({ theme }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [checkMark, setCheckMark] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const form = useRef<any | HTMLFormElement>("");
  const checkMarkRef = useRef<any>();

  useEffect(() => {
    if (checkMark) {
      checkMarkRef.current?.classList.add("draw");
    } else {
      checkMarkRef.current?.classList.remove("draw");
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
    setSubmitStatus("idle");

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
                setSubmitStatus("success");
                setTimeout(() => {
                  setCheckMark(false);
                  setSubmitStatus("idle");
                  reset();
                }, 2000);
              }, 1000);
            }
          },
          (error) => {
            console.log(error.text);
            setLoading(false);
            setSubmitStatus("error");
            setTimeout(() => setSubmitStatus("idle"), 3000);
          }
        )
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setSubmitStatus("error");
          setTimeout(() => setSubmitStatus("idle"), 3000);
        });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getInputIcon = (fieldName: string) => {
    const iconClass = theme ? "text-gray-500" : "text-gray-400";
    switch (fieldName) {
      case "name":
        return <FiUser className={iconClass} />;
      case "email":
        return <FiMail className={iconClass} />;
      case "message":
        return <FiMessageSquare className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <motion.div className="text-center md:text-left min-h-screen">
      <div className="h-[200px]"></div>

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl tracking-[20px] uppercase md:text-6xl lg:text-7xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-10"
      >
        Contact
      </motion.h2>

      {/* Background Container with Gradient */}
      <div
        className={`
        ${
          theme
            ? "bg-gradient-to-r from-[#6366f1] to-[#f1f5f9]"
            : "bg-gradient-to-r from-[#6366f1] to-[#1e293b]"
        } 
        overflow-hidden border-none outline-none relative z-[1] flex items-center justify-center pb-32 px-5 min-h-[800px]
      `}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`
            ${
              theme
                ? "bg-white/95 backdrop-blur-xl shadow-2xl text-gray-800"
                : "bg-gray-900/95 backdrop-blur-xl shadow-2xl text-white"
            } 
            w-full max-w-2xl mt-[100px] text-left
            rounded-2xl p-8 transition-all duration-300
            hover:shadow-3xl hover:scale-[1.02] border
            ${theme ? "border-gray-200/50" : "border-gray-700/50"}
          `}
        >
          <form
            ref={form}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Info Banner */}
            <motion.div
              variants={itemVariants}
              className={`
                ${
                  theme
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : "bg-blue-900/30 text-blue-200 border-blue-700/50"
                }
                rounded-xl px-6 py-4 border-l-4 border-blue-500 flex items-start space-x-3
                transition-all duration-300 hover:scale-[1.01]
              `}
            >
              <IoMdInformationCircle className="text-2xl mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg mb-1">Let's Connect!</h4>
                <p className="text-sm opacity-90">
                  I'd love to hear from you. Send me a message about anything!
                </p>
              </div>
            </motion.div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <motion.div variants={itemVariants} className="form-group">
                <label
                  className={`block font-semibold text-sm mb-2 ${
                    theme ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Your Name *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {getInputIcon("name")}
                  </div>
                  <input
                    type="text"
                    className={`
                      w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300
                      ${
                        theme
                          ? "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          : "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      }
                      ${
                        errors.name
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : ""
                      }
                      backdrop-blur-sm focus:outline-none
                    `}
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your full name"
                    name="name"
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <IoMdAlert className="text-xs" />
                      <span>{errors.name.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants} className="form-group">
                <label
                  className={`block font-semibold text-sm mb-2 ${
                    theme ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  Your Email *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {getInputIcon("email")}
                  </div>
                  <input
                    type="email"
                    className={`
                      w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300
                      ${
                        theme
                          ? "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          : "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      }
                      ${
                        errors.email
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : ""
                      }
                      backdrop-blur-sm focus:outline-none
                    `}
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Please enter a valid email address",
                      },
                      required: "Email is required",
                    })}
                    placeholder="your.email@example.com"
                    name="email"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <IoMdAlert className="text-xs" />
                      <span>{errors.email.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Subject Field */}
            <motion.div variants={itemVariants} className="form-group">
              <label
                className={`block font-semibold text-sm mb-2 ${
                  theme ? "text-gray-700" : "text-gray-200"
                }`}
              >
                Subject *
              </label>
              <input
                type="text"
                className={`
                  w-full px-4 py-3 rounded-lg border transition-all duration-300
                  ${
                    theme
                      ? "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      : "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }
                  ${
                    errors.email_subject
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : ""
                  }
                  backdrop-blur-sm focus:outline-none
                `}
                aria-invalid={errors.email_subject ? "true" : "false"}
                {...register("email_subject", {
                  required: "Subject is required",
                })}
                placeholder="What's this about?"
                name="email_subject"
              />
              <AnimatePresence>
                {errors.email_subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                  >
                    <IoMdAlert className="text-xs" />
                    <span>{errors.email_subject.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants} className="form-group">
              <label
                className={`block font-semibold text-sm mb-2 ${
                  theme ? "text-gray-700" : "text-gray-200"
                }`}
              >
                Your Message *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3">
                  {getInputIcon("message")}
                </div>
                <textarea
                  className={`
                    w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 resize-none
                    ${
                      theme
                        ? "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        : "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    }
                    ${
                      errors.message
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : ""
                    }
                    backdrop-blur-sm focus:outline-none
                  `}
                  aria-invalid={errors.message ? "true" : "false"}
                  {...register("message", { required: "Message is required" })}
                  rows={5}
                  name="message"
                  placeholder="Tell me about your project, question, or just say hello..."
                />
              </div>
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                  >
                    <IoMdAlert className="text-xs" />
                    <span>{errors.message.message}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative w-full py-4 px-6 rounded-lg text-base font-semibold text-white
                  transition-all duration-300 outline-none overflow-hidden
                  ${
                    loading || checkMark
                      ? "bg-gray-500 cursor-not-allowed"
                      : submitStatus === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : submitStatus === "error"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  }
                  shadow-lg hover:shadow-xl
                  ${checkMark && "h-[56px]"}
                `}
                disabled={loading || checkMark}
                type="submit"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Loader />
                      <span>Sending...</span>
                    </motion.div>
                  ) : checkMark ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center justify-center"
                    >
                      <IoMdCheckmarkCircle className="text-2xl" />
                    </motion.div>
                  ) : submitStatus === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <IoMdAlert />
                      <span>Try Again</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <FiSend />
                      <span>Send Message</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <span
                  ref={checkMarkRef}
                  className="checkmark relative m-auto invisible"
                />
              </motion.button>
            </motion.div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`${
                    theme
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-green-900/30 border-green-700/50 text-green-200"
                  } rounded-lg p-4 flex items-center space-x-3 border`}
                >
                  <IoMdCheckmarkCircle className="text-xl flex-shrink-0" />
                  <span>
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`${
                    theme
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-red-900/30 border-red-700/50 text-red-200"
                  } rounded-lg p-4 flex items-center space-x-3 border`}
                >
                  <IoMdAlert className="text-xl flex-shrink-0" />
                  <span>Failed to send message. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Wave Background */}
        <div className="absolute top-[-5px] left-0 w-full z-[-1] overflow-hidden leading-0 border-none outline-none">
          <motion.svg
            className="relative block w-[calc(205% + 1.3px)] h-[300px]"
            data-name="Layer 1"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            animate={{ x: [-50, 0, -50] }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <defs>
              {/* Dark mode gradient */}
              <linearGradient
                id="gradient-dark"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Light mode gradient */}
              <linearGradient
                id="gradient-light"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>

            <motion.path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill={theme ? "url(#gradient-light)" : "url(#gradient-dark)"}
              animate={{ opacity: [0.25, 0.35, 0.25] }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />

            <motion.path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill={theme ? "#f1f5f9" : "#1e293b"}
              animate={{ opacity: [0.5, 0.6, 0.5] }}
              transition={{
                duration: 12,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 2,
              }}
            />

            <motion.path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill={theme ? "#e2e8f0" : "#0f172a"}
              animate={{ opacity: [1, 0.9, 1] }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 4,
              }}
            />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Contact);
