import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { GuestLoginButton } from 'components/atoms/button/GuestLoginButton';

describe('GuestLoginButtonコンポーネントのテスト', () => {
  test('ボタンが表示されている', () => {
    render(
      <BrowserRouter>
        <GuestLoginButton />
      </BrowserRouter>
    );
    expect(screen.getByText('ゲストログイン')).toBeInTheDocument();
    expect(screen.getByText('(簡単ログイン)')).toBeInTheDocument();
  });

  test('ボタンをクリックした際に関数が呼び出される', () => {
    const Button = tw.button`btn btn-yellow-green w-full`;
    const Span = tw.div`text-xs`;
    const loginAction = jest.fn();
    render(
      <Button onClick={loginAction}>ゲストログイン<Span>(簡単ログイン)</Span></Button>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(loginAction).toHaveBeenCalledTimes(1);
  });
})