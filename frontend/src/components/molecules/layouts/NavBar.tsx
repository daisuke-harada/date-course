import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import { headerBottomRoutes } from "../../../router/HeaderBottomRoutes";
import { headerTopLeftRoutes } from "../../../router/HeaderTopLeftRoutes";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";

type Props = {
  isOpen: boolean;
  onClickNavBarSwitch: React.MouseEventHandler<HTMLElement> ;
}

export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen, onClickNavBarSwitch } = props;
  return(
    <ul className={`${isOpen? `-translate-y-0`: `-translate-y-96`} lg:hidden sm:top-24 duration-500 fixed top-20 text-center border-r-2 border-b-2 bg-red-100 z-40 w-2/3 right-0`}>
      {headerBottomRoutes.map((route) => <Link className="text-black font-bold" to={route.path} key={route.path} onClick={onClickNavBarSwitch} ><li className="border-b-2 p-2 py-3 hover:bg-red-300 hover:text-black" >{route.text}</li></Link>)}
      {headerTopLeftRoutes.map((route) => <li className="p-2 my-3" onClick={onClickNavBarSwitch} key={route.path} ><Link to={route.path} >{route.element}</Link></li>)}
      <li className="p-2 my-3" onClick={onClickNavBarSwitch} ><GuestLoginButton addClassNames={"w-full"}>ゲストログイン<span className="text-xs">(簡単ログイン)</span></GuestLoginButton></li>
    </ul>
  );
});