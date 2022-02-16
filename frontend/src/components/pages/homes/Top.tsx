import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loggendInStatusState } from "store/loggendInStatusState";

export const Top: VFC = memo(() => {
  const loggedIn = useRecoilValue(loggendInStatusState);
  console.log(loggedIn.status);
  return(
    <>
      {loggedIn.status && (<h1>ログイン状態です</h1>)}
      <h1 className="text-indigo-900">
        トップページです
      </h1>
    </>
  );
});