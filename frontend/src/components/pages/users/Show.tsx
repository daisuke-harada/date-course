import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "store/currentUserState";
import { loggendInStatusState } from "store/loggendInStatusState";


export const Show: VFC = memo(() => {
  const userInfo: any = useRecoilValue(currentUserState);
  const loggedIn = useRecoilValue(loggendInStatusState);
  console.log(loggedIn);
  return(
    <>
      <h1>userのshowページです</h1>
      {loggedIn.status && userInfo.current_user.name }
    </>
  );
});