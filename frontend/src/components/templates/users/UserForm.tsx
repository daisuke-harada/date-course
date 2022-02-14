import { memo, useCallback, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { client } from "lib/api/client";
import { SignUpParams} from "types/api/session";
import { BaseButton } from "components/atoms/button/BaseButton";
import { DangerButton } from "components/atoms/button/DangerButton";
import { RadioField } from "components/molecules/users/RadioField";
import { UserResponseData } from "types/api/response";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-full border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 mx-6 my-4`;
const Form = tw.form`p-5 m-2`

type Props = {
  userFormTitle: string,
  buttonName: string,
  handleSuccessfulAuthentication: (data: UserResponseData) => void,
};

export const UserForm: VFC<Props> = memo((props) => {
  const { userFormTitle, buttonName, handleSuccessfulAuthentication } = props;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('男');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const onChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value);
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.target.value);
  const onChangePasswordConfirmation: React.ChangeEventHandler<HTMLInputElement> = (e) => setPasswordConfirmation(e.target.value);
  const onChangeRadioButton: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => setGender(e.target.value), []);

  // ここのプロパティ名は渡したいparamの名前と同じにする
  const user: SignUpParams = {
    name: name,
    email: email,
    gender: gender,
    password: password,
    passwordConfirmation: passwordConfirmation
  };

  const userRegitAction: React.FormEventHandler<HTMLFormElement> =(e) => {
    client.post("signup", {user}).then(response => {
      handleSuccessfulAuthentication(response.data)
    }).catch(error => {
        console.log("registration error", error)
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
    e.preventDefault();
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