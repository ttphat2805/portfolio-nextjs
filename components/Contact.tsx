'use client';

/* eslint-disable react/no-unescaped-entities */
import emailjs from "@emailjs/browser";
import { m, AnimatePresence } from "framer-motion";
import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdCheckmarkCircle, IoMdAlert } from "react-icons/io";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { fadeInUp, staggerContainer } from "../shared/motionVariants";
import Loader from "./Loader";
import SectionHeading from "./SectionHeading";
import { EMAILJS } from "../shared/contants";

type Props = {
  pageInfo?: PageInfo;
};

type FormValues = {
  name: string;
  email: string;
  email_subject: string;
  message: string;
};

// Theme handled by dark: variants — no JS branching needed
const inputClass = (hasError: boolean) => `
  w-full py-3 rounded-xl border transition-all duration-300 backdrop-blur-sm focus:outline-none
  bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500
  dark:bg-gray-800/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
  focus:border-primary focus:ring-2 focus:ring-primary/20
  ${hasError ? "border-red-500 ring-2 ring-red-500/20" : ""}
`;

const labelClass =
  "block font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200";

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <m.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
      role="alert"
    >
      <IoMdAlert className="text-xs" aria-hidden="true" />
      <span>{message}</span>
    </m.p>
  ) : null;

const InfoRow = ({ icon, href, children }: { icon: ReactNode; href?: string; children: ReactNode }) => {
  const content = (
    <>
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm">
        {icon}
      </span>
      <span className="group-hover:underline underline-offset-4">{children}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-3">{content}</div>
      )}
    </li>
  );
};

