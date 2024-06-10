import { memo, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import { BaseButton } from 'components/atoms/button/BaseButton';
import { SignInParams } from 'types/users/session';
import { useLoginAuthAction } from 'hooks/users/useLoginAuthActionRecoil';

const MainDiv = tw.div`user-form p-5`;
const ErrorDiv = tw.li`my-5 tex-xs text-red-600`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-2/3 border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 m-auto`;

export const Login: FC = memo(() => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const signInParams: SignInParams = {
    name: name,
    password: password,
  };

  const { loginAction, errorMessages } = useLoginAuthAction(signInParams);

  return(
    <MainDiv>
      <Title>ログイン画面</Title>
        <ul>{errorMessages.map((message)=><ErrorDiv>{message}</ErrorDiv>)}</ul>
        <Input placeholder='名前を入力' data-e2e='name-input' value={name} onChange={onChangeName} />
        <Input placeholder='パスワードを入力' data-e2e='password-input' value={password} onChange={onChangePassword} />
        <ButtonParentDiv>
          <BaseButton dataE2e='login-button' onClickEvent={loginAction}>ログイン</BaseButton>
        </ButtonParentDiv>
      <div className='text-center'>
        <Link to='/users/new'>新規登録はこちら</Link>
      </div>
    </MainDiv>
  );
});