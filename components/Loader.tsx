'use client';

const Loader = () => {
  return (
    <div role="status" aria-label="Sending...">
      <span className="w-[30px] h-[30px] rounded-full inline-block border-2 border-[#5cb85c] border-t-white animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
