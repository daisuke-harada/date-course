// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"

import { HeaderLayout } from "components/templates/HeaderLayout";
import { useRecoilValue } from "recoil";
import { currentUserState, loginStatusState } from "store/session";

export const App = () => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  const getCurrentUserInfo = useRecoilValue(currentUserState);
  console.log(getLoginStatus.status, getCurrentUserInfo.user);

  return (
    <BrowserRouter>
      <HeaderLayout>
        <Router />
      </HeaderLayout>
    </BrowserRouter>
  );
}
