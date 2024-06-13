import { memo, FC } from 'react';

import { GuestLoginButton } from 'components/atoms/button/users/GuestLoginButton';
import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import tw from 'tailwind-styled-components';
import { LogOutButton } from 'components/atoms/button/users/LogOutButton';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

type Props = {
  isOpen: boolean,
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>,
}

const MenuIconDivParent = tw.div`lg:hidden`;
const MenuIconDivChild = tw.div`sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400`;
const ButtonParentDiv = tw.div`lg:block hidden mt-5`;

export const HeaderTopRight: FC<Props> = memo((props) => {
  const {onClickNavBarSwitch, isOpen} = props;
  const loginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)

  return(
    <>
      <MenuIconDivParent>
        <MenuIconDivChild>
          <MenuIconButton onClickNavBarSwitch={onClickNavBarSwitch} isOpen={isOpen} />
        </MenuIconDivChild>
      </MenuIconDivParent>
      <ButtonParentDiv>
        { loginStatus ?
         <LogOutButton />:
         <GuestLoginButton />
        }
      </ButtonParentDiv>
    </>
  );
});