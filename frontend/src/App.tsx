import { BrowserRouter } from 'react-router-dom';
import { Routers } from 'router/Routers'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {APIProvider} from '@vis.gl/react-google-maps'
import { HeaderLayout } from 'components/templates/layouts/HeaderLayout';
import { persistor } from './reducers/index'
import store from './reducers/index';



export const App = () => {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''} libraries={['marker']}>
            <HeaderLayout>
              <Routers />
            </HeaderLayout>
          </APIProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
