import { memo, useCallback, VFC } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { UserForm } from "../../templates/users/UserForm";
import { currentUserState } from "../../../store/currentUserState";
import { loggendInStatusState } from "../../../store/loggendInStatusState";
import { UserResponseData } from "../../../types/api/response";

export const New: VFC = memo(() => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(currentUserState);
  const setLoggedInStatus = useSetRecoilState(loggendInStatusState);
  const handleSuccessfulAuthentication = useCallback((data: UserResponseData) => {
    console.log(data);
    setUser({current_user: data.user});
    setLoggedInStatus({status: true});
    navigate(`/users/${data.user.id}`);
  },[setUser, navigate, setLoggedInStatus]);

  return(
    <UserForm userFormTitle={"ユーザー新規登録"} buttonName={"登録"} handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
  );
});