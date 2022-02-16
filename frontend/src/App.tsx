// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";

import { HeaderLayout } from "components/templates/HeaderLayout";
import { loginStatusState } from "store/loginStatusState";
import { useEffect } from "react";

export const App = () => {
  const [cookies] = useCookies(["loginStatus", "cuurentUserId"]);
  const setloginStatusStatus = useSetRecoilState(loginStatusState);

  useEffect(()=>{
    console.log(cookies.loginStatus);
    cookies.loginStatus && setloginStatusStatus({status: cookies.loginStatus});
  }, [cookies, setloginStatusStatus]);

  return (
    <BrowserRouter>
      <HeaderLayout>
        <Router />
      </HeaderLayout>
    </BrowserRouter>
  );
}
