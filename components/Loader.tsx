import { ForwardedRef, forwardRef } from "react";
type Props = {};
const Loader = (props: Props, ref: ForwardedRef<any>) => {
  return (
    <div>
      <span className="w-[30px] h-[30px] rounded-full inline-block border-3 border-[#5cb85c] border-t-2 border-t-white border-r-3 border-r-transparent animate-spin"></span>
    </div>
  );
};

export default forwardRef(Loader);
