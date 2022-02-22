import { memo, ReactNode, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  children: ReactNode;
  onClickEvent?: React.MouseEventHandler<HTMLButtonElement>,
};

const Button = tw.button`btn btn-red w-full`;

export const DangerButton: VFC<Props> = memo((props) => {
  const {children, onClickEvent} = props;
  return(
    <Button onClick={onClickEvent}>{children}</Button>
  );
});