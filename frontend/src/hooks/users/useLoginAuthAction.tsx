import { useDispatch } from 'react-redux';
import { setLoginStatus, setCurrentUser } from 'reducers/loginSlice';
import { SignInParams, User } from 'types/users/session';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { client } from 'lib/api/client';

export const useLoginAuthAction = (signInParams: SignInParams) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<String[]>([]);

  const afterLoginSuccess = (data: User) => {
    dispatch(setLoginStatus(true));
    dispatch(setCurrentUser(data));
    data.admin === false?
    navigate(`/users/${data.id}`, {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}})
    :
    navigate('/', {state: {message: 'ログインに成功しました', type: 'success-message', condition: true}});
  }

  const loginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.post('login', { signInParams })
      .then(response => {
        afterLoginSuccess(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setErrorMessages(error.response.data.errorMessages);
        } else {
          setErrorMessages(['予期しないエラーが発生しました']);
        }
        navigate('', { state: { message: 'ログインに失敗しました', type: 'error-message' } });
      }
    );
  };

  return { loginAction, errorMessages}
};
