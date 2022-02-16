import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";
import { useCookies } from "react-cookie";

import { loggendInStatusState } from "store/loggendInStatusState";

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: VFC = memo(() => {
  //const [cookies] = useCookies(["current_state", "cuurentUserId"]);
  const setLoggedInStatus = useSetRecoilState(loggendInStatusState);

  const onClickLogOut = () => {
    setLoggedInStatus({status: false});
  };
  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});