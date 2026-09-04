'use client';

type Props = {
  /** Tailwind sizing for the spinner ring — override to fit inside buttons. */
  className?: string;
  label?: string;
};

const Loader = ({ className = 'w-[30px] h-[30px]', label = 'Loading...' }: Props) => {
  return (
    <div role="status" aria-label={label}>
      <span
        className={`rounded-full inline-block border-2 border-[#5cb85c] border-t-white animate-spin ${className}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Loader;
