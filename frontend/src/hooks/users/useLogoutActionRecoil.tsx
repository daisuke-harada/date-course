import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoginStatus } from 'actions/sessionActions';
import { initialUser } from 'defaults/userDefaults';

export const useLogoutAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    dispatch(setLoginStatus(false))
    dispatch(setCurrentUser(initialUser))
    navigate('/', {state: {message: 'ログアウトしました', type: 'success-message', condition: true}});
  }, [setLoginStatus, setCurrentUser, navigate]);

  return { onClickLogOut };
};