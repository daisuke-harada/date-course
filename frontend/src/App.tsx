// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";

import { HeaderLayout } from "components/templates/HeaderLayout";
import { loggendInStatusState } from "store/loggendInStatusState";
import { useEffect } from "react";

export const App = () => {
  const [cookies] = useCookies(["current_state", "cuurentUserId"]);
  const setLoggedInStatus = useSetRecoilState(loggendInStatusState);

  useEffect(()=>{
    console.log(cookies.current_state);
    cookies.current_state && setLoggedInStatus({status: cookies.current_state});
  }, [cookies, setLoggedInStatus]);

  return (
    <BrowserRouter>
      <HeaderLayout>
        <Router />
      </HeaderLayout>
    </BrowserRouter>
  );
}
