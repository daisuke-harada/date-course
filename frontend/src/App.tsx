// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"

import { HeaderLayout } from "components/templates/HeaderLayout";
import { useRecoilValue } from "recoil";
import { loginStatusState } from "store/session";

export const App = () => {
  const getLoginStatus = useRecoilValue(loginStatusState);
  console.log(getLoginStatus.status);

  return (
    <BrowserRouter>
      <HeaderLayout>
        <Router />
      </HeaderLayout>
    </BrowserRouter>
  );
}
