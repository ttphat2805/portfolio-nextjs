import { AiFillHeart } from "react-icons/ai";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="dark:bg-dark bg-white md:h-[2rem] flex flex-col justify-center items-center text-center py-2">
      <p className="text-sm px-5 text-black dark:text-white">
        Coded with love by Tran Tan Phat
        <AiFillHeart className="ml-1 text-red-500 inline" />.
      </p>
    </div>
  );
};

export default Footer;
