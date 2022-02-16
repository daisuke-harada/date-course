import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";
import tw from "tailwind-styled-components";

import { headerBottomRoutes } from "router/HeaderBottomRoutes";
import { headerTopLeftRoutes } from "router/HeaderTopLeftRoutes";
import { GuestLoginButton } from "components/atoms/button/GuestLoginButton";
import { LogOutButton } from "components/atoms/button/LogOutButton";

type Props = {
  isOpen: boolean;
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement> ;
}

const Ul = tw.ul`lg:hidden duration-500 fixed top-20 text-center border-b-2 border-red-100 rounded-b-lg bg-red-100 z-40 shadow-xl w-2/3 right-0`;
const IndexList = tw.li`px-2 py-4 text-black font-bold hover:bg-red-300 hover:text-black`;
const ButtonList = tw.li`p-2 mt-3`;
const Span = tw.span`text-xs`;

export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen, onClickNavBarSwitch } = props;
  const getLoginStatus = useRecoilValue(loginStatusState);
  return(
    <Ul className={`${isOpen? `-translate-y-0`: `-translate-y-full`} `}>
      {headerBottomRoutes.map((route) => <Link to={route.path} key={route.path} onClick={onClickNavBarSwitch} ><IndexList>{route.text}</IndexList></Link>)}
      {headerTopLeftRoutes.map((route) => <ButtonList onClick={onClickNavBarSwitch} key={route.path} ><Link to={route.path} >{route.element}</Link></ButtonList>)}
      <ButtonList onClick={onClickNavBarSwitch} >
      { getLoginStatus.status?
        <LogOutButton />:
        <GuestLoginButton>ゲストログイン<Span>(簡単ログイン)</Span></GuestLoginButton>
      }
      </ButtonList>
    </Ul>
  );
});