const Contact = ({ pageInfo }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [checkMark, setCheckMark] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const form = useRef<HTMLFormElement>(null);
  const checkMarkRef = useRef<HTMLSpanElement>(null);

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

  const onSubmit: SubmitHandler<FormValues> = () => {
    setLoading(true);
    setSubmitStatus("idle");

    emailjs
      .sendForm(
        EMAILJS.SERVICE_ID!,
        EMAILJS.TEMPLATE_ID!,
        form.current!,
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
  };

  return (
    <div className="relative min-h-screen py-28 overflow-hidden">
      {/* Ambient gradient blobs */}
      <div
        className="absolute -top-20 right-0 w-[420px] h-[420px] rounded-full bg-secondary/15 dark:bg-secondary/10 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-32 w-[380px] h-[380px] rounded-full bg-primary/15 dark:bg-primary/10 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <SectionHeading id="contact-heading" eyebrow="Get in touch" title="Contact" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
          {/* Info panel */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative rounded-3xl p-8 text-left
              bg-gradient-to-br from-primary to-secondary text-white
              shadow-xl shadow-primary/25 overflow-hidden"
          >
            {/* Subtle texture ring */}
            <div
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full border-[20px] border-white/10"
              aria-hidden="true"
            />

            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Let's work together
            </h3>
            <p className="text-white/85 leading-relaxed mb-8">
              I'd love to hear from you — a project, a question, or just to say
              hello. I usually reply within a day.
            </p>

            <ul className="space-y-4 list-none p-0">
              {pageInfo?.email && (
                <InfoRow icon={<FiMail aria-hidden="true" />} href={`mailto:${pageInfo.email}`}>
                  {pageInfo.email}
                </InfoRow>
              )}
              {pageInfo?.phoneNumber && (
                <InfoRow icon={<FiPhone aria-hidden="true" />} href={`tel:${pageInfo.phoneNumber}`}>
                  {pageInfo.phoneNumber}
                </InfoRow>
              )}
              {pageInfo?.address && (
                <InfoRow icon={<FiMapPin aria-hidden="true" />}>{pageInfo.address}</InfoRow>
              )}
            </ul>
          </m.div>

          {/* Form card */}
          <m.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full text-left rounded-3xl p-8 md:p-10
              bg-white/70 text-gray-800 border border-gray-200/70
              dark:bg-white/5 dark:text-white dark:border-white/10
              backdrop-blur-md shadow-xl shadow-primary/5"
          >
            {/* Gradient top edge accent */}
            <div
              className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              aria-hidden="true"
            />

            <form
              ref={form}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <m.div variants={fadeInUp} className="form-group">
                  <label htmlFor="contact-name" className={labelClass}>
                    Your Name *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                      <FiUser className="text-primary text-xl flex-shrink-0" aria-hidden="true" />
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      className={`pl-10 pr-4 ${inputClass(!!errors.name)}`}
                      aria-invalid={errors.name ? "true" : "false"}
                      autoComplete="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your full name"
                      name="name"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && <FieldError message={errors.name.message} />}
                  </AnimatePresence>
                </m.div>

                {/* Email Field */}
                <m.div variants={fadeInUp} className="form-group">
                  <label htmlFor="contact-email" className={labelClass}>
                    Your Email *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                      <FiMail className="text-primary text-xl flex-shrink-0" aria-hidden="true" />
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      className={`pl-10 pr-4 ${inputClass(!!errors.email)}`}
                      aria-invalid={errors.email ? "true" : "false"}
                      autoComplete="email"
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
                    {errors.email && <FieldError message={errors.email.message} />}
                  </AnimatePresence>
                </m.div>
              </div>

              {/* Subject Field */}
              <m.div variants={fadeInUp} className="form-group">
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  className={`px-4 ${inputClass(!!errors.email_subject)}`}
                  aria-invalid={errors.email_subject ? "true" : "false"}
                  {...register("email_subject", {
                    required: "Subject is required",
                  })}
                  placeholder="What's this about?"
                  name="email_subject"
                />
                <AnimatePresence>
                  {errors.email_subject && (
                    <FieldError message={errors.email_subject.message} />
                  )}
                </AnimatePresence>
              </m.div>

              {/* Message Field */}
              <m.div variants={fadeInUp} className="form-group">
                <label htmlFor="contact-message" className={labelClass}>
                  Your Message *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 z-10 pointer-events-none">
                    <FiMessageSquare className="text-primary text-xl flex-shrink-0" aria-hidden="true" />
                  </div>
                  <textarea
                    id="contact-message"
                    className={`pl-10 pr-4 resize-none ${inputClass(!!errors.message)}`}
                    aria-invalid={errors.message ? "true" : "false"}
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    name="message"
                    placeholder="Tell me about your project, question, or just say hello..."
                  />
                </div>
                <AnimatePresence>
                  {errors.message && <FieldError message={errors.message.message} />}
                </AnimatePresence>
              </m.div>

              {/* Submit Button */}
              <m.div variants={fadeInUp}>
                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative w-full py-4 px-6 rounded-xl text-base font-semibold text-white
                    transition-all duration-300 outline-none overflow-hidden
                    ${
                      loading || checkMark
                        ? "bg-gray-500 cursor-not-allowed"
                        : submitStatus === "success"
                        ? "bg-green-600 hover:bg-green-700"
                        : submitStatus === "error"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                    }
                    ${checkMark && "h-[56px]"}
                  `}
                  disabled={loading || checkMark}
                  type="submit"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <m.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <Loader />
                        <span>Sending...</span>
                      </m.div>
                    ) : checkMark ? (
                      <m.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center justify-center"
                      >
                        <IoMdCheckmarkCircle className="text-2xl" aria-hidden="true" />
                      </m.div>
                    ) : submitStatus === "error" ? (
                      <m.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <IoMdAlert aria-hidden="true" />
                        <span>Try Again</span>
                      </m.div>
                    ) : (
                      <m.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <FiSend aria-hidden="true" />
                        <span>Send Message</span>
                      </m.div>
                    )}
                  </AnimatePresence>

                  <span
                    ref={checkMarkRef}
                    className="checkmark relative m-auto invisible"
                  />
                </m.button>
              </m.div>

              {/* Status Messages — aria-live so screen readers announce them */}
              <div aria-live="polite">
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <m.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="rounded-xl p-4 flex items-center space-x-3 border
                        bg-green-50 border-green-200 text-green-800
                        dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-200"
                    >
                      <IoMdCheckmarkCircle className="text-xl flex-shrink-0" aria-hidden="true" />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </m.div>
                  )}
                  {submitStatus === "error" && (
                    <m.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="rounded-xl p-4 flex items-center space-x-3 border
                        bg-red-50 border-red-200 text-red-800
                        dark:bg-red-900/30 dark:border-red-700/50 dark:text-red-200"
                    >
                      <IoMdAlert className="text-xl flex-shrink-0" aria-hidden="true" />
                      <span>Failed to send message. Please try again.</span>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
