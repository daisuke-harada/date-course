import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { headerBottomRoutes } from "../../../../router/HeaderBottomRoutes";

const BottomUl = tw.ul`lg:flex hidden flex-wrap text-base justify-center font-bold`;
const BottomUlList = tw.li`my-3 mx-6`;

export const HeaderBottom: VFC = memo(() => {
  return(
    <BottomUl>
      {headerBottomRoutes.map((route) => <BottomUlList key={route.path}><Link className="text-black" to={route.path}>{route.text}</Link></BottomUlList>)}
    </BottomUl>
  );
});