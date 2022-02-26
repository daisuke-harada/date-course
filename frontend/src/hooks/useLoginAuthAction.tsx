import { client } from "lib/api/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { currentUserState, loginStatusState } from "store/session";
import { UserLoginResponseData } from "types/api/response";
import { SignInParams } from "types/api/session";

export const useLoginAuthAction = (signInParams: SignInParams) => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  // エラーメッセージ用のステート
  const [errorMessages, setErrorMessages] = useState([]);

  const afterLoginSuccess = (data: UserLoginResponseData) => {
    setLoginStatus({status: data.loginStatus});
    setCurrentUser({user: data.user});
    // typeはsuccessとerrorの2種類がある。 conditonがtrueの時にフラッシュメッセージが表示される。
    navigate(`/users/${data.user.id}`, {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}});
  };

  const loginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.post("login", {signInParams}).then(response => {
      if(response.data.loginStatus){
        // ログイン成功
        afterLoginSuccess(response.data);
      }else{
        // ログイン失敗のメッセージをrailsから受け取りstateにセットする。
        setErrorMessages(response.data.errors);
        // フラッシュメッセージにもエラーを表示させる。
        navigate(`/login`, {state: {message: 'ログインに失敗しました', type: 'error-message', condition: true}});
      }
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
    e.preventDefault();
  };

  return { loginAction, errorMessages };
};