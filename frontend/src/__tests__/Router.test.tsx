import '@testing-library/jest-dom';
import { screen, render } from "@testing-library/react";
import { Routers } from 'router/Routers';
import { MemoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import { loginStatusState, currentUserState } from 'store/session';

const defaultInitializeState = ({ set }: any) => {
  set(loginStatusState, {status: false});
};

const loginInitializeState = ({ set }: any) => {
  set(loginStatusState, {status: true});
  set(currentUserState, {user: {
    id: 1,
    name: 'daisuke',
    email: "daisuke@gmail.com",
    gender: '男',
    image: {url: null},
    passwordDigest: 'peter4peter4'
  }});
};

// path名を入れればそこに遷移する
const routerDisplay = (path: string, initializeState: ({ set }: any) => void) => {
  return(
    render(
      <RecoilRoot initializeState={initializeState}>
        <MemoryRouter initialEntries={[path]}>
          <Routers />
        </MemoryRouter>
      </RecoilRoot>
    )
  );
};

describe('TopページとログインページのRouterをテストする', () => {
  test('Topページにアクセスする', ()=>{
    routerDisplay('/', defaultInitializeState);
    expect(screen.getByText('Topページ')).toBeInTheDocument();
  });

  test('ログインページにアクセスする', ()=>{
    routerDisplay('/login', defaultInitializeState);
    expect(screen.getByText('ログイン画面')).toBeInTheDocument();
  });
});

// ユーザーのルーターのレンダリングのテスト
describe('UserのRouterをテストする', () => {
  test('ユーザーを探すページにアクセスする', ()=>{
    routerDisplay('/users/index', defaultInitializeState);
    expect(screen.getByText('ユーザーを探すページ')).toBeInTheDocument();
  });

  test('ユーザー新規登録ページにアクセスする', ()=>{
    routerDisplay('/users/new', defaultInitializeState);
    expect(screen.getByText('ユーザー新規登録')).toBeInTheDocument();
  });

  test('ログイン中はユーザー新規登録ページにアクセスできない', ()=>{
    routerDisplay('/users/new', loginInitializeState);
    expect(screen.getByText('ログイン中はアクセスできません')).toBeInTheDocument();
    expect(screen.getByText('Topページ')).toBeInTheDocument();
  });

  test('ユーザー詳細ページにアクセスする', ()=>{
    routerDisplay('/users/1', defaultInitializeState);
    // ユーザー情報を表示できるようにする
    expect(screen.getByText('ユーザーの詳細ページです')).toBeInTheDocument();
  });

  test('ユーザー編集ページにログインしていない状態でアクセスしようとすると、Topページにレンダリングされる。', ()=>{
    routerDisplay('/users/1/edit', defaultInitializeState);
    expect(screen.getByText('アカウント所有者しかアクセスできません')).toBeInTheDocument();
    expect(screen.getByText('Topページ')).toBeInTheDocument();
  });

  test('ユーザーがログイン状態の場合、ユーザー編集ページにアクセスできる', ()=>{
    routerDisplay('/users/1/edit', loginInitializeState);
    expect(screen.getByText('ユーザー情報編集')).toBeInTheDocument();
  });
});

describe('CourseのRouterをテストする', () => {
  test('コース一覧ページにアクセスできる', ()=>{
    routerDisplay('/courses/index', defaultInitializeState);
    expect(screen.getByText('デートコースを探すページです')).toBeInTheDocument();
  });

  test('コース詳細ページにアクセスできる', ()=>{
    routerDisplay('/courses/1', defaultInitializeState);
    // デートコース情報を表示できるようにする
    expect(screen.getByText('デートコースの詳細ページです')).toBeInTheDocument();
  });

  test('ログインしている場合デートコース編集ページにアクセスできる', ()=>{
    routerDisplay('/courses/1/edit', loginInitializeState);
    // デートコース情報を表示できるようにする
    expect(screen.getByText('デートコースの編集ページです')).toBeInTheDocument();
  });

  test('ログインしていない場合デートコース編集ページにアクセスできない', ()=>{
    routerDisplay('/courses/1/edit', defaultInitializeState);
    // デートコース情報を表示できるように改修する。
    expect(screen.getByText('アカウント所有者しかアクセスできません')).toBeInTheDocument();
    expect(screen.getByText('Topページ')).toBeInTheDocument();
  });
});