import { memo, useState, VFC } from "react";
import { Link, useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { BaseButton } from "components/atoms/button/BaseButton";
import { client } from "lib/api/client";
import { SignInParams } from "types/api/session";
import { useSetRecoilState } from "recoil";
import { loginStatusState } from "store/loginStatusState";
import { UserResponseData } from "types/api/response";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-2/3 border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 m-auto`;
const Form = tw.form`p-5 m-2`

export const Login: VFC = memo(() => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  // login後のアクション
  const navigate = useNavigate();
  const setloginStatusStatus = useSetRecoilState(loginStatusState);

  const afterLoginSuccess = (data: UserResponseData) => {
    setloginStatusStatus({status: true});
    navigate(`/users/${data.userId}`);
  };

  const signInParams: SignInParams = {
    name: name,
    password: password,
  }

  const userLoginAction: React.FormEventHandler<HTMLFormElement> =(e) => {
    client.post("login", {signInParams}).then(response => {
      response.data.loginStatus && afterLoginSuccess(response.data);
    }).catch(error => {
        console.log("registration error", error)
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
    e.preventDefault();
  };

  return(
    <MainDiv>
      <Title>ログイン</Title>
      <Form onSubmit={userLoginAction}>
        <Input placeholder="名前を入力" value={name} onChange={onChangeName} />
        <Input placeholder="パスワードを入力" value={password} onChange={onChangePassword} />
        <ButtonParentDiv>
          <BaseButton>ログイン</BaseButton>
        </ButtonParentDiv>
      </Form>
      <div className="text-center">
        <Link to="/users/new">新規登録はこちら</Link>
      </div>
    </MainDiv>
  );
});