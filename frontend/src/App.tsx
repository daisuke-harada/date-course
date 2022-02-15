// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { HeaderLayout } from "components/templates/HeaderLayout";
import { Router} from "router/Router"
import { useEffect } from "react";

export const App = () => {
  useEffect(()=> {
    console.log("effectが発動");
  });
  return (
    <RecoilRoot>
      <BrowserRouter>
        <HeaderLayout>
          <Router />
        </HeaderLayout>
      </BrowserRouter>
    </RecoilRoot>
  );
}
