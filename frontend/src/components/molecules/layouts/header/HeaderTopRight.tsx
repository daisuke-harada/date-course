import { memo, VFC } from "react";
import { GuestLoginButton } from "../../../atoms/button/GuestLoginButton";
import { MenuIconButton } from "../../../atoms/button/MenuIconButton";
import tw from "tailwind-styled-components";

const MenuIconDivParent = tw.div`lg:hidden`;
const MenuIconDivChild = tw.div`sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400`;
const GuestLoginParentDiv = tw.div`lg:block hidden mt-5`;
const Span = tw.div`text-xs`;

type Props = {
  isOpen: boolean,
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>,
}


export const HeaderTopRight: VFC<Props> = memo((props) => {
  const {onClickNavBarSwitch, isOpen} = props;
  return(
    <>
      <MenuIconDivParent>
        <MenuIconDivChild>
          <MenuIconButton onClickNavBarSwitch={onClickNavBarSwitch} isOpen={isOpen} />
        </MenuIconDivChild>
      </MenuIconDivParent>
      <GuestLoginParentDiv>
        <GuestLoginButton>ゲストログイン<Span>(簡単ログイン)</Span></GuestLoginButton>
      </GuestLoginParentDiv>
    </>
  );
});