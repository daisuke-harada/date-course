import { memo, ReactNode, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  children: ReactNode;
};

const Button = tw.button`btn btn-red w-full`;

export const DangerButton: VFC<Props> = memo((props) => {
  const {children} = props;
  return(
    <Button>{children}</Button>
  );
});