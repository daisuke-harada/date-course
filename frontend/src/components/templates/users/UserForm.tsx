import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { BaseButton } from "../../atoms/button/BaseButton";
import { DangerButton } from "../../atoms/button/DangerButton";

const MainDiv = tw.div`max-w-md mx-auto mt-10 bg-white p-5 border-gray-900`;
const Title = tw.h1`text-center`
const Input = tw.input`my-5 w-full border-b-2 outline-none`

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
        <Input placeholder="名前を入力してください" />

        {/* <%= f.label :email, "メール" %> */}
        <Input placeholder="メールを入力してください" />

        {/* <div class="my-5"> */}
          {/* <%= f.radio_button :gender, 1 %> */}
          {/* <%= f.label :gender, "男性", {value: 1} %> */}
          {/* <%= f.radio_button :gender, 2 %> */}
          {/* <%= f.label :gender, "女性", {value: 2} %> */}
        {/* </div> */}

        {/* <%= f.label :password, "パスワード" %> */}
        <Input placeholder="パスワードを入力してください" />

        {/* <%= f.label :password_confirmation, "パスワード(確認)" %> */}
        <Input placeholder="確認のためパスワードをもう一度入力してください" />

        {/* <%= f.label :image, "サムネイル"%>
        <%= f.file_field :image %> */}

        <div className="text-center p-1 w-28 m-auto">
          <BaseButton>登録</BaseButton>
        </div>

        <div className="text-center p-1">
          <Link to="/login">ログインはこちら</Link>
        </div>

        <div className="text-center p-1">
          <DangerButton>退会をする</DangerButton>
        </div>
      {/* <% end %>  */}
    </MainDiv>
  );
});