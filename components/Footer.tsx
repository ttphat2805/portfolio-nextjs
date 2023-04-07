import { AiFillHeart } from "react-icons/ai";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="dark:bg-dark bg-white md:h-[2rem] flex flex-col justify-center items-center">
      <p className="text-sm px-5 text-textdark dark:text-white flex justify-center items-center">
        Built by Tran Tan Phat | Copyright © 2023 All Rights Reserved{" "}
        <AiFillHeart className="text-red-500" />.
      </p>
    </div>
  );
};

export default Footer;
