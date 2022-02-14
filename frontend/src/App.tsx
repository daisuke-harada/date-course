import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Router} from "./router/Router"

export const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(false);
  const [user, setUser] = useState({});
  return (
      <BrowserRouter>
        <HeaderLayout>
          <Router/>
        </HeaderLayout>
      </BrowserRouter>
  );
}
