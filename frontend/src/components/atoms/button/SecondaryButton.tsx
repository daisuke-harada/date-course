import { memo, ReactNode, FC } from 'react';
import tw from 'tailwind-styled-components';

type Props = {
  children: ReactNode,
  dataE2e?: string,
  onClickEvent?: React.MouseEventHandler<HTMLButtonElement>,
}

const Button = tw.button`btn btn-pink w-full`

export const SecondaryButton: FC<Props> = memo((props) => {
  const {children, dataE2e, onClickEvent} = props;
  return(
    <Button data-e2e={dataE2e} onClick={onClickEvent}>{children}</Button>
  );
});