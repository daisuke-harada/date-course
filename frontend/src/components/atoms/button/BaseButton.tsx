import { memo, ReactNode, VFC } from "react";
import tw from "tailwind-styled-components";

type Props = {
  children: ReactNode,
  dataTestId?: string,
  onClickEvent?: React.MouseEventHandler<HTMLButtonElement>,
};

const Button = tw.button`btn btn-salmon w-full`

export const BaseButton: VFC<Props> = memo((props) => {
  const {children, dataTestId, onClickEvent} = props;
  return(
      <Button data-testid={dataTestId} onClick={onClickEvent}>{children}</Button>
  );
});