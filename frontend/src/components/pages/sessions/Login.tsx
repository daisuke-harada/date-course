import { memo, VFC } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { BaseButton } from "../../atoms/button/BaseButton";

const MainDiv = tw.div`user-form`;
const Title = tw.h1`text-center font-bold`;
const Input = tw.input`my-5 w-2/3 border-b-2 outline-none`;
const ButtonParentDiv = tw.div`text-center p-1 my-4 m-auto`;

export const Login: VFC = memo(() => {
  return(
    <MainDiv>
      <Title>ログイン</Title>
      <Input placeholder="名前を入力" />
      <Input placeholder="パスワードを入力" />
        {/* <%= f.label :remember_me, class: "-mt-1 mb-1" do%>
          <%= f.check_box :remember_me %>
          <span class="ml-5">次回から自動的にログインする</span>
        <% end %><br/> */}
      <ButtonParentDiv>
        <BaseButton>ログイン</BaseButton>
      </ButtonParentDiv>
      <div className="text-center">
        <Link to="/users/new">新規登録はこちら</Link>
      </div>
    </MainDiv>
  );
});