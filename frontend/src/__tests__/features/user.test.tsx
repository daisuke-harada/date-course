import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
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
          {/* <HeaderLayout> */}
            <Routers />
          {/* </HeaderLayout> */}
        </MemoryRouter>
      </RecoilRoot>
    )
  );
};

describe('Userのシナリオテスト', () => {

  const mockClients = new MockAdapter(client);
  mockClients.onPost('login').reply(200, {
    login_status: true,
    user: {
      id: 1,
      name: "daisuke",
      email: "daisuke@gmail.com",
      gender: "男",
      admin: false,
      password_digest: "daisukedaisuke",
    }
  });

  test('ログインする', async () => {
    routerDisplay('/login');

    // mock useNavigate
  //   const mockedUsedNavigate = jest.fn();

  //   jest.mock('react-router-dom', () => ({
  //     ...jest.requireActual('react-router-dom'),
  //    useNavigate: () => mockedUsedNavigate, // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
  //  }));
    const nameInputElement = screen.getByTestId('name-input');
    const passwordInputElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByTestId('login-button');

    fireEvent.change(nameInputElement, {target: {value: 'daisuke'}});
    fireEvent.change(passwordInputElement, {target: {value: 'daisuke'}});

    /* eslint-disable */
    waitFor(() => {
      screen.debug();
    });
    /* eslint-disable */

    fireEvent.click(buttonElement);
  });
});