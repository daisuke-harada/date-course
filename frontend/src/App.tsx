import { BrowserRouter } from 'react-router-dom';
import { Routers } from 'router/Routers'
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { HeaderLayout } from 'components/templates/layouts/HeaderLayout';
import { persistor } from './reducers/index'
import store from './reducers/index';


export const App = () => {

  return (
      <BrowserRouter>
        <RecoilRoot>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <HeaderLayout>
              <Routers />
            </HeaderLayout>
          </PersistGate>
        </Provider>
        </RecoilRoot>
      </BrowserRouter>
  );
}
