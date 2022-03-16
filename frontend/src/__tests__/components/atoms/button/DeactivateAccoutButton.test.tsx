import { DeactivateAcountButton } from 'components/atoms/button/DeactivateAcountButton';
import { DangerButton } from 'components/atoms/button/DangerButton';
import '@testing-library/jest-dom';
import { fireEvent, screen, render } from '@testing-library/react';
import { RecoilRoot} from 'recoil';

import { BrowserRouter } from 'react-router-dom';
import { loginStatusState, currentUserState } from 'store/session';

const initializeState = ({ set }: any) => {
  // 必要に応じて対象のステート及び値を設定するロジックを追加
  set(loginStatusState, {status: true});
  set(currentUserState, {user: {
    id: 1,
    name: 'daisuke',
    email: "daisuke@gmail.com",
    gender: '男性',
    image: {url: null},
    passwordDigest: 'peter4peter4'
  }});
};

describe('DeactivateAcountButtonコンポーネントのテスト', () => {
  test('ログインしていないときはボタンが表示されない', () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <DeactivateAcountButton />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.queryByText('退会')).toBeNull();
  });

  test('ログインしているときはボタンが表示される', () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <BrowserRouter>
          <DeactivateAcountButton />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(screen.getByText('退会')).toBeInTheDocument();
  });

  test('退会ボタンのonClickアクションが動作する',() => {
    const mockCLickDeactivateAccountAction = jest.fn();
    render(
      <RecoilRoot initializeState={initializeState}>
        <BrowserRouter>
          <div className='text-center p-1 mx-6 my-4'>
            <DangerButton onClickEvent={mockCLickDeactivateAccountAction}>
              退会
            </DangerButton>
          </div>
        </BrowserRouter>
      </RecoilRoot>
    );
    // buttonをクリックする
    fireEvent.click(screen.getByRole('button'));

    // mock関数がクリックされて一度呼び出されたことを示す。
    expect(mockCLickDeactivateAccountAction).toHaveBeenCalledTimes(1);
  });
});
