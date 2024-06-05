import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLoginStatus, setCurrentUser } from 'actions/sessionActions';

export const useLogoutAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    dispatch(setLoginStatus(false))
    dispatch(setCurrentUser({}))
    navigate('/', {state: {message: 'ログアウトしました', type: 'success-message', condition: true}});
  }, [setLoginStatus, setCurrentUser, navigate]);

  return { onClickLogOut };
};