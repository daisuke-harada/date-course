import { memo, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../../templates/users/UserForm";

export const New: VFC = memo(() => {
  const navigate = useNavigate();
  const handleSuccessfulAuthentication: (e: any) => void = (data: any) => {
    console.log(data);
    navigate("/");
  };
  return(
    <UserForm userFormTitle={"ユーザー新規登録"} buttonName={"登録"} handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
  );
});