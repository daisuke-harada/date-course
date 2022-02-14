// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { HeaderLayout } from "components/templates/HeaderLayout";
import { Router} from "router/Router"

export const App = () => {
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
