import { client } from "lib/api/client";
import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState, loginStatusState } from "store/session";
import tw from "tailwind-styled-components";
import { UserLoginResponseData } from "types/api/response";
import { SignInParams } from "types/api/session";

const Button = tw.button`btn btn-yellow-green w-full`;
const Span = tw.div`text-xs`;


export const GuestLoginButton: VFC = memo(() => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const afterLoginSuccess = (data: UserLoginResponseData) => {
    setLoginStatus({status: data.loginStatus});
    setCurrentUser({user: data.user});
    navigate(`/users/${data.user.id}`);
  };

  const signInParams: SignInParams = {
    name: "guest",
    password: "foobar",
  };

  const guestLoginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.post("login", {signInParams}).then(response => {
      response.data.loginStatus && afterLoginSuccess(response.data);
    }).catch(error => {
        console.log("registration error", error)
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
    e.preventDefault();
  };

  return(
    <Button onClick={guestLoginAction}>ゲストログイン<Span>(簡単ログイン)</Span></Button>
  );
});