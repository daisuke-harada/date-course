import '@testing-library/jest-dom';
import { screen, render } from "@testing-library/react";
import { useNavigate } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import {createMemoryHistory} from 'history'
import { Routers } from 'router/Routers';
import { Router, MemoryRouter } from 'react-router-dom'
import { HeaderLayout } from "components/templates/HeaderLayout";
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