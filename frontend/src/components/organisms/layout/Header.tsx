import { useCallback } from "react";
import {memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { headerBottomRoutes } from "../../../router/HeaderBottomRoutes";

import { BaseButton } from "../../atoms/button/BaseButton";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
import { HamburgerButton } from "../../atoms/button/HamburgerButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { NavBar } from "../../molecules/layouts/NavBar";


export const Header: VFC = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // onClickの型を型推論からを参考に設定した
  const onClickNavBarSwitch: React.MouseEventHandler<HTMLButtonElement> | undefined = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  return(
    <>
      <header className="lg:h-32 sm:h-24 bg-white w-full shadow-xl z-40 fixed">
        <div className="lg:border-b-2 lg:flex-wrap w-full flex  justify-around font-bold">
          <div className="lg:flex hidden mt-5 justify-center">
            <div className="mr-4"><BaseButton>新規登録</BaseButton></div>
            <div className="ml-4"><SecondaryButton>ログイン</SecondaryButton></div>
          </div>
          <div className="lg:mr-20 lg:my-3 lg:mx-0 sm:text-6xl sm:m-3 text-4xl m-5 mx-4">
            <Link to="/" className="text-black">DateCourses</Link>
          </div>
          <div className="lg:hidden ">
            <div className="sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400">
              <HamburgerButton onClickNavBarSwitch={onClickNavBarSwitch} isOpen={isOpen} />
            </div>
          </div>
          <div className="lg:block hidden mt-5">
            <GuestLoginButton>ゲストログイン</GuestLoginButton>
          </div>
        </div>
        <ul className="lg:flex hidden flex-wrap text-base justify-center font-bold">
          {headerBottomRoutes.map((route) => {
            return(<li className="my-3 mx-6"><Link to={route.path}>{route.text}</Link></li>)
          })}
        </ul>
      </header>
      <NavBar isOpen={isOpen}/>
    </>
  );
});