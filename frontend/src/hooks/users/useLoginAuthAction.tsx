import { client } from 'lib/api/client';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { currentUserState, loginStatusState } from 'store/session';
import { UserLoginResponseData } from 'types/users/response';
import { SignInParams } from 'types/users/session';

export const useLoginAuthAction = (signInParams: SignInParams) => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  // エラーメッセージ用のステート
  const [errorMessages, setErrorMessages] = useState([]);

  const afterLoginSuccess = (data: UserLoginResponseData) => {
    setLoginStatus({status: data.loginStatus});
    setCurrentUser({user: data.user});

    navigate(`/`, {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}});
  };

  const loginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.post('login', {signInParams}).then(response => {
      if(response.data.loginStatus){
        // ログイン成功
        afterLoginSuccess(response.data);
      }else{
        // ログイン失敗のメッセージをrailsから受け取りstateにセットする。
        setErrorMessages(response.data.errors);
        // フラッシュメッセージにもエラーを表示させる。
        <Navigate to='./' state={{message: 'ログインに失敗しました', type: 'error-message', condition: true}} />
      }
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
  };

  return { loginAction, errorMessages };
};
