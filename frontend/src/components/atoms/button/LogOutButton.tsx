import { memo, VFC } from "react";
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";

import { loginStatusState } from "store/session";

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: VFC = memo(() => {
  const setLoginStatus = useSetRecoilState(loginStatusState);

  const onClickLogOut = () => {
    setLoginStatus({status: false});
  };
  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});