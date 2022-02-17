// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"

import { HeaderLayout } from "components/templates/HeaderLayout";

export const App = () => {

  return (
    <BrowserRouter>
      <HeaderLayout>
        <Router />
      </HeaderLayout>
    </BrowserRouter>
  );
}
