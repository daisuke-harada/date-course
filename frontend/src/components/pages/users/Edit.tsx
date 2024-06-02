import { memo, FC } from 'react';
import { useRecoilValue } from 'recoil';

import { UserForm } from 'components/templates/users/UserForm';
import { currentUserState } from 'store/session';


export const Edit: FC = memo(() => {
  const getCurrentUser = useRecoilValue(currentUserState);

  return(
   <UserForm
    nameDefaultValue={getCurrentUser.user.name}
    emailDefaultValue={getCurrentUser.user.email}
    genderDefaultValue={getCurrentUser.user.gender}
    imageDefaultValue={getCurrentUser.user.image.url}
    userFormTitle={'アカウント情報編集'}
    buttonName={'更新'}
  />
  );
});