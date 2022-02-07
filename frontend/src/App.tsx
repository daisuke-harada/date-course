import { BrowserRouter} from "react-router-dom";
import { Router} from "./router/Router"

export const App = () => {
  return (
    <BrowserRouter>
     <Router/>
    </BrowserRouter>
  );
}
