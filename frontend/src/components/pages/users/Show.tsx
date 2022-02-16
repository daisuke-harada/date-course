import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";

export const Show: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  return(
    <>
      <h1>userのshowページです</h1>
      {getLoginStatus.status && 'ログインしてるよー' }
    </>
  );
});