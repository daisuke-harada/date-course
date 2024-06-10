import { memo, FC } from 'react';
import { useSelector } from 'react-redux';

import { UserForm } from 'components/templates/users/UserForm';
import { RootState } from 'reducers';
import { User } from 'types/users/session';


export const Edit: FC = memo(() => {
  const getCurrentUser = useSelector<RootState, User>(state => state.session.currentUser)
  return(
   <UserForm
    nameDefaultValue={getCurrentUser.name}
    emailDefaultValue={getCurrentUser.email}
    genderDefaultValue={getCurrentUser.gender}
    imageDefaultValue={getCurrentUser.image?.url}
    userFormTitle={'アカウント情報編集'}
    buttonName={'更新'}
  />
  );
});