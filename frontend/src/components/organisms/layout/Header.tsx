import { useCallback } from "react";
import {memo, useState, VFC } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

import { HeaderTopLeft } from "components/molecules/header/HeaderTopLeft";
import { HeaderTopRight } from "components/molecules/header/HeaderTopRight";
import { HeaderBottom } from "components/molecules/header/HeaderBottom"
import { NavBar } from "components/molecules/header/NavBar";

const MainHeader = tw.header`lg:h-32 sm:h-24 bg-white w-full shadow-xl z-50 fixed`;
const TopDiv = tw.div`lg:border-b-2 lg:flex-wrap w-full flex  justify-around font-bold`;
const TitleDiv = tw.div`lg:my-3 lg:mx-0 sm:text-6xl sm:m-3 cursor-pointer hover:text-yellow-500 text-4xl m-5 mx-4`;

export const Header: VFC = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickNavBarSwitch: React.MouseEventHandler<HTMLElement> = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/"), [navigate]);


  return(
    <>
      <MainHeader>
        <TopDiv>
          <HeaderTopLeft />
          <TitleDiv onClick={onClickHome}>
            DateCourses
          </TitleDiv>
          <HeaderTopRight isOpen={isOpen} onClickNavBarSwitch={onClickNavBarSwitch} />
        </TopDiv>
        <HeaderBottom />
      </MainHeader>
      <NavBar isOpen={isOpen} onClickNavBarSwitch={onClickNavBarSwitch} />
    </>
  );
});