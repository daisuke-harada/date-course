import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "../../../hooks/useSession";
import { UserForm } from "../../templates/users/UserForm";

export const New: VFC = memo(() => {
  const session = useSessions;
  const navigate = useNavigate();
  const handleSuccessfulAuthentication: any = (data: any) => {
    console.log(data);
    session(data);
    navigate("/");
  };
  console.log()
  return(
    <UserForm userFormTitle={"ユーザー新規登録"} buttonName={"登録"} handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
  );
});