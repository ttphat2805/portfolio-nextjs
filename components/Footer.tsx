import React from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

type Props = {};

const Footer = (props: Props) => {
  const { scroll } = useLocomotiveScroll();

  const hanleScroll = () => {
    scroll.scrollTo("#hero");
  };
  return (
    <div
      className="bg-bgmain py-2 pb-5 flex flex-col justify-center items-center text-white"
      onClick={hanleScroll}
    >
      <p>Built by Tran Tan Phat | Copyright © 2023 All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
