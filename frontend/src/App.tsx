import { BrowserRouter } from 'react-router-dom';
import { Routers } from 'router/Routers'
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';

import { HeaderLayout } from 'components/templates/layouts/HeaderLayout';
import store from './reducers/index';

export const App = () => {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Provider store={store}>
        <HeaderLayout>
          <Routers />
        </HeaderLayout>
        </Provider>
      </BrowserRouter>
    </RecoilRoot>
  );
}
