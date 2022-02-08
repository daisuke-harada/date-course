import { memo, VFC } from "react";

export const HamburgerButton: VFC = memo((props) => {
  return(
    <div className="sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400">
      <button className="sm:top-7 fixed top-6 right-3 h-10 w-14 block ml-4">
        <div className="absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-0 right-0"></div>
        <div className="absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-4 right-0"></div>
        <div className="absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-8 right-0"></div>
      </button>
    </div>
  );
});