import { useDispatch } from 'react-redux'
import { setLoginStatus, setCurrentUser } from 'actions/sessionActions'
import { SignInParams } from 'types/users/session'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserLoginResponseData } from 'types/users/response';
import { client } from 'lib/api/client';


export const useLoginAuthAction = (signInParams: SignInParams) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessages] = useState([]);

  const afterLoginSuccess = (data: UserLoginResponseData) => {
    dispatch(setLoginStatus(true));
    dispatch(setCurrentUser(data.user));
    navigate('/')
  }

  const loginAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    client.post('login',{signInParams}).then(response => {
      if(response.data.loginStatus){
        afterLoginSuccess(response.data);
      }else{
        setErrorMessages(response.data.errorMessages);
        navigate('/', {state: {message: 'ログインに失敗しました', type: 'error-message'}});
      }
    })
  }

  return { loginAction, errorMessage}
}