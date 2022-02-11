import { useCallback } from "react";
import {memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { headerBottomRoutes } from "../../../router/HeaderBottomRoutes";
import { headerTopLeftRoutes } from "../../../router/HeaderTopLeftRoutes";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { NavBar } from "../../molecules/layouts/NavBar";

const MainHeader = tw.header`lg:h-32 sm:h-24 bg-white w-full shadow-xl z-50 fixed`;
const TopDiv = tw.div`lg:border-b-2 lg:flex-wrap w-full flex  justify-around font-bold`;
const TopLeftDiv = tw.div`lg:flex hidden mt-5 justify-center`;
const TopLeftDivChild = tw.div`mx-2`;
const TitleDiv = tw.div`lg:my-3 lg:mx-0 sm:text-6xl sm:m-3 text-4xl m-5 mx-4`;
const MenuIconDivParent = tw.div`lg:hidden`;
const BottomUl = tw.ul`lg:flex hidden flex-wrap text-base justify-center font-bold`;


export const Header: VFC = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // onClickの型を型推論からを参考に設定した
  const onClickNavBarSwitch: React.MouseEventHandler<HTMLElement> = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  return(
    <>
      <MainHeader>
        <TopDiv>
          <TopLeftDiv>
            {headerTopLeftRoutes.map((route) =><TopLeftDivChild className="" key={route.path}><Link to={route.path} >{route.element}</Link></TopLeftDivChild>)}
          </TopLeftDiv>
          <TitleDiv>
            <Link to="/" className="text-black">DateCourses</Link>
          </TitleDiv>
          <MenuIconDivParent>
            <div className="sm:h-24 sm:right-7 right-2 fixed  border-l-2 w-14 h-20 border-red-400">
              <MenuIconButton onClickNavBarSwitch={onClickNavBarSwitch} isOpen={isOpen} />
            </div>
          </MenuIconDivParent>
          <div className="lg:block hidden mt-5">
            <GuestLoginButton>ゲストログイン<span className="text-xs">(簡単ログイン)</span></GuestLoginButton>
          </div>
        </TopDiv>
        <BottomUl>
          {headerBottomRoutes.map((route) => <li className="my-3 mx-6 " key={route.path}><Link className="text-black" to={route.path}>{route.text}</Link></li>)}
        </BottomUl>
      </MainHeader>
      <NavBar isOpen={isOpen} onClickNavBarSwitch={onClickNavBarSwitch} />
    </>
  );
});