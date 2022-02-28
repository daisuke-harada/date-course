import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MockAdapter from 'axios-mock-adapter';

import { Routers } from "router/Routers";
import { client } from "lib/api/client";

// path名を入れればそこに遷移する
const routerDisplay = (path: string) => {
  return(
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={[path]}>
          <Routers />
        </MemoryRouter>
      </RecoilRoot>
    )
  );
};

describe('Userのシナリオテスト', () => {
  const mockAxios = new MockAdapter(client);
  mockAxios.onPost('/login', (response: any) =>{ data: {login_status: true, user: {}}})
  test('ログインする', () => {
    routerDisplay('/login');
    userEvent.type(screen.getByTestId('name-input'), 'daisuke');
    userEvent.type(screen.getByTestId('password-input'), 'daisuke');
  });
});