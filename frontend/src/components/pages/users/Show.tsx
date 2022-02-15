import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { loggendInStatusState } from "store/loggendInStatusState";


export const Show: VFC = memo(() => {
  const loggedIn = useRecoilValue(loggendInStatusState);
  return(
    <>
      <h1>userのshowページです</h1>
      {loggedIn.status && 'ログインしてるよー' }
    </>
  );
});