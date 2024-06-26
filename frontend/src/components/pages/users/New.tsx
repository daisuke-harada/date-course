import { memo, useCallback, FC } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserForm } from 'components/templates/users/UserForm';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoginStatus } from 'reducers/loginSlice';
import { User } from 'types/users/session';

export const New: FC = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const afterLoginSuccess = useCallback((data: User) => {
    dispatch(setLoginStatus(true))
    dispatch(setCurrentUser(data))
    navigate(`/users/${data.id}`, {state: {message: '新規登録に成功しました', type: 'success-message', condition: true}});
  },[navigate, dispatch]);

  return(
    <UserForm
      nameDefaultValue={''}
      emailDefaultValue={''}
      genderDefaultValue={'男性'}
      userFormTitle={'ユーザー新規登録'}
      buttonName={'登録'}
      afterLoginSuccess={afterLoginSuccess}
    />
  );
});
