import { memo, VFC } from "react";
import { UserForm } from "../../templates/users/UserForm";

export const New: VFC = memo(() => {
  return(
    <UserForm userFormTitle={"ユーザー新規登録"} buttonName={"登録"} />
  );
});