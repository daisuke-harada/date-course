import { memo, ReactNode, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  children: ReactNode
}

const Button = tw.button`btn btn-pink w-full`
export const SecondaryButton: VFC<Props> = memo((props) => {
  const {children} = props;
  return(
    <Button>{children}</Button>
  );
});