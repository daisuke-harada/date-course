import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { client } from 'lib/api/client';
import { UserLoginResponseData } from 'types/users/response';
import { SignInParams } from 'types/users/session';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoginStatus } from 'actions/sessionActions';

export const useLoginAuthAction = (signInParams: SignInParams) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // エラーメッセージ用のステート
  const [errorMessages, setErrorMessages] = useState([]);

  const afterLoginSuccess = (data: UserLoginResponseData) => {
    dispatch(setLoginStatus(true));
    dispatch(setCurrentUser(data.user));
    data.user.admin === false?
    navigate(`/users/${data.user.id}`, {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}})
    :
    navigate('/', {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}});
  };

  const loginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.post('login', {signInParams}).then(response => {
      if(response.data.loginStatus){
        // ログイン成功
        afterLoginSuccess(response.data);
      }else{
        // ログイン失敗のメッセージをrailsから受け取りstateにセットする。
        setErrorMessages(response.data.errorMessages);
        // フラッシュメッセージにもエラーを表示させる。
        <Navigate to='./' state={{message: 'ログインに失敗しました', type: 'error-message', condition: true}} />
      }
    });
    // イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます
  };

  return { loginAction, errorMessages };
};
