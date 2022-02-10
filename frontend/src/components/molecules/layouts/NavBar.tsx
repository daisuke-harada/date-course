import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import { headerBottomRoutes } from "../../../router/HeaderBottomRoutes";
import { headerTopLeftRoutes } from "../../../router/HeaderTopLeftRoutes";

type Props = {
  isOpen: boolean
}
export const NavBar: VFC<Props> = memo((props) => {
  const { isOpen } = props;
  return(
  <div className={`${isOpen? `fixed`: `hidden`} lg:hidden sm:top-24 top-20 text-center border border-red-200 bg-red-200 z-50 w-2/3 right-0`}>
    <ul>
      {headerBottomRoutes.map((route) => <li className=" border-b-2 p-2 my-3" key={route.path}><Link className="text-black" to={route.path}>{route.text}</Link></li>)}
      {headerTopLeftRoutes.map((route) =><div className="p-2 my-3" key={route.path}><Link to={route.path} >{route.element}</Link></div>)}
    </ul>
  </div>
  );
});