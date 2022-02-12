import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { BaseButton } from "../../atoms/button/BaseButton";
import { DangerButton } from "../../atoms/button/DangerButton";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-full border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 w-28 m-auto`;

type Props = {
  userFormTitle: string,

}

export const UserForm: VFC<Props> = memo((props) => {
  const {userFormTitle} = props;
  return(
    <MainDiv>
      <Title>{userFormTitle}</Title>
      {/* <%= form_with(model: user, local: true) do |f|%> */}
      {/* <%= render 'shared/error_messages', target: user %> エラーメッセージ 表示 */}
        {/* <%= f.label :name, "名前" %> */}
        <Input placeholder="名前を入力" />

        {/* <%= f.label :email, "メール" %> */}
        <Input placeholder="メールアドレスを入力" />

        {/* <div class="my-5"> */}
          {/* <%= f.radio_button :gender, 1 %> */}
          {/* <%= f.label :gender, "男性", {value: 1} %> */}
          {/* <%= f.radio_button :gender, 2 %> */}
          {/* <%= f.label :gender, "女性", {value: 2} %> */}
        {/* </div> */}

        {/* <%= f.label :password, "パスワード" %> */}
        <Input placeholder="パスワードを入力" />

        {/* <%= f.label :password_confirmation, "パスワード(確認)" %> */}
        <Input placeholder="パスワードを再入力" />

        {/* <%= f.label :image, "サムネイル"%>
        <%= f.file_field :image %> */}

        <ButtonParentDiv>
          <BaseButton>登録</BaseButton>
        </ButtonParentDiv>

        <div className="text-center p-1">
          <Link to="/login">ログインはこちら</Link>
        </div>

        <ButtonParentDiv>
        <DangerButton>退会</DangerButton>
        </ButtonParentDiv>
      {/* <% end %>  */}
    </MainDiv>
  );
});