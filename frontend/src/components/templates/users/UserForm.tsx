import { ChangeEvent, memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { BaseButton } from "../../atoms/button/BaseButton";
import { DangerButton } from "../../atoms/button/DangerButton";
import { RadioField } from "../../molecules/users/RadioField";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-2/3 border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 m-auto`;

type Props = {
  userFormTitle: string,
  buttonName: string,
};

export const UserForm: VFC<Props> = memo((props) => {
  const { userFormTitle, buttonName } = props;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value);

  return(
    <MainDiv>
      <Title>{userFormTitle}</Title>
      <Input placeholder="名前を入力" value={name} onChange={onChangeName} />
      <Input placeholder="メールアドレス入力" value={email} onChange={onChangeEmail}/>
      <Input placeholder="パスワード入力" value={password} onChange={onChangePassword}/>
      <Input placeholder="パスワード再入力" value={passwordConfirm} onChange={onChangePasswordConfirm} />
      <RadioField gender={gender} />
      {console.log(gender)}
      <ButtonParentDiv>
        <BaseButton>{buttonName}</BaseButton>
      </ButtonParentDiv>
      <div className="text-center p-1">
        <Link to="/login">ログインはこちら</Link>
      </div>
      <ButtonParentDiv>
      <DangerButton>退会</DangerButton>
      </ButtonParentDiv>
    </MainDiv>
  );
});