import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";

export const Top: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUser = useRecoilValue(currentUserState);
  console.log(getCurrentUser);
  return(
    <>
      <div className="bg-[url('http://localhost:7777/images/lp.jpg')] h-96 bg-no-repeat bg-cover bg-top">
       {/* ここに案内ボタンを設置 */}
       <h1>Topページ</h1>
      </div>
      {getLoginStatus.status && (<h1>ログイン状態です</h1>)}
    </>
  );
});