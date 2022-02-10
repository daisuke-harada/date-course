import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode
  buttonSize: string
}
export const BaseButton: VFC<Props> = memo((props) => {
  const {children, buttonSize} = props;
  return(
   <button className={`btn btn-salmon ${buttonSize}`}>{children}</button>
  );
});