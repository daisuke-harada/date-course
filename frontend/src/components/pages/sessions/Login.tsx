import { memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { BaseButton } from "components/atoms/button/BaseButton";
import { SignInParams } from "types/api/session";
import { useLoginAuthAction } from "hooks/useLoginAuthAction";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-2/3 border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 m-auto`;

export const Login: VFC = memo(() => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const signInParams: SignInParams = {
    name: name,
    password: password,
  };

  const { loginAction } = useLoginAuthAction(signInParams);

  return(
    <MainDiv>
      <Title>ログイン</Title>
        <Input placeholder="名前を入力" value={name} onChange={onChangeName} />
        <Input placeholder="パスワードを入力" value={password} onChange={onChangePassword} />
        <ButtonParentDiv>
          <BaseButton onClickEvent={loginAction}>ログイン</BaseButton>
        </ButtonParentDiv>
      <div className="text-center">
        <Link to="/users/new">新規登録はこちら</Link>
      </div>
    </MainDiv>
  );
});