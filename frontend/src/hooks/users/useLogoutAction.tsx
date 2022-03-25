import { useCallback } from "react";
import { currentUserState, loginStatusState } from "store/session";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


export const useLogoutAction = () => {
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const onClickLogOut = useCallback(() => {
    setLoginStatus({status: false});
    setCurrentUser({user: {}});
    navigate("/", {state: {message: 'ログアウトしました', type: 'success-message', condition: true}});
  }, [setLoginStatus, setCurrentUser, navigate]);

  return { onClickLogOut };
};