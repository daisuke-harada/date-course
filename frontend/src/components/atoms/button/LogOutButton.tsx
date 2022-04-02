import { useLogoutAction } from "hooks/users/useLogoutAction";
import { VFC, memo } from "react";
import tw from "tailwind-styled-components";

const Button = tw.button`btn btn-red w-full`;

export const LogOutButton: VFC = memo(() => {
  const { onClickLogOut } = useLogoutAction();
  return(
    <Button onClick={onClickLogOut}>ログアウト</Button>
  );
});