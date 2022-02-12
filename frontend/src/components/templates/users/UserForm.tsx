import { memo, VFC } from "react";
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
  const {userFormTitle, buttonName} = props;
  return(
    <MainDiv>
      <Title>{userFormTitle}</Title>
      <Input placeholder="名前を入力" />
      <Input placeholder="メールアドレス入力" />
      <Input placeholder="パスワード入力" />
      <Input placeholder="パスワード再入力" />
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