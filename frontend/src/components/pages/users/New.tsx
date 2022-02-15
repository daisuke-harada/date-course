import { memo, useCallback, VFC } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { UserForm } from "components/templates/users/UserForm";
import { loggendInStatusState } from "store/loggendInStatusState";
import { UserResponseData } from "types/api/response";

export const New: VFC = memo(() => {
  const navigate = useNavigate();
  const setLoggedInStatus = useSetRecoilState(loggendInStatusState);
  const afterLoginSuccess = useCallback((data: UserResponseData) => {
    setLoggedInStatus({status: true});
    navigate(`/users/${data.userId}`);
  },[navigate, setLoggedInStatus]);

  return(
    <UserForm userFormTitle={"ユーザー新規登録"} buttonName={"登録"} afterLoginSuccess={afterLoginSuccess}/>
  );
});