import { useCallback } from "react";
import {memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { HeaderTopLeft } from "../../molecules/layouts/header/HeaderTopLeft";
import { HeaderTopRight } from "../../molecules/layouts/header/HeaderTopRight";
import { HeaderBottom } from "../../molecules/layouts/header/HeaderBottom"

import { NavBar } from "../../molecules/layouts/NavBar";

const MainHeader = tw.header`lg:h-32 sm:h-24 bg-white w-full shadow-xl z-50 fixed`;
const TopDiv = tw.div`lg:border-b-2 lg:flex-wrap w-full flex  justify-around font-bold`;
const TitleDiv = tw.div`lg:my-3 lg:mx-0 sm:text-6xl sm:m-3 text-4xl m-5 mx-4`;

export const Header: VFC = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // onClickの型を型推論からを参考に設定した
  const onClickNavBarSwitch: React.MouseEventHandler<HTMLElement> = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  return(
    <>
      <MainHeader>
        <TopDiv>
          <HeaderTopLeft />
          <TitleDiv>
            <Link to="/" className="text-black">DateCourses</Link>
          </TitleDiv>
          <HeaderTopRight isOpen={isOpen} onClickNavBarSwitch={onClickNavBarSwitch} />
        </TopDiv>
        <HeaderBottom />
      </MainHeader>
      <NavBar isOpen={isOpen} onClickNavBarSwitch={onClickNavBarSwitch} />
    </>
  );
});