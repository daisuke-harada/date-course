import { memo, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { loginStatusState } from 'store/session';

import { GuestLoginButton } from 'components/atoms/button/users/GuestLoginButton';
import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import tw from 'tailwind-styled-components';
import { LogOutButton } from 'components/atoms/button/users/LogOutButton';

const MenuIconDivParent = tw.div`lg:hidden`;
const MenuIconDivChild = tw.div`sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400`;
const ButtonParentDiv = tw.div`lg:block hidden mt-5`;

type Props = {
  isOpen: boolean,
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>,
}


export const HeaderTopRight: VFC<Props> = memo((props) => {
  const {onClickNavBarSwitch, isOpen} = props;
  const getLoginStatus = useRecoilValue(loginStatusState);
  return(
    <>
      <MenuIconDivParent>
        <MenuIconDivChild>
          <MenuIconButton onClickNavBarSwitch={onClickNavBarSwitch} isOpen={isOpen} />
        </MenuIconDivChild>
      </MenuIconDivParent>
      <ButtonParentDiv>
        { getLoginStatus.status === true?
         <LogOutButton />:
         <GuestLoginButton />
        }
      </ButtonParentDiv>
    </>
  );
});