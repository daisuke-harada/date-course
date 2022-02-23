import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";

export const Top: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  return(
    <>
      <div className="bg-[url('http://localhost:7777/images/lp.jpg')] h-96 bg-no-repeat bg-cover bg-top">
       {/* ここに案内ボタンを設置 */}
      </div>
      {getLoginStatus.status && (<h1>ログイン状態です</h1>)}
    </>
  );
});