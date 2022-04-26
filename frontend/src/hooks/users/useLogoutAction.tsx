import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { currentUserState, loginStatusState } from 'store/session';

export const useLogoutAction = () => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    setLoginStatus({status: false});
    setCurrentUser({user: {}});
    navigate('/', {state: {message: 'ログアウトしました', type: 'success-message', condition: true}});
  }, [setLoginStatus, setCurrentUser, navigate]);

  return { onClickLogOut };
};