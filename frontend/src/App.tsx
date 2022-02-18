// import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { Router} from "router/Router"

import { HeaderLayout } from "components/templates/HeaderLayout";
import { FlashMessage } from "components/atoms/message/FlashMessage";

export const App = () => {

  return (
    <BrowserRouter>
      <HeaderLayout>
        <FlashMessage />
        <Router />
      </HeaderLayout>
    </BrowserRouter>
  );
}
