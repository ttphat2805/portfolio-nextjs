'use client';

import { AiFillHeart } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="dark:bg-dark bg-white border-t border-gray-100 dark:border-gray-800/50 flex flex-col justify-center items-center text-center py-4">
      <p className="text-sm px-5 text-black dark:text-white">
        Coded with love by Tran Tan Phat{' '}
        <AiFillHeart
          className="ml-1 text-red-500 inline"
          aria-label="love"
        />
        .
      </p>
    </div>
  );
};

export default Footer;
