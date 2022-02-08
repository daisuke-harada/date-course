import { BrowserRouter} from "react-router-dom";
import { HeaderLayout } from "./components/templates/HeaderLayout";
import { Router} from "./router/Router"

export const App = () => {
  return (
      <BrowserRouter>
        <HeaderLayout>
          <Router/>
        </HeaderLayout>
      </BrowserRouter>
  );
}
