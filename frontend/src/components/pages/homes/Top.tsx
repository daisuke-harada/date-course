import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";

export const Top: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  console.log(getLoginStatus.status);
  return(
    <>
      {getLoginStatus.status && (<h1>ログイン状態です</h1>)}
      <h1 className="text-indigo-900">
        トップページです
      </h1>
    </>
  );
});