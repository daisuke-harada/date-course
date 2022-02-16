import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";

import { GuestLoginButton } from "components/atoms/button/GuestLoginButton";
import { MenuIconButton } from "components/atoms/button/MenuIconButton";
import tw from "tailwind-styled-components";
import { LogOutButton } from "components/atoms/button/LogOutButton";

const MenuIconDivParent = tw.div`lg:hidden`;
const MenuIconDivChild = tw.div`sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400`;
const ButtonParentDiv = tw.div`lg:block hidden mt-5`;
const Span = tw.div`text-xs`;

type Props = {
  isOpen: boolean,
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>,
}


export const HeaderTopRight: VFC<Props> = memo((props) => {
  const {onClickNavBarSwitch, isOpen} = props;
  const loginStatus = useRecoilValue(loginStatusState);
  return(
    <>
      <MenuIconDivParent>
        <MenuIconDivChild>
          <MenuIconButton onClickNavBarSwitch={onClickNavBarSwitch} isOpen={isOpen} />
        </MenuIconDivChild>
      </MenuIconDivParent>
      <ButtonParentDiv>
        { loginStatus.status?
         <LogOutButton />:
         <GuestLoginButton>ゲストログイン<Span>(簡単ログイン)</Span></GuestLoginButton>
          }
      </ButtonParentDiv>
    </>
  );
});