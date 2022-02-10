import { memo, VFC } from "react";

type Props = {
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>;
  isOpen: boolean;
};

export const HamburgerButton: VFC<Props> = memo((props) => {
  const { onClickNavBarSwitch, isOpen } = props;

  return(
    <>
      {isOpen?
        (<button id="slide-up-btn" onClick={onClickNavBarSwitch} className="sm:top-2 sm:right-3 hover:text-red-500 text-7xl text-red-400 fixed top-0 right-1 h-10 w-14 block ml-4">
          ×
        </button>
        ):
        (<button id="slide-down-btn" onClick={onClickNavBarSwitch} className="sm:top-7 fixed top-6 right-3 h-10 w-14 block ml-4">
          <div className="absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-0 right-0"></div>
          <div className="absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-4 right-0"></div>
          <div className="absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-8 right-0"></div>
        </button>)
      }
    </>
  );
});