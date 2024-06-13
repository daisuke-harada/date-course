import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { HeaderBottomRoutes } from 'router/HeaderBottomRoutes';
import { HeaderTopLeftRoutes } from 'router/HeaderTopLeftRoutes';
import { GuestLoginButton } from 'components/atoms/button/users/GuestLoginButton';
import { LogOutButton } from 'components/atoms/button/users/LogOutButton';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

type Props = {
  isOpen: boolean;
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement>;
}

const Ul = tw.ul`lg:hidden backdrop-opacity-55 fixed top-20 md:top-24 text-center border rounded-b-lg bg-white z-40 w-2/3 right-0`;
const IndexList = tw.li`px-4 py-4 text-black font-bold hover:bg-red-300 hover:text-black`;
const ButtonList = tw.li`p-2 mt-3`;

export const NavBar: FC<Props> = memo((props) => {
  const { isOpen, onClickNavBarSwitch } = props;
  const loginStatus = useSelector<RootState, boolean>(state => state.session.loginStatus)

  return (
    <Ul className={`${isOpen ? `display` : `hidden`} `}>
      {HeaderBottomRoutes().map((route) => (
        <Link to={route.path} key={route.path} onClick={onClickNavBarSwitch}>
          <IndexList data-e2e={route.dataE2e}>{route.text}</IndexList>
        </Link>
      ))}
      {HeaderTopLeftRoutes().map((route) => (
        <ButtonList onClick={onClickNavBarSwitch} key={route.path}>
          <Link to={route.path}>{route.element}</Link>
        </ButtonList>
      ))}
      <ButtonList onClick={onClickNavBarSwitch}>
        {loginStatus ? <LogOutButton /> : <GuestLoginButton />}
      </ButtonList>
    </Ul>
  );
});
