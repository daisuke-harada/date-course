import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import { headerBottomRoutes } from "../../../router/HeaderBottomRoutes";
import { headerTopLeftRoutes } from "../../../router/HeaderTopLeftRoutes";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";

type Props = {
  isOpen: boolean;
  onClickNavBarSwitch: any;
}
export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen, onClickNavBarSwitch } = props;
  return(
  <div className={`${isOpen? `fixed`: `hidden`} lg:hidden sm:top-24 top-20 text-center border border-red-200 bg-red-200 z-50 w-2/3 right-0`}>
    <ul>
      {headerBottomRoutes.map((route) => <li className="border-b-2 p-2 py-3 hover:bg-red-300" key={route.path} ><Link className="text-black font-bold" to={route.path} onClick={onClickNavBarSwitch} >{route.text}</Link></li>)}
      {headerTopLeftRoutes.map((route) =><li className="p-2 my-3" onClick={onClickNavBarSwitch} key={route.path} ><Link to={route.path} >{route.element}</Link></li>)}
      <li className="p-2 my-3" onClick={onClickNavBarSwitch} ><GuestLoginButton buttonSize={"w-full"}>ゲストログイン</GuestLoginButton></li>
    </ul>
  </div>
  );
});