import { memo, useCallback, VFC } from "react";
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";

import { currentUserState, loginStatusState } from "store/session";

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: VFC = memo(() => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  const onClickLogOut = useCallback(() => {
    setLoginStatus({status: false});
    setCurrentUser({user: {}});
  }, [setLoginStatus, setCurrentUser]);
  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});