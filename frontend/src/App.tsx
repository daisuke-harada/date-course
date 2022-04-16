// import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routers } from 'router/Routers'
import { RecoilRoot } from 'recoil';

import { HeaderLayout } from 'components/templates/layouts/HeaderLayout';

export const App = () => {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <HeaderLayout>
          <Routers />
        </HeaderLayout>
      </BrowserRouter>
    </RecoilRoot>
  );
}
