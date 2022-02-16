import { memo, useCallback, VFC } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { UserForm } from "components/templates/users/UserForm";
import { loginStatusState } from "store/session";
import { UserResponseData } from "types/api/response";

export const New: VFC = memo(() => {
  const navigate = useNavigate();
  const setLoginStatus = useSetRecoilState(loginStatusState);
  const afterLoginSuccess = useCallback((data: UserResponseData) => {
    setLoginStatus({status: true});
    navigate(`/users/${data.userId}`);
  },[navigate, setLoginStatus]);

  return(
    <UserForm userFormTitle={"ユーザー新規登録"} buttonName={"登録"} afterLoginSuccess={afterLoginSuccess}/>
  );
});