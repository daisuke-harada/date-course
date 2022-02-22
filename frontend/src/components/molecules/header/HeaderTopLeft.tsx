import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

import { HeaderTopLeftRoutes } from "router/HeaderTopLeftRoutes";

const TopLeftDiv = tw.div`lg:flex hidden mt-5 justify-center`;
const TopLeftDivChild = tw.div`mx-2`;

export const HeaderTopLeft: VFC = memo(() => {
  return(
    <TopLeftDiv>
      {HeaderTopLeftRoutes.map((route) =><TopLeftDivChild key={route.path}><Link to={route.path} >{route.element}</Link></TopLeftDivChild>)}
    </TopLeftDiv>
  );
});