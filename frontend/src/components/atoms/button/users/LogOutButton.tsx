import { FC, memo } from 'react';
import tw from 'tailwind-styled-components';

import { useLogoutAction } from 'hooks/users/useLogoutAction';

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: FC = memo(() => {
  const { onClickLogOut } = useLogoutAction();
  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});