import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode
  buttonSize: string
}
export const SecondaryButton: VFC<Props> = memo((props) => {
  const {children, buttonSize} = props;
  return(
   <button className={`btn btn-pink ${buttonSize}`}>{children}</button>
  );
});