import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";

import { loginStatusState } from "store/session";

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: VFC = memo(() => {
  //const [cookies] = useCookies(["loginStatus", "cuurentUserId"]);
  const loginStatus = useSetRecoilState(loginStatusState);

  const onClickLogOut = () => {
    loginStatus({status: false});
  };
  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});