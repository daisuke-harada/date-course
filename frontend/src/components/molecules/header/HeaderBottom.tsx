import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { headerBottomRoutes } from "router/HeaderBottomRoutes";
import { currentUserState, loginStatusState } from "store/session";

const BottomUl = tw.ul`lg:flex hidden flex-wrap text-base justify-center font-bold`;
const BottomUlList = tw.li`my-3 mx-6`;

export const HeaderBottom: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUserInfo = useRecoilValue(currentUserState);
  return(
    <BottomUl>
      {headerBottomRoutes.map((route) => <BottomUlList key={route.path}><Link className="text-black" to={route.path}>{route.text}</Link></BottomUlList>)}
      { (getLoginStatus.status && getCurrentUserInfo.user.admin === false )&& <BottomUlList><Link className="text-black" to={`users/${getCurrentUserInfo.user.id}`}>マイページ</Link></BottomUlList>}
    </BottomUl>
  );
});