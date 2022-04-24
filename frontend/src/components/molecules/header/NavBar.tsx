import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginStatusState } from 'store/session';
import tw from 'tailwind-styled-components';

import { HeaderBottomRoutes } from 'router/HeaderBottomRoutes';
import { HeaderTopLeftRoutes } from 'router/HeaderTopLeftRoutes';
import { GuestLoginButton } from 'components/atoms/button/users/GuestLoginButton';
import { LogOutButton } from 'components/atoms/button/users/LogOutButton';

type Props = {
  isOpen: boolean;
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement> ;
}

const Ul = tw.ul`lg:hidden duration-500 fixed top-20 text-center border-b-2 border-red-100 rounded-b-lg bg-red-100 z-40 shadow-xl w-2/3 right-0`;
const IndexList = tw.li`px-2 py-4 text-black font-bold hover:bg-red-300 hover:text-black`;
const ButtonList = tw.li`p-2 mt-3`;

export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen, onClickNavBarSwitch } = props;
  const getLoginStatus = useRecoilValue(loginStatusState);
  return(
    <Ul className={`${isOpen? `-translate-y-0`: `-translate-y-full`} `}>
      {HeaderBottomRoutes().map((route) => <Link to={route.path} key={route.path} onClick={onClickNavBarSwitch} ><IndexList data-e2e={route.dataE2e}>{route.text}</IndexList></Link>)}
      {HeaderTopLeftRoutes().map((route) => <ButtonList onClick={onClickNavBarSwitch} key={route.path} ><Link to={route.path} >{route.element}</Link></ButtonList>)}
      <ButtonList onClick={onClickNavBarSwitch} >
      { getLoginStatus.status?
        <LogOutButton />:
        <GuestLoginButton />
      }
      </ButtonList>
    </Ul>
  );
});