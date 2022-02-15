// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";

import { HeaderLayout } from "components/templates/HeaderLayout";
import { loggendInStatusState } from "store/loggendInStatusState";
import { useEffect } from "react";

export const App = () => {
  const [cookies] = useCookies(["current_status"]);
  const setLoggedInStatus = useSetRecoilState(loggendInStatusState);

  useEffect(()=>{
    cookies.current_status && setLoggedInStatus({status: cookies.current_status});
  }, [cookies, setLoggedInStatus]);

  return (
    <BrowserRouter>
      <HeaderLayout>
        <Router />
      </HeaderLayout>
    </BrowserRouter>
  );
}
