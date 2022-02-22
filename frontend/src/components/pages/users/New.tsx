import { memo, useCallback, VFC } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { UserForm } from "components/templates/users/UserForm";
import { currentUserState, loginStatusState } from "store/session";
import { UserLoginResponseData } from "types/api/response";

export const New: VFC = memo(() => {
  const navigate = useNavigate();
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  const afterLoginSuccess = useCallback((data: UserLoginResponseData) => {
    setLoginStatus({status: data.loginStatus});
    setCurrentUser({user: data.user});
    navigate(`/users/${data.user.id}`, {state: {message: '新規登録に成功しました。', type: 'success-message', condition: true}});
  },[navigate, setLoginStatus, setCurrentUser]);

  return(
    <UserForm
      nameDefaultValue={''}
      emailDefaultValue={''}
      genderDefaultValue={'男'}
      userFormTitle={"ユーザー新規登録"}
      buttonName={"登録"}
      afterLoginSuccess={afterLoginSuccess}
    />
  );
});