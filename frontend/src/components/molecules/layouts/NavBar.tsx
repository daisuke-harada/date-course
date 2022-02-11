import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { headerBottomRoutes } from "../../../router/HeaderBottomRoutes";
import { headerTopLeftRoutes } from "../../../router/HeaderTopLeftRoutes";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";

type Props = {
  isOpen: boolean;
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement> ;
}

const Ul = tw.ul`lg:hidden sm:top-24 duration-500 fixed top-20 text-center border-r-2 border-b-2 bg-red-100 z-40 w-2/3 right-0`;
const IndexList = tw.li`border-b-2 p-2 py-3 text-black font-bold hover:bg-red-300 hover:text-black`;
const ButtonList = tw.li`p-2 my-3`;
const Span = tw.span`text-xs`;

export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen, onClickNavBarSwitch } = props;
  return(
    <Ul className={`${isOpen? `-translate-y-0`: `-translate-y-96`} `}>
      {headerBottomRoutes.map((route) => <Link to={route.path} key={route.path} onClick={onClickNavBarSwitch} ><IndexList>{route.text}</IndexList></Link>)}
      {headerTopLeftRoutes.map((route) => <ButtonList onClick={onClickNavBarSwitch} key={route.path} ><Link to={route.path} >{route.element}</Link></ButtonList>)}
      <ButtonList onClick={onClickNavBarSwitch} ><GuestLoginButton>ゲストログイン<Span>(簡単ログイン)</Span></GuestLoginButton></ButtonList>
    </Ul>
  );
});