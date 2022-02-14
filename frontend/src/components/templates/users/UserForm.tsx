import { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { client } from "../../../lib/api/client";
import { SignUpParams } from "../../../types/session";

import { BaseButton } from "../../atoms/button/BaseButton";
import { DangerButton } from "../../atoms/button/DangerButton";
import { RadioField } from "../../molecules/users/RadioField";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-full border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 mx-6 my-4`;
const Form = tw.form`p-5 m-2`

type Props = {
  userFormTitle: string,
  buttonName: string,
};

export const UserForm: VFC<Props> = memo((props) => {
  const { userFormTitle, buttonName } = props;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('女');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);
  const onChangeRadioButton = useCallback((e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value), []);

  const params: SignUpParams = {
    name: name,
    email: email,
    gender: gender,
    password: password,
    passwordConfirmation: passwordConfirmation
  };

  const userRegitAction =(event: any) => {
    console.log("クリック");
    console.log(params);
    client.post("signup", params);
    event.preventDefault();
  };

  return(
    <MainDiv>
      <Title>{userFormTitle}</Title>
      <Form onSubmit={userRegitAction}>
        <Input placeholder="名前を入力" value={name} onChange={onChangeName} />
        <Input placeholder="メールアドレス入力" value={email} onChange={onChangeEmail}/>
        <Input placeholder="パスワード入力" value={password} onChange={onChangePassword}/>
        <Input placeholder="パスワード再入力" value={passwordConfirmation} onChange={onChangePasswordConfirmation} />
        <RadioField gender={gender} onChangeRadioButton={onChangeRadioButton} />
        <ButtonParentDiv>
          <BaseButton>{buttonName}</BaseButton>
        </ButtonParentDiv>
        <ButtonParentDiv>
          <DangerButton>退会</DangerButton>
        </ButtonParentDiv>
      </Form>
      <div className="text-center p-1">
        <Link to="/login">ログインはこちら</Link>
      </div>
    </MainDiv>
  );
});