import { client } from "lib/api/client";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState, loginStatusState } from "store/session";
import { UserLoginResponseData } from "types/api/response";
import { SignInParams } from "types/api/session";

export const useLoginAuthAction = (signInParams: SignInParams) => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const afterLoginSuccess = (data: UserLoginResponseData) => {
    setLoginStatus({status: data.loginStatus});
    setCurrentUser({user: data.user});
    navigate(`/users/${data.user.id}`, {state: {message: 'ログインに成功しました', type: "success"}});
  };

  const loginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.post("login", {signInParams}).then(response => {
      response.data.loginStatus && afterLoginSuccess(response.data);
    }).catch(error => {
        console.log("registration error", error)
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
    e.preventDefault();
  };

  return { loginAction };
}