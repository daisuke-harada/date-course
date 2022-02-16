import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/loginStatusState";

export const Top: VFC = memo(() => {
  const loginStatus = useRecoilValue(loginStatusState);
  console.log(loginStatus.status);
  return(
    <>
      {loginStatus.status && (<h1>ログイン状態です</h1>)}
      <h1 className="text-indigo-900">
        トップページです
      </h1>
    </>
  );
});