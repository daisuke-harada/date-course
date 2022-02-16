import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";
import { useCookies } from "react-cookie";

import { loginStatusState } from "store/loginStatusState";

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: VFC = memo(() => {
  //const [cookies] = useCookies(["loginStatus", "cuurentUserId"]);
  const setloginStatusStatus = useSetRecoilState(loginStatusState);

  const onClickLogOut = () => {
    setloginStatusStatus({status: false});
  };
  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});