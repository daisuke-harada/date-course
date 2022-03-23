import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";

export const Top: VFC = memo(() => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const developBackendUrlClass = "bg-[url('http://localhost:7777/images/lp.jpg')] h-96 bg-no-repeat bg-cover bg-top";
  const productionBackendUrlClass = "bg-[url('https://backend.datecourses.com/images/lp.jpg')] h-96 bg-no-repeat bg-cover bg-top";
  const backendLpUrlClass = process.env.REACT_APP_ENVIRONMENT === 'production'? productionBackendUrlClass : developBackendUrlClass;
  return(
    <>
      <div className={backendLpUrlClass}>
       {/* ここに案内ボタンを設置 */}
       <h1>Topページ</h1>
      </div>
      {getLoginStatus.status && (<h1>ログイン状態です</h1>)}
    </>
  );
});