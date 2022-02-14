import { memo, VFC } from "react"


export const Top: VFC = memo(() => {
  return(
    <>
      {/* {loggedInStatus && (<h1>ログイン状態です</h1>)} */}
      <h1 className="text-indigo-900">トップページです</h1>
    </>
  );
});