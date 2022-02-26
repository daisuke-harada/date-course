import '@testing-library/jest-dom';
import { screen, render } from "@testing-library/react";
import { Routers } from 'router/Routers';
import { MemoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

describe('Routerをテストする', () => {
  test('Topページにアクセスする', ()=>{
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={["/users/index"]}>
          <Routers />
        </MemoryRouter>
      </RecoilRoot>
    );
    /* eslint-disable */
    screen.debug();
    /* eslint-disable */
  })
});