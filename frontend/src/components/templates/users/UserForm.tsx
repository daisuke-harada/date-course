import { ChangeEvent, memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import { BaseButton } from "../../atoms/button/BaseButton";
import { DangerButton } from "../../atoms/button/DangerButton";

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
  const [gender, setGender] = useState<number>(2);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value);


  // const params: SignUpParams = {
  //   name: name,
  //   email: email,
  //   gender: gender,
  //   password: password,
  //   passwordConfirmation: passwordConfirmation,
  // }

  return(
    <MainDiv>
      <Title>{userFormTitle}</Title>
      {/* {setGender(1)} */}
      <Input placeholder="名前を入力" value={name} onChange={onChangeName} />
      <Input placeholder="メールアドレス入力" value={email} onChange={onChangeEmail}/>
      <Input placeholder="パスワード入力" value={password} onChange={onChangePassword}/>
      <Input placeholder="パスワード再入力" value={passwordConfirm} onChange={onChangePasswordConfirm} />
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