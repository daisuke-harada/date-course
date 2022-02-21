// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"
import { RecoilRoot } from "recoil";

import { HeaderLayout } from "components/templates/HeaderLayout";

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
