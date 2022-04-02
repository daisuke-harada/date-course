import { memo, ReactNode, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  children: ReactNode;
  onClickEvent?: React.MouseEventHandler<HTMLButtonElement>,
  dataE2e?: string,
};

const Button = tw.button`btn btn-red w-full`;

export const DangerButton: VFC<Props> = memo((props) => {
  const {children, onClickEvent, dataE2e} = props;
  return(
    <Button data-e2e={dataE2e} onClick={onClickEvent}>{children}</Button>
  );
});