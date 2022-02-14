import { memo, VFC } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { UserForm } from "../../templates/users/UserForm";
import { currentUserState } from "../../../store/currentUserState";
import { loggendInStatusState } from "../../../store/loggendInStatusState";


export const New: VFC = memo(() => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(currentUserState);
  const setLoggedInStatus = useSetRecoilState(loggendInStatusState);
  const handleSuccessfulAuthentication: any = (data: any) => {
    console.log(data.user);
    setUser({current_user: data.user});
    setLoggedInStatus({status: true});
    navigate(`/users/${data.user.id}`);
  };
  return(
    <UserForm userFormTitle={"ユーザー新規登録"} buttonName={"登録"} handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
  );
});