import { memo, ReactNode, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  children: ReactNode;
};

const Button = tw.button`btn btn-yellow-green w-full`;

export const GuestLoginButton: VFC<Props> = memo((props) => {
  const {children} = props;
  return(
    <Button>{children}</Button>
  );
});