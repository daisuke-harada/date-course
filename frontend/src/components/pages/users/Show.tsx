import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/loginStatusState";


export const Show: VFC = memo(() => {
  const loginStatus = useRecoilValue(loginStatusState);
  return(
    <>
      <h1>userのshowページです</h1>
      {loginStatus.status && 'ログインしてるよー' }
    </>
  );
});