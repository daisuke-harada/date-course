import { memo, useCallback, VFC } from "react";
import tw from "tailwind-styled-components";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { currentUserState, loginStatusState } from "store/session";

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: VFC = memo(() => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    setLoginStatus({status: false});
    setCurrentUser({user: {}});
    navigate("/");
  }, [setLoginStatus, setCurrentUser, navigate]);

  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});