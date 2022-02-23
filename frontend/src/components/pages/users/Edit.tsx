import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";

import { UserForm } from "components/templates/users/UserForm";
import { currentUserState } from "store/session";


export const Edit: VFC = memo(() => {
  const getCurrentUser = useRecoilValue(currentUserState);

  return(
   <UserForm
    nameDefaultValue={getCurrentUser.user.name}
    emailDefaultValue={getCurrentUser.user.email}
    genderDefaultValue={getCurrentUser.user.gender}
    imageDefaultValue={getCurrentUser.user.image.url}
    userFormTitle={"ユーザー情報編集"}
    buttonName={"更新"}
  />
  );
});