import { BrowserRouter } from 'react-router-dom';
import { Routers } from 'router/Routers'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadScript } from '@react-google-maps/api';

import { HeaderLayout } from 'components/templates/layouts/HeaderLayout';
import { persistor } from './reducers/index'
import store from './reducers/index';



export const App = () => {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''} >
            <HeaderLayout>
              <Routers />
            </HeaderLayout>
          </LoadScript>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
