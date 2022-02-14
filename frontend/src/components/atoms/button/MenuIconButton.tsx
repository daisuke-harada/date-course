import { memo, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>;
  isOpen: boolean;
};

const SlideUpBtn = tw.button`sm:top-2 sm:right-3 hover:text-red-500 text-7xl text-red-400 fixed top-0 right-1 h-10 w-14 block ml-4`;
const SlideDownBtn = tw.button`sm:top-7 fixed top-6 right-3 h-10 w-14 block ml-4`;
const TopBorder = tw.div`absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-0 right-0`;
const CenterBorder = tw.div`absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-4 right-0`;
const BottomBorder = tw.div`absolute sm:w-14 w-10 border-red-400 border-t-4 inline-block top-8 right-0`;

export const MenuIconButton: VFC<Props> = memo((props) => {
  const { onClickNavBarSwitch, isOpen } = props;
  return(
    <>
      {isOpen?
        (
          <SlideUpBtn onClick={onClickNavBarSwitch}>×</SlideUpBtn>
        ):
        (
          <SlideDownBtn onClick={onClickNavBarSwitch} >
            <TopBorder />
            <CenterBorder />
            <BottomBorder />
          </SlideDownBtn>
        )
      }
    </>
  );
